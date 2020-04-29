// URL
//const url = "https://polar-caverns-77542.herokuapp.com";
const url = "http://localhost:8080";

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
        let username = document.getElementById("username").value;
        
        const data = {'username' : username};
        const newURL = url + "/users/" + username + "/find";

        console.log("user find: fetching " + newURL);

        const resp = await postData(newURL, data);

        const j = await resp.json();

        if (j['result'] !== 'error') {
            document.getElementById("output_name").innerHTML = "<li> Username " + j['username']+ " is available. </li>";
            document.getElementById("output_addr").innerHTML = "<li>" + j['username'] + " is at city " + j['value']['a'] + "</li>";
        }
        else {
            document.getElementById('output').innerHTML = "<li> 100: Error " + username + " not found. </li>";
            document.getElementById("output_name").innerHTML = "";
            document.getElementById("output_addr").innerHTML = "";
        }
    })();
}

function userLogin() {
    (async () => {

        window.open(url, "_blank");

        // let username = document.getElementById("username").value;
        // let password = document.getElementById("pw").value;

        // const data = {'username' : username, 'password' : password};
        // const newURL = url + "/users" + username + "/login";

        // console.log("user log in: fetching " + newURL);
        // const resp = await postData(newURL, data);

        // const j = await resp.json();

        // if (j['result'] !== 'error') {
        //     document.getElementById("output").innerHTML = "Greetings" + j['username'] + ". Welcome back";
        //     window.open(url, '_blank');
        // }
        // else {

        // }
    })();
}






