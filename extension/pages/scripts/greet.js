function greet() {
    chrome.storage.local.get(['name', 'username'], function(result) {
        $('#greeting-container').html(`Hi, ${result.name}`);
        $('#my-uname').html(`username: ${result.username}`);
    });
}

greet();