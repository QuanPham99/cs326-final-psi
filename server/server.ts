let http = require('http');
let url = require('url');
let express = require('express');

export class MyServer {
    // 2 databases for cus/ass
    private assistanceDb;
    private server = express();
    private port = 8080;
    private router = express.Router();

    constructor(db1) {
        this.assistanceDb = db1;
        this.server = http.createServer();
        // this.server.use('/', express.static('./html'));
        this.router.get('/', function(req, res){ res.send("Birds")});
		this.router.get('/create', this.createHandler.bind(this));
    }

    public listen(port) : void {
        this.server.listen(port);
        console.log("Listening to port", port);
    }

    private async createHandler(request, response, next) : Promise<void> {
        await this.createUsers(request.query.username, request.query.value, response);
    }

    public async createUsers(username: string, value: object, response) : Promise<void> {
        console.log("username="+username+"object="+value);
        await this.assistanceDb.put(username, value);
        response.write(JSON.stringify({'username' : username,
                                        'value' : value }));
        response.end();
    }


}