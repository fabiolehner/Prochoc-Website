
var currentProduct;

$(document).ready(function() {
    //Get product title (h1) and product price (p)
    const shopTitle = document.getElementById("product_title");
    const productPrice = document.getElementById("product_price");
    const productImage = document.getElementById("product_image");

    var request = new XMLHttpRequest();
    request.open('GET', 'http://localhost:5000/api/prochoc/getProducts', true);
    request.onload = function () {
        var data = JSON.parse(this.response);
        if (request.status >= 200 && request.status < 400) {
            data.forEach(entry => {
                if ("" + entry.id === "" + getProductId()) {
                    currentProduct = entry;
                    //Apply values to components
                    shopTitle.textContent = entry.name;
                    productPrice.textContent = entry.price;

                    if (("" + entry.picture).startsWith("https://"))
                    productImage.setAttribute("src", entry.picture);
                    else productImage.setAttribute("src", "../images/" + entry.picture);
                }
            });
        } else console.log(`Could not connect to JSON-Server! Code: ` + request.status);
    };

    request.send();
});
