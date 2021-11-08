var isInBag = false;
var amount;

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

    amount = document.getElementById('spinner').value;
    var product = {
        "customerId": "" + getUserId(),
        "productId": getProductId(),
        "amount": amount
    };


    request.send(JSON.stringify(product));
    console.log('Added-Product to cart: ' + JSON.stringify(product));
}

function removeIdFromBag(productId, amount) {
    var request = new XMLHttpRequest();
    var requestBody = {
        "productId": productId,
        "customerId": "" + getUserId(),
        "amount": "" + amount
    };

    request.open('POST', 'http://localhost:5000/api/prochoc/removeFromBasket', true);
    request.setRequestHeader("Content-Type", "application/json");
    request.send(JSON.stringify(requestBody));
    console.log('Removed product from cart.');
}

function removeFromBag() {
    removeIdFromBag(getProductId(), amount);
}