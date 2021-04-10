var urlFound = '';
(function ()
 {
    setInterval(checkNewURL, 2000);
 })
 ();
function checkNewURL() {
    if (window.location.href != urlFound) {
        urlFound = window.location.href;
        onNewURLDiscover();
    }
}
 function onNewURLDiscover() {
    //alert("hello")
    console.log("found new path "+urlFound)
 }