
$(document).ready(function () {
    var addButton = document.getElementById("addProduct");
    addButton.onclick = function()
    {
        var name = document.getElementById("prodname").value;
        var price = document.getElementById("prodprice").value;
        var image = document.getElementById("prodimg").value;

        var body = {
            name: name,
            price: price,
            picture: image
        };

        var request = new XMLHttpRequest();
        request.open('POST', 'http://localhost:5000/api/prochoc/createProduct', true);
        request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        request.onload = function() {

            alert("Product wurde hinzugefügt!");
        };
        request.send(JSON.stringify(body));
    };
});