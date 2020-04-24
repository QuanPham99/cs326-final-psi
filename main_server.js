'use-strict';
"use strict";
exports.__esModule = true;
var customerdb_1 = require("./customerdb");
var server_1 = require("./server");
var theDatabase = new customerdb_1.CustomerDB('QuanPham99');
var theServer = new server_1.MyServer(theDatabase);
theServer.listen(process.env.PORT);
