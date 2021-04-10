function showPage(name) {
    const pages = ['dashboard-page', 'loading-page', 'register-page'];
    pages.map(page => document.getElementById(page).classList.add('d-none'));
    document.getElementById(name).classList.remove('d-none');
}

chrome.storage.local.get(['token'], function(result) {
    if (result && result.token) {
        var me = {
            "url": `${ENDPOINT}/user/me`,
            "method": "GET",
            "headers": {
              "Content-Type": "application/json",
              "token": result.token
            },
          };
          
        $.ajax(me).done(function (response) {
            chrome.storage.local.set({ token: result.token, username: response.username, name: response.name }, function() {
                window.username = response.username;
                window.name = response.name;
                window.token = result.token;
                showPage('dashboard-page');
                settingsLikeServer();
                greet();
            });
        }).fail(function() {
            showPage('register-page');
        });
    } else {
        showPage('register-page');
    }
});