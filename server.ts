import { resolveTypeReferenceDirective } from "typescript";

let http = require('http');
let url = require('url');
let express = require('express');
let path = require('path');

export class MyServer {
    // 2 databases for cus/ass
    private customerDatabase;
    private assistantDatabase;

    // Server stuff, use express instead of http.createServer
    private server = express();
    private port = process.env.PORT || 8080;
    private router = express.Router();

    constructor(customerdb, assistantdb) {
        this.customerDatabase = customerdb;
        this.assistantDatabase = assistantdb;

        this.server.engine('html', require('ejs').renderFile);
        this.server.set('view engine', 'html');

        this.router.use((request, response, next) => {
			response.header('Content-Type','application/json');
			response.header('Access-Control-Allow-Origin', '*');
			response.header('Access-Control-Allow-Headers', '*');
			next();
        });

        // Static pages from a particular path
        // this.server.use('/', express.static("./client"));
        this.server.use('/', express.static("./client"));

        this.server.use(express.json());

        // Set handlers for a route
        // Handle the login page
        this.server.post('/login', this.loginRequest.bind(this));

        this.router.post('/users/:userId/find', [this.errorHandler.bind(this), this.matchHandler.bind(this)]);
        this.router.post('/dosth', this.loginHandler.bind(this));

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
    
    private async loginRequest(request, response, next) : Promise<void> {
        console.log("listening from login request function");
        response.sendFile(path.join(__dirname + '/client/login.html'));
    }

    private async matchHandler(request, response) : Promise<void> {
        await this.findMatch(request.body.username , response);
    }

    private async loginHandler(request, response) : Promise<void> {
        console.log("Username :" + request.body.username);
        console.log("Passs : " + request.body.password);
        await this.userLogin(request.body.username, request.body.password, response);
    }

    public listen(port) : void {
        console.log(`Server listening at ${port}`);
        this.server.listen(port);
    }

    public async findMatch(city: string, response) : Promise<void> {
        let val = await this.assistantDatabase.findMatch(city);
        console.log("finding");
        response.write(JSON.stringify({
            'result' : 'match',
            'city' : city,
            'value' : val
        }));
        response.end();
    }

    public async userLogin(username : string, password : string, response) : Promise<void> {
        console.log("This is redirecting");
        response.redirect("/");
        response.end();
    }
}