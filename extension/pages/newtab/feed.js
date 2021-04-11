var d = new Date();
var hr = d.getHours();

let feedarray = [

    {
        "name": "Sahith",
        "app": "Netflix",
        "location": "www.netflix.com",
        "updated": hr
    },

    {
        "name": "Atchutch",
        "app": "Netflix",
        "location": "www.netflix.com",
        "updated": hr
    },

    {
        "name": "Vijay",
        "app": "Netflix",
        "location": "www.netflix.com",
        "updated": hr
    }
]

chrome.storage.local.get(['token'], function(result) {
    if (result && result.token) {
        var options = {
            "url": `${ENDPOINT}/feed`,
            "method": "GET",
            "headers": {
                "Content-Type": "application/json",
                "token": result.token,
            },
        };
        $.ajax(options).done(function (response) {
            console.log(response);
            showData(response);
        });
    } else {
        $('#user-setup').removeClass('d-none');
        $('#owl-data').addClass('d-none');
    }
});

function showData(feedarray){
    var tableString = '';
    body = document.getElementsByTagName('body')[0];

    for (row = 0; row < feedarray.length; row += 1) {
        tableString += `<div class='row ml-4 mt-4'>
                            <div class='col-12 py-3' style='background-color: #fff5f5d4;border-radius: 8px;'>
                                <i class="fas fa-circle green"></i><strong class="ml-2 mr-5">${feedarray[row].name} on ${feedarray[row].app}</strong> 
                                <a href='${feedarray[row].location}'><i class="fas fa-link ml-2"></i><a/>
                                <strong class="rightalign">${moment(feedarray[row].updated, "YYYY-MM-DDTHH:mm:ss.SSSZ").fromNow()}</strong>
                            </div>
                        </div>`;
    }

    if (feedarray.length == 0) {
        $('#empty-state').removeClass('d-none');
    } else {
        $('#empty-state').addClass('d-none');
    }

    $('#locations').html(tableString);
}