$('#register-btn').click(function(){
    let username = $('#username-input').val();
    let name = $('#name-input').val();
    var settings = {
        "url": `${ENDPOINT}/user/register`,
        "method": "POST",
        "headers": {
          "Content-Type": "application/json"
        },
        "data": JSON.stringify({ username, name }),
      };
      
    $.ajax(settings).done(function (response) {
        chrome.storage.local.set({ token: response.token }, function() {
            showPage('dashboard-page');
        });
    });
});