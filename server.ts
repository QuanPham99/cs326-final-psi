import { resolveTypeReferenceDirective } from "typescript";

let http = require('http');
let url = require('url');
let express = require('express');

export class MyServer {
    // 2 databases for cus/ass
    private customerDatabase;
    private assistantDatabase;

    // Server stuff, use express instead of http.createServer
    private server = express();
    private port = 8080;
    private router = express.Router();

    constructor(customerdb, assistantdb) {
        this.customerDatabase = customerdb;
        this.assistantDatabase = assistantdb;

        this.router.use((request, response, next) => {
			response.header('Content-Type','application/json');
			response.header('Access-Control-Allow-Origin', '*');
			response.header('Access-Control-Allow-Headers', '*');
			next();
        });

        // Static pages from a particular path
        this.server.use('/', express.static("./client"));
        this.server.use(express.json());

        // Set handlers for a route y
        this.router.post('/users/:userId/find', [this.errorHandler.bind(this), this.matchHandler.bind(this)]);
        this.router.get('/login', this.loginHandler.bind(this));

        // Set a fall through handler if nothing matches
        this.router.post("*", async (request, response) => {
            response.send(JSON.stringify({ "result" : "command-not-found"}));
        });

        this.server.use('/', this.router);
    }
    
    private async errorHandler(request, response, next) : Promise<void> {
        let value : boolean = await this.assistantDatabase.isFound(request.body.username);
		if (!value) {
			response.write(JSON.stringify({'result' : 'error'}));
			response.end();
		} else {
			next();
		}
    }
    
    private async matchHandler(request, response) : Promise<void> {
        await this.findMatch(request.body.username , response);
    }

    private async loginHandler(request, response) : Promise<void> {
        await this.userLogin(request.body.username, request.body.password, response);
    }

    public listen(port) : void {
        console.log(`Server listening at ${port}`);
        this.server.listen(port);
    }

    public async findMatch(username: string, response) : Promise<void> {
        let val = await this.assistantDatabase.get(username);
        console.log("finding");
        response.write(JSON.stringify({
            'result' : 'match',
            'username' : username,
            'value' : val
        }));
        response.end();
        

    }

    public async userLogin(username: string, password: string, response) : Promise<void> {
        console.log("Inside Log in");
        let customer_value = await this.customerDatabase.get(username);
        let assistant_value = await this.assistantDatabase.get(username);

        if (customer_value !== null && assistant_value === null) {
            let pass = customer_value.a;
            if (pass === password) {
                response.write(JSON.stringify({
                    'result' : 'match',
                    'username' : username,
                    'value' : customer_value
                }));
                response.end();
            }
            else {
                response.write(JSON.stringify({
                    'result' : 'incorrect-password',
                    'username' : username
                }));
                response.end();
            }
        }
        else if (customer_value === null && assistant_value !== null) {
            let pass = assistant_value.a;
            if (pass === password) {
                response.write(JSON.stringify({
                    'result' : 'match',
                    'username' : username,
                    'value' : assistant_value
                }));
                response.end();
            }
            else {
                response.write(JSON.stringify({
                    'result' : 'incorrect-password',
                    'username' : username
                }));
                response.end();
            }
        }
        else if (customer_value === null && assistant_value === null) {
            response.write(JSON.stringify({
                'result' : 'error',
            }));
            response.end();
        }

    }
}