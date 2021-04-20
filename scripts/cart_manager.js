
var isInBag = false;
var productId;
var productJSON;

$(document).ready(function () {
    $("#bag-button").click(function () {
        isInBag = !isInBag;
        if (isInBag) addToBag();
        else removeFromBag();
    });
});

function addToBag() {
    var request = new XMLHttpRequest();
    productId = Math.floor(Math.random() * 1000000000);
    request.open('POST', 'http://localhost:3000/cart', true);
    request.setRequestHeader("Content-Type", "application/json");
    let size = $("#size-dropdown").html();

    productJSON = "{\"id\": \"" + productId + "\", \"product\": \"" + getProductName() +
        "\", \"amount\": \"" + 1 + "\", \"size\": \"" + size + "\"}";

    request.send(productJSON);
    console.log('Added-Product to cart: ' + productJSON);
}

function removeIdFromBag(productId) {
    var request = new XMLHttpRequest();
    request.open('DELETE', 'http://localhost:3000/cart/' + productId);
    request.setRequestHeader("Content-Type", "application/json");
    request.send();
    console.log('Removed product from cart.');
}

function removeFromBag() {
    removeIdFromBag(productId);
}