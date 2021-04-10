document.getElementById("ytcheck").addEventListener("click", statuscheck);
document.getElementById("spcheck").addEventListener("click", statuscheck);
document.getElementById("nfcheck").addEventListener("click", statuscheck);
document.getElementById("mdcheck").addEventListener("click", statuscheck);
    
function statuscheck(e) {
    let settings = {
        "youtube": document.getElementById("youtube-cb").checked,
        "netflix": document.getElementById("netflix-cb").checked,
        "spotify": document.getElementById("spotify-cb").checked,
        "medium": document.getElementById("medium-cb").checked,
    }

    let settingRequest = {
        url: `${ENDPOINT}/user/settings`,
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "token": window.token
        },
        data: JSON.stringify(settings)
    }
    $.ajax(settingRequest).done(function(response){
        console.log(response);
    });

}

function settingsLikeServer() {
    let settingRequest = {
        "url": `${ENDPOINT}/user/me`,
        "method": "GET",
        "headers": {
          "Content-Type": "application/json",
          "token": window.token
        },
    }
    console.log(settingRequest);
    $.ajax(settingRequest).done(function(response){
            document.getElementById("youtube-cb").checked = response.settings && response.settings.youtube;
            document.getElementById("netflix-cb").checked = response.settings && response.settings.netflix;
            document.getElementById("spotify-cb").checked = response.settings && response.settings.spotify;
            document.getElementById("medium-cb").checked = response.settings && response.settings.medium;
    });
}

