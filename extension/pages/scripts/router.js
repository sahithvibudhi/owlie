function showPage(name) {
    const pages = ['dashboard-page', 'loading-page', 'register-page', 'friends-page'];
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

$('#frnds-icon').click(function(){
    showPage('friends-page');
    const request = {
        "url": `${ENDPOINT}/feed`,
        "method": "GET",
        "headers": {
          "Content-Type": "application/json",
          "token": window.token
        },
      };
    $.ajax(request).done(function(response){
        let html = '<p class="lead">Following</p>';
        response.map(user => {
            html += `<div class='row'>
                <div class='col-10'>${user.name}</div>
                <div class='col-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg>
                </div>
            </div>`;
        });
        $('#frnds-list-container').html(html);
    }).fail(function(){
        $('#frnds-list-container').html('Oops! something went wrong!');
    });
});

$('#frnd-back-btn').click(function(){
    showPage('dashboard-page');
    settingsLikeServer();
    greet();
});