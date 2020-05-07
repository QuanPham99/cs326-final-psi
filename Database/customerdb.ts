var secret = require('../secret.json');

export class CustomerDB {

	private MongoClient = require('mongodb').MongoClient;
	// URI to the cloud database of MongoDB:
    private uri = secret.URI;
    public client;
	public collectionName : string;
	// Name of the database (could be altered)
    public dbName : string = "CustomerDB";

    constructor(collectionName) {
		this.collectionName = collectionName;
		this.client = new this.MongoClient(this.uri, { useNewUrlParser: true });
		// Open up a connection to the client.
		// Open up a connection to the client.
		// The connection is asynchronous, but we can't call await directly
		// in the constructor, which cannot be async. So, we use "IIFE". Explanation below.

		// this.client.connect(err => 
		// 	{const collection = this.client.db(this.dbName).collection(this.collectionName); console.log("Hello from connection"); });
		
		/* from https://anthonychu.ca/post/async-await-typescript-nodejs/

		Async/Await and the Async IIFE

		The await keyword can only be used inside of a function
		marked with the async keyword. [...] One way to do this is
		with an "async IIFE" (immediately invoked function
		expression)...

		(async () => {
		// code goes here
		})();
		*/
		(async () => {
			await this.client.connect().catch(err => { console.log(err); });
		})();
		
    }

    /* Description of document - "Customer" in the database:
        User/Assistant: First Name, Last Name, Address, Phone Number, Password.
        {
			username: 'key' - input
			password: ...
            value: {
                First:..
                Last: ...
                Address: ...
                Phone: ...
            }
        }
    */


	/* Create a new single document using: updateOne(filter= {'key'}, update= {$set : {'new attribute'}, {'upsert': true}})
    upsert: true so that if nothing matches the "filter", new document will be added. */
    public async put(username: string, value: object) : Promise<void> {
		console.log("Hello inside get");
		let db = this.client.db(this.dbName);
		let collection = db.collection(this.collectionName);
		console.log("put: username = " + username + ", value = " + value);

		// Check if the document exists, if not insert one with "username: username"
		let document = await collection.findOne({'username': username});
		if(!(document)){
			await collection.insertOne({'username': username});
		}
		let result = await collection.updateOne({'username' : username}, { $set : { 'value' : value} }, { 'upsert' : true } );
		console.log("result = " + result);
    }

	// Get a single document using: findOne('filter') 
    public async get(username: string) : Promise<string> {
		console.log("inside get");
		let db = this.client.db(this.dbName); 
		let collection = db.collection(this.collectionName);
		console.log("get: key = " + username);
		let result = await collection.findOne({'username' : username });
		console.log("get: returned " + JSON.stringify(result));
		if (result) {
			return result.value;
		} else {
			return null;
		}
    }
	
	// Delete a single document using: deleteOne('filter')
    public async del(username: string) : Promise<void> {
		let db = this.client.db(this.dbName);
		let collection = db.collection(this.collectionName);
		console.log("delete: key = " + username);
		
		let result = await collection.deleteOne({'username' : username});
		
		console.log("result = " + result);
		// await this.db.del(key);
    }
	
	// Check if a single document exists using: findOne() in "get" method
    public async isFound(username: string) : Promise<boolean>  {
		console.log("isFound: key = " + username);
		let v = await this.get(username);
		console.log("is found result = " + v);
		if (v === null) {
			return false;
		} else {
			return true;
		}
	}
}