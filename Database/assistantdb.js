"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var secret = require('../secret.json');
var AssistantDB = /** @class */ (function () {
    function AssistantDB(collectionName) {
        var _this = this;
        this.MongoClient = require('mongodb').MongoClient;
        // URI to the cloud database of MongoDB:
        this.uri = secret.URI;
        // Name of the database (could be altered)
        this.dbName = "AssistantDB";
        this.collectionName = collectionName;
        this.client = new this.MongoClient(this.uri, { useNewUrlParser: true });
        // Open up a connection to the client.
        // Open up a connection to the client.
        // The connection is asynchronous, but we can't call await directly
        // in the constructor, which cannot be async. So, we use "IIFE". Explanation below.
        /* from https://anthonychu.ca/post/async-await-typescript-nodejs/

        Async/Await and the Async IIFE

        The await keyword can only be used inside of a function
        marked with the async keyword. [...] One way to do this is
        with an "async IIFE" (immediately invoked function
        expression)...

        */
        // (async () => {
        // 	await this.client.connect().catch(err => { console.log(err); });
        // })();
        (function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.connect()["catch"](function (err) { console.log(err); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); })();
    }
    /* Description of document - "Assistant" in the database:
        User/Assistant: First Name, Last Name, Address, Phone Number, Password.
        {
            username: 'key' - input
            password:
            value: {
                First:..
                Last: ...
                Address: ...
                Phone: ...
            }
        }
    */
    /* findMatch: Returns the array of assistants that live in the same city of the requested customer.
        returned info:
        {
            First + Last Name,
            Address,
            Phone Number,
        }
        if no assistant exists, returns null
    */
    // public async findMatch(city: string){
    // 	let db = this.client.db(this.dbName);
    // 	let collection = db.collection(this.collectionName);
    // 	console.log("findMatch: city = " + city);
    // 	let cursorDB = await collection.find({'value.a': city});
    // 	let result = cursorDB.toArray();
    // 	if (result){
    // 		console.log("Found " + result.length + " assistants in " + city);
    // 		return result.value;
    // 	} else {
    // 		return null;
    // 	}
    // }
    /* Create a new single document using: updateOne(filter= {'key'}, update= {$set : {'new attribute'}, {'upsert': true}})
    upsert: true so that if nothing matches the "filter", new document will be added. */
    AssistantDB.prototype.put = function (username, value) {
        return __awaiter(this, void 0, void 0, function () {
            var db, collection, document, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        db = this.client.db(this.dbName);
                        collection = db.collection(this.collectionName);
                        console.log("put: username = " + username + ", value = " + value);
                        return [4 /*yield*/, collection.findOne({ 'username': username })];
                    case 1:
                        document = _a.sent();
                        if (!!(document)) return [3 /*break*/, 3];
                        return [4 /*yield*/, collection.insertOne({ 'username': username })];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [4 /*yield*/, collection.updateOne({ 'username': username }, { $set: { 'value': value } }, { 'upsert': true })];
                    case 4:
                        result = _a.sent();
                        console.log("result = " + result);
                        return [2 /*return*/];
                }
            });
        });
    };
    // Get a single document using: findOne('filter') 
    // public async get(username: string) : Promise<string> {
    // 	console.log("inside get");
    // 	let db = this.client.db(this.dbName); 
    // 	let collection = db.collection(this.collectionName);
    // 	console.log("get: key = " + username);
    // 	let result = await collection.findOne({'username' : username });
    // 	console.log("get: returned " + JSON.stringify(result));
    // 	if (result) {
    // 		return result.value;
    // 	} else {
    // 		return null;
    // 	}
    // }
    AssistantDB.prototype.get = function (city) {
        return __awaiter(this, void 0, void 0, function () {
            var db, collection, cursorDB, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        db = this.client.db(this.dbName);
                        collection = db.collection(this.collectionName);
                        console.log("findMatch: city = " + city);
                        return [4 /*yield*/, collection.find({ "value.a": city })];
                    case 1:
                        cursorDB = _a.sent();
                        return [4 /*yield*/, cursorDB.toArray()];
                    case 2:
                        result = _a.sent();
                        // let result = cursorDB;
                        if (result !== null) {
                            console.log("Found " + result.length + " assistant in " + city);
                            return [2 /*return*/, result];
                        }
                        else {
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    // Delete a single document using: deleteOne('filter')
    AssistantDB.prototype.del = function (username) {
        return __awaiter(this, void 0, void 0, function () {
            var db, collection, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        db = this.client.db(this.dbName);
                        collection = db.collection(this.collectionName);
                        console.log("delete: key = " + username);
                        return [4 /*yield*/, collection.deleteOne({ 'username': username })];
                    case 1:
                        result = _a.sent();
                        console.log("result = " + result);
                        return [2 /*return*/];
                }
            });
        });
    };
    // Check if a single document exists using: findOne() in "get" method
    AssistantDB.prototype.isFound = function (city) {
        return __awaiter(this, void 0, void 0, function () {
            var v;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("isFound: key = " + city);
                        return [4 /*yield*/, this.get(city)];
                    case 1:
                        v = _a.sent();
                        console.log("is found result = " + v);
                        if (v === null) {
                            return [2 /*return*/, false];
                        }
                        else {
                            return [2 /*return*/, true];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return AssistantDB;
}());
exports.AssistantDB = AssistantDB;
