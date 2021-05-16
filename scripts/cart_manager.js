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
    request.open('POST', 'http://localhost:5000/api/prochoc/addToBasket', true);
    request.setRequestHeader("Content-Type", "application/json");
    let size = $("#size-dropdown").html();

    var product = {
        "productId": getProductId()
    };

    request.send(JSON.stringify(product));
    console.log('Added-Product to cart: ' + product);
}

function removeIdFromBag(productId) {
    var request = new XMLHttpRequest();
    var requestBody = {"productId": productId};
    request.open('POST', 'http://localhost:5000/api/prochoc/removeFromBasket', true);
    request.setRequestHeader("Content-Type", "application/json");
    request.send(JSON.stringify(requestBody));
    console.log('Removed product from cart.');
}

function removeFromBag() {
    removeIdFromBag(productId);
}