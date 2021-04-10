function onpageload(){

document.getElementById("ytcheck").addEventListener("click", statuscheck);
document.getElementById("spcheck").addEventListener("click", statuscheck);
document.getElementById("nfcheck").addEventListener("click", statuscheck);

function statuscheck() {

    let statusdict = {

        "youtube": document.getElementById("youtube-cb").checked,
        
        "netflix": document.getElementById("netflix-cb").checked,

        "spotify": document.getElementById("spotify-cb").checked,
    }

    console.log(statusdict);
    
 }

 function pageswitch(){
    chrome.browserAction.setPopup({popup: "/pages/dashboard/index.html"});
 }
 }

 window.onload = onpageload;