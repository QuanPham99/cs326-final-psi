// URL
const url = "https://polar-caverns-77542.herokuapp.com";
// const url = "http://localhost:8080";

// NEW: helper method for posting data
async function postData(url, data) {
    const resp = await fetch(url,
                             {
                                 method: 'POST',
                                 mode: 'cors',
                                 cache: 'no-cache',
                                 credentials: 'same-origin',
                                 headers: {
                                     'Content-Type': 'application/json'
                                 },
                                 redirect: 'follow',
                                 body: JSON.stringify(data)
                             });
    console.log("Response from post " + resp);
    console.log("Data: " + JSON.stringify(data));
    return resp;
}


function findMatch() {
    (async () => {
        let city = document.getElementById("city").value;

        const data = {'city' : city};
        console.log("Data: " + data);

        const newURL = url + "/find";

        console.log("user find: fetching " + newURL);

        const resp = await postData(newURL, data);

        const j = await resp.json();

        console.log("J =", j);

        if (j['result'] !== 'error') {
            if (j['value'].length == 1) {
                document.getElementById("output").innerHTML = "There is an assistants in " + city + " city. ";    
            }
            else if (j['value'].length > 1) {
                document.getElementById("output").innerHTML = "There are " + j['value'].length + " assistant in " + city + " city.";    
            }
            else if (j['value'].length == 0) {
                document.getElementById("output").innerHTML = "Unfortunately there are not any assistant in this " + city + " city.";    
 
            }

            var html = "";
            for (let index = 0; index < j['value'].length; ++index) {
                html += "<ul> Assistant Full Name: " + j['value'][index]['value']['f'] + " " + j['value'][index]['value']['l'] + "<br/>";
                html += "<li> Nickname: " +  j['value'][index]['username'] + "</li>";
                html += "<li> Phone Number: " + j['value'][index]['value']['no'] + "</li>";
                html += " </ul>";
            }

            document.getElementById("output_name").innerHTML = html;
        }
        else {
            document.getElementById('output').innerHTML = "I'm sorry, there are no assisstant in " + city + " city.";
            document.getElementById("output_name").innerHTML = "";
        }
    })();
}


// https://www.sitepoint.com/local-authentication-using-passport-node-js/

function userLogin() {
    (async () => {
        let username = document.getElementById("username").value;
        let password = document.getElementById("pw").value;

        console.log("Username from the URL:", username);
        console.log("Password from the URL: ", password);
        const data = {'username' : username, 'password' : password};

        const newURL = url + "/login";

        console.log("user log in: fetching " + newURL);
        const resp = await postData(newURL, data);

        const j = await resp.json();

        if (j['result'] !== 'error') {
            if (j['result'] === 'match') {
                window.open(url, '_blank');
            }
            else if (j['result'] === 'incorrect-password') {
                document.getElementById("output").innerHTML = "Incorrect Password";
            }
        }
        else {
            document.getElementById("output").innerHTML = "Incorrect Password";
        }
    })();
}




