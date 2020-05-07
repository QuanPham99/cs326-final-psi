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

        // this.server.use('/login', function(request, response) {
        //     response.sendFile(path.join(__dirname + '/client/login.html'));
        // });

        // Set handlers for a route
        this.router.post('/find', [this.errorHandler.bind(this), this.matchHandler.bind(this)]);
        
        // Handler for login page
        this.router.post('/login', function(request, response) {
            response.redirect('/');
        });
    
        this.router.post('/signup', function(request, response) {
            response.redirect('/');
        });

        // Set a fall through handler if nothing matches
        this.router.post("*", async (request, response) => {
            response.send(JSON.stringify({ "result" : "command-not-found"}));
        });

        this.server.use('/', this.router);
    }
    
    private async errorHandler(request, response, next) : Promise<void> {
        let value : boolean = await this.assistantDatabase.isFound(request.body.city);
		if (!value) {
			response.write(JSON.stringify({'result' : 'error'}));
			response.end();
		} else {
			next();
		}
    }
    
    private async matchHandler(request, response) : Promise<void> {
        console.log("Requested city: " + request.body.city);
        await this.findMatch(request.body.city, response);
    }

    public listen(port) : void {
        console.log(`Server listening at ${port}`);
        this.server.listen(port);
    }

    public async findMatch(city: string, response) : Promise<void> {
        let val = await this.assistantDatabase.get(city);
        console.log("finding");
        console.log("Value after finding= ", val);
        response.write(JSON.stringify({
            'result' : 'match',
            'city' : city,
            'value' : val
        }));
        response.end();
    }

}