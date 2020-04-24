// URL
const url = "https://polar-caverns-77542.herokuapp.com/";

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
    return resp;
}


function findMatch() {
    (async () => {
        let username = document.getElementById('username').value;
        
        const data = {'username' : username};
        const newURL = url + "/users/" + username + "/find";

        console.log("user find: fetching " + newURL);

        const resp = await postData(newURL, data);

        const j = await resp.json();

        if (j['result'] !== 'error') {
            document.getElementById("output").innerHTML = "101: Server listen succesfully";
            document.getElementById("output_name").innerHTML = "Username " + j['username']+ " is available.";
            document.getElementById("output_addr").innerHTML = j['username'] + " is at city " + j['value']['a'];
        }
        else {
            document.getElementById('output').innerHTML = "100: Error " + username + " not found.";
            document.getElementById("output_name").innerHTML = "";
            document.getElementById("output_addr").innerHTML = "";
        }

    })();
}






