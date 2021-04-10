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
    console.log("found new path "+urlFound);
    saveActivity();
    showFriends();
 }

 function saveActivity() {
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

 function showFriends() {
    ajax({
        endpoint: `/feed?location=${urlFound}`,
        method: 'GET',
        success: function(data) {
            const users = JSON.parse(data);
            let html = '';
            users.map(user => html += `<div><a href="${user.location}">${user.name}</a></div>`);
            const div = document.createElement('div');
            div.innerHTML = html;
            div.style.position = 'fixed';
            div.style.top = '40%';
            div.style.right = '0px';
            div.style['z-index'] = '20';
            div.style.border = '1px solid #eee';
            div.style.padding = '8px';
            div.style['font-size'] = '20px';
            const body = document.getElementsByTagName('body')[0];
            body.appendChild(div);
        }
    });
 }