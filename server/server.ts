var faker = require('faker');


var random_firstName = faker.name.firstName();
var random_lastName = faker.name.lastName();
var random_phoneNum = faker.phone.phoneNumber();

console.log("random name:" + random_firstName + " " + random_lastName);
console.log("random phone:" + random_phoneNum);