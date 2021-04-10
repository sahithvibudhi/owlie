const ENDPOINT = 'http://localhost:3000';

function ajax({
    endpoint,
    method,
    data,
    success
}) {
    console.log('saving ');
    var myHeaders = new Headers();
    myHeaders.append("token", window.token);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(data);

    var requestOptions = {
        method,
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    console.log(`${ENDPOINT}${endpoint}`, requestOptions);
    fetch(`${ENDPOINT}${endpoint}`, requestOptions)
        .then(response => response.text())
        .then(result => success(result))
        .catch(error => console.log('error', error));
}

var urlFound = '';

chrome.storage.local.get(['token'], function(result) {
    if (result && result.token) {
        window.token = result.token;
        setInterval(checkNewURL, 2000);
    }
});

function checkNewURL() {
    if (window.location.href != urlFound) {
        urlFound = window.location.href;
        onNewURLDiscover();
    }
}
 function onNewURLDiscover() {
    //alert("hello")
    console.log("found new path "+urlFound)
    ajax({
        endpoint: '/activity',
        method: 'POST',
        data: {
            location: urlFound
        },
        success: function(data) {
            console.log(data);
        }
    });
 }