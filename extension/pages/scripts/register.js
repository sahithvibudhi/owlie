$('#register-btn').click(function(){
    let username = $('#username-input').val();
    let name = $('#name-input').val();
    var auth = {
        "url": `${ENDPOINT}/user/register`,
        "method": "POST",
        "headers": {
          "Content-Type": "application/json"
        },
        "data": JSON.stringify({ username, name }),
      };
      
    $.ajax(auth).done(function (response) {
        chrome.storage.local.set({ token: response.token, username, name }, function() {
            showPage('dashboard-page');
            window.username = username;
            window.name = name;
        });
    });
});