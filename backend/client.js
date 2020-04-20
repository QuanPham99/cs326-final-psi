const url = "http://0.0.0.0:52330/homepage/homepage.html";


function userCreated() {
    (async () => {
        let fName = document.getElementById("fName").value;
        let lName = document.getElementById('lName').value;
        let addr = document.getElementById("addr").value;
        let pass = document.getElementById("pw").value;


        const newURL = url + "/users/" + fName + "-" + lName;
        console.log("users created: fetching " + newURL);
        const resp = await fetch(newURL);
        const j = await resp.json();

        if (j['result'] !== 'error') {
            document.getElementById("output").innerHTML = "101: <b> Hello" + fName + ".</b>";
        }
        else {
            document.getElementById("output").innerHTML = "102: <b> Failed </b>";
        }
    })();
}