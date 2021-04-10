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

var tableString = '';
    body = document.getElementsByTagName('body')[0],
    div = document.createElement('div');

for (row = 0; row < feedarray.length; row += 1) {

        tableString += `<div class='row ml-4 mt-4'><div class='col-12 py-3' style='background-color:lightgrey;'><i class="fas fa-circle green"></i><strong class="ml-2">${feedarray[row].name} on ${feedarray[row].app}</strong> <i class="fas fa-link ml-2"></i><strong class="rightalign">${feedarray[row].updated}</strong></div>`;
 
    tableString += "</div>";
}

tableString += "</div>";
div.innerHTML = tableString;
console.log(tableString);
body.appendChild(div);