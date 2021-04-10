function greet() {
    chrome.storage.local.get(['name', 'username'], function(result) {
        $('#greeting-container').html(`Hi, ${result.name}`);
        $('#my-uname').html(`uname: ${result.username}`);
    });
}

greet();