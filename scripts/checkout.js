
$(document).ready(function() {
    const cartCard = document.getElementsByClassName("checkout-list").item(0);
    //Clear cart
    cartCard.innerHTML = "";

    //Create title
    const title = document.createElement("h1");
    title.innerHTML = "Shopping Cart";
    title.style.cssText = "text-align: center;";
    cartCard.appendChild(title);

    //Inflate card
    var request = new XMLHttpRequest();
    request.open('GET', 'http://localhost:5000/api/prochoc/getBasket', true);
    request.onload = function () {
        var data = JSON.parse(this.response);
        if (request.status >= 200 && request.status < 400) {
            data.forEach(entry => {
                console.log(entry);
                //Create card for each entry
                const productCard = document.createElement("div");
                productCard.style.cssText = "background-color: #ddd; width: 370px; height: 150px; position: relative; border-radius: 3px; margin: 15px;";

                //Parse product data
                var request = new XMLHttpRequest();
                request.open('GET', 'http://localhost:5000/api/prochoc/getProducts', true);
                request.onload = function () {
                    var data = JSON.parse(this.response);
                    if (request.status >= 200 && request.status < 400) {
                        data.forEach(product => {
                            if (product.id === entry.id) {

                                const productTitle = document.createElement("h3");
                                productTitle.setAttribute("style", "padding-top: 25px;padding-left: 25px;");
                                productTitle.setAttribute("productId", entry.id);
                                console.log(product.id);
                                productTitle.setAttribute("class", "productTitle");
                                productTitle.innerHTML = product.name;

                                const productPrice = document.createElement("p");
                                productPrice.setAttribute("style", "padding-left: 25px;");
                                productPrice.innerHTML = product.price;

                                //Remove button
                                const removeProductButton = document.createElement("button");
                                removeProductButton.setAttribute("style", "float: right; margin-right: 25px; margin-bottom: 25px;");
                                removeProductButton.innerHTML = "Remove from cart";
                                removeProductButton.onclick = function() {
                                    var id = removeProductButton.parentElement.getElementsByClassName("productTitle").item(0).getAttribute("productId");
                                    console.log("id: " + id);
                                    removeIdFromBag(id);
                                    removeProductButton.parentElement.remove();
                                };

                                productCard.appendChild(productTitle);
                                productCard.appendChild(productPrice);
                                productCard.appendChild(removeProductButton);
                                cartCard.appendChild(productCard);
                                // $(".shopping-cart-card").height(productCount * (30 + productCardHeight));
                            }
                        });
                    } else console.log(`Could not connect to JSON-Server! Code: ` + request.status);
                };
                request.send();
            });
        } else console.log(`Could not connect to JSON-Server! Code: ` + request.status);
    };

    request.send();
});