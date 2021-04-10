function showPage(name) {
    const pages = ['dashboard-page', 'loading-page', 'register-page'];
    pages.map(page => document.getElementById(page).classList.add('d-none'));
    document.getElementById(name).classList.remove('d-none');
}

chrome.storage.local.get(['token'], function(result) {
    console.log(result);
    if (result && result.token) {
        showPage('dashboard-page');
    } else {
        showPage('register-page');
    }
});