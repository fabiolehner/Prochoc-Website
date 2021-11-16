
$(document).ready(function() {
    var button = document.getElementById("edit").onclick = function() {
        localStorage.setItem("currentProduct", JSON.stringify(currentProduct));
    };
    var button = document.getElementById("delete").onclick = function() {
        var request = new XMLHttpRequest();
        request.open('POST', 'http://localhost:5000/api/prochoc/removeProduct', true);
        request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        request.onload = function() {

            alert("Product wurde gelöscht!");
        };
        request.send(JSON.stringify(currentProduct));
    };
});

function getProductId() {
    var search = location.search.substring(1);  //Skip ? in url
    var params = search.split("&");
    var productId = undefined;
    params.forEach(function(param) {
        if (param.includes("product=")) {
            productId = param.substring(param.indexOf("=") + 1);
        }
    });

    return productId;
}

function getUserId() {
    var user = localStorage.getItem("currentUser");
    if (user == undefined)
    {
        user = 0;
        localStorage.setItem("currentUser", user);
    }

    return user;
}
console.log(getUserId());

