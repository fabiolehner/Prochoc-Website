
function getProductName() {
    var search = location.search.substring(1);  //Skip ? in url
    var params = search.split("&");
    var productName = undefined;
    params.forEach(function(param) {
        if (param.includes("product=")) {
            productName = param.substring(param.indexOf("=") + 1);
        }
    });

    return productName;
}

