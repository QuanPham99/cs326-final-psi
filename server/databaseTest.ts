import {CustomerDB} from './customerdb'


let test =  new CustomerDB("alanbui2808");


(async () => {
    try{
    let text = await test.get("username1");
    console.log(text);
    }catch(e){
        console.log(e);
    }
})();    
while(true){}





// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://alanbui2808:circxsqR8gVSUls9@appcluster-bauga.mongodb.net/test?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   console.log("Hello inside here");
//   // perform actions on the collection object
//   (async () => {
//       let v = await collection.findOne({"username" : "Hello"});
//       console.log(typeof(v));
//       console.log(v);
//       client.close();
//   })();
  
// });




