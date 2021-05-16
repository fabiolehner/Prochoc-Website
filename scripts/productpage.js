
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

