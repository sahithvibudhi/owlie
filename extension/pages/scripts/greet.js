function greet() {
    chrome.storage.local.get(['name'], function(result) {
        $('#greeting-container').html(`Hi, ${result.name}`);
    });
}

greet();