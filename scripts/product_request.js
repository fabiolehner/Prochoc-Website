/*
    Purpose:    Retrieves data via POST request from the JSON server.

    Date:       27.05.2019
 */

//Get product title (h1) and product price (p)
const shopTitle = document.getElementById("product_title");
const productPrice = document.getElementById("product_price");
const productImage = document.getElementById("product-image");

var request = new XMLHttpRequest();
request.open('GET', 'http://localhost:3000/shop', true);    //Replaced with exilehub.tk
request.onload = function () {
    var data = JSON.parse(this.response);
    if (request.status >= 200 && request.status < 400) {
        data.forEach(entry => {
            //Check if product names match (URL and the one from the result of the request)
           if (entry.productName === getProductName()) {
               //Apply values to components
               shopTitle.textContent = entry.title;
               productPrice.textContent = entry.price;
               productImage.setAttribute("src", "../images/" + entry.image + "view.png");
           }
        });
    } else console.log(`Could not connect to JSON-Server! Code: ` + request.status);
};

request.send();
