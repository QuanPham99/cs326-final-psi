import { resolveTypeReferenceDirective } from "typescript";

let http = require('http');
let url = require('url');
let express = require('express');
let faker = require('faker');

export class MyServer {
    // 2 databases for cus/ass
    private theDatabase;

    // Server stuff, use express instead of http.createServer
    private server = express();
    private port = 8080;
    private router = express.Router();

    constructor(db) {
        this.theDatabase = db;

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

        // Set a fall through handler if nothing matches
        this.router.post("*", async (request, response) => {
            response.send(JSON.stringify({ "result" : "command-not-found"}));
        });

        this.server.use('/homepage', this.router);

    }
    
    private async errorHandler(request, response, next) : Promise<void> {
        let value : boolean = await this.theDatabase.isFound(request.body.username);
        Object.keys(request.body).forEach((prop)=> console.log("Request body: " + prop));
		//	console.log("result from database.isFound: " + JSON.stringify(value));
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

    public listen(port) : void {
        console.log(`Server listening at ${port}`);
        this.server.listen(port);
    }

    public async findMatch(username: string, response) : Promise<void> {
        let val = await this.theDatabase.get(username);
        response.write(JSON.stringify({
            'result' : 'match',
            'username' : username,
            'value' : val
        }));
        response.end();
    }


}