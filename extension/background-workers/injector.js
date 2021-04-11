const ENDPOINT = 'http://localhost:3000';

const genRanHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');

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

setInterval(showFriends, 10000);

function checkNewURL() {
    if (window.location.href != urlFound) {
        urlFound = window.location.href;
        onNewURLDiscover();
        showFriends();
    }
}
 function onNewURLDiscover() {
    //alert("hello")
    console.log("found new path "+urlFound);
    saveActivity();
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

 function removeElement(id) {
    var elem = document.getElementById(id);
    return elem && elem.parentNode && elem.parentNode.removeChild(elem);
}

 function showFriends() {
    ajax({
        endpoint: `/feed?location=${urlFound}`,
        method: 'GET',
        success: function(data) {
            const users = JSON.parse(data);
            let html = `<style>.owlie-hide {
                display: none;
              }
              .owlie-div:hover + .owlie-hide {
                display: block;
                color: black;
              }</style>`;
            users.map(user => html += `<div><a href="${user.location}" class='owlie-div'><svg style="color:${genRanHex(6)};" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
          </svg></a><div class='owlie-hide' style='position:fixed;right:10px;background-color:white;border: 1px solid #eee;padding: 2px;'>${user.name}</div></div>`);
            const div = document.createElement('div');
            div.innerHTML = html;
            div.id = 'owlie-active-container';
            div.style.position = 'fixed';
            div.style.top = '40%';
            div.style.right = '0px';
            div.style['z-index'] = '20';
            div.style.border = '1px solid #eee';
            div.style.padding = '8px';
            div.style['font-size'] = '16px';
            div.style['background-color'] = 'white';
            const body = document.getElementsByTagName('body')[0];
            removeElement('owlie-active-container');
            body.appendChild(div);
        }
    });
 }

