let http = require('http');
let url = require('url');
let express = require('express');

export class MyServer {
    // 2 databases for cus/ass
    private assistanceDb;
    private server = express();
    private port = 52330;
    private router = express.Router();

    constructor(db1) {
        this.assistanceDb = db1;
        this.server = http.createServer();
<<<<<<< HEAD
        // this.server.use('/', express.static('./html'));
        this.router.get('/', function(req, res){ res.send("Birds")});
		this.router.get('/create', this.createHandler.bind(this));
=======
        //this.server.use('/', express.static('./html'));
        this.router.use((request, response, next) => {
			response.header('Content-Type','application/json');
			response.header('Access-Control-Allow-Origin', '*');
			response.header('Access-Control-Allow-Headers', '*');
			next();
        });
        
        // Serve static pages from a particular path.
        // this.server.use('/', express.static('public'));
        
>>>>>>> b930d1b1f83c459e75c4a753a3ad231ca13fa143
    }

    public listen(port) : void {
        this.server.listen(port);
<<<<<<< HEAD
        console.log("Listening to port", port);
=======
>>>>>>> b930d1b1f83c459e75c4a753a3ad231ca13fa143
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