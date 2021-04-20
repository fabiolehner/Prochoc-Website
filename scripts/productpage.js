/*
    Purpose:    Retrieves data via POST request from the JSON server.

    Date:       27.05.2019
 */

/**
 * Reads the product name from the url
 */
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

