# Milestone 2: Server and Database #
## Application Overview ##
Recall that we are building an application that helps user (customer) to find the neareast assistants in their local area with their tasks. 
### Objectives ###
In this Milestone, we will create a server  - ``` server.ts ``` and a database - ``` Database ``` using MongoDB. The server can listen to requests from client and send back data from the database.

First, we define the data-flow. Note that, if you look at 2 files in ``` Database ``` folder - ```customerdb.ts``` and  ```assistantdb.ts```, the objects defined are pretty similar where both ```Customers``` and ```Assistants``` objects both have:
```
{ 
    username,
    value: {
        First Name,
        Last Name,
        Address, 
        Phone,
        Password,
    }
}

```
The request that we choose to implement is called ```Find```:



### Application Structure ###
* ``` server.ts ```: Handle requests and error, return the data from the database.
* ```Database/customerdb.ts``` and ```Database/assistantdb.ts```: database logics such as ```findOne()```, ```updateOne()``` and ```deleteOne()```.
* ```client.js```: a client-side JS file which pings endpoints and then output the returned JSON to ```index.html```.

### Labor Division ###
- Quan Pham: ```server.ts``` and ```client.js```.
- Quoc Anh Bui: ```customerdb.ts``` and ```assistantdb.ts```.
