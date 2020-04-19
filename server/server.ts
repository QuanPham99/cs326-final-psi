let http = require('http');
let url = require('url');

export class MyServer {
    private customerDb;
    private assistanceDb;
    private server;

    constructor(db1, db2) {
        this.customerDb = db1;
        this.assistanceDb = db2;
        this.server = http.createServer();
        this.server.on('request', this.handler.bind(this));
    }
}