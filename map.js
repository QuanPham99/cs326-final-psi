let faker = require('faker');

function data() {
    let arr = [];
    for (let i = 0; i < 5; ++i) {
        var username = faker.internet.userName();
        var fName = faker.name.firstName();
        var lName = faker.name.lastName();
        var phone = faker.phone.phoneNumber();
        var addr = faker.address.city();

        let value = {
            f : fName,
            l : lName,
            no : phone,
            a : addr
        }

        arr.push({'username' : username, 'value' : value});
    }
    return arr;
}

let arr = data()

for (let i = 0; i < arr.length; ++i) {
    console.log(arr[i]);
}