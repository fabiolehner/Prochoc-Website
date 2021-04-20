var showing = false;
const productCardHeight = 140;
var productCount;

$(document).ready(function() {
    const cartCard = document.getElementsByClassName("shopping-cart-card").item(0);
    $(".shopping-cart-card").hide();
    $("#cart").click(function(instance) {
        if (showing)
            $(".shopping-cart-card").slideUp("fast");
        else {
            $(".shopping-cart-card").slideDown("fast");

            //Clear cart
            cartCard.innerHTML = "";

            //Create title
            const title = document.createElement("h1");
            title.innerHTML = "Shopping Cart";
            title.style.cssText = "text-align: center;";
            cartCard.appendChild(title);

            //Inflate card
            var request = new XMLHttpRequest();
            request.open('GET', 'http://localhost:3000/cart', true);
            request.onload = function () {
                var data = JSON.parse(this.response);
                if (request.status >= 200 && request.status < 400) {
                    data.forEach(entry => {

                        //Create card for each entry
                        const productCard = document.createElement("div");
                        productCard.style.cssText = "background-color: #ddd; width: 370px; height: " + productCardHeight + "px; position: relative; border-radius: 3px; margin: 15px;";

                        //Parse product data
                        var request = new XMLHttpRequest();
                        request.open('GET', 'http://localhost:3000/shop', true);
                        request.onload = function () {
                            var data = JSON.parse(this.response);
                            if (request.status >= 200 && request.status < 400) {
                                data.forEach(product => {
                                    if (product.productName === entry.product) {

                                        const productTitle = document.createElement("h3");
                                        productTitle.setAttribute("style", "padding-top: 25px;padding-left: 25px;");
                                        productTitle.setAttribute("productId", entry.id);
                                        console.log(product.id);
                                        productTitle.setAttribute("class", "productTitle");
                                        productTitle.innerHTML = product.title;

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
                                        productCount++;
                                        $(".shopping-cart-card").height(productCount * (30 + productCardHeight));
                                    }
                                });
                            } else console.log(`Could not connect to JSON-Server! Code: ` + request.status);
                        };
                        request.send();
                    });
                } else console.log(`Could not connect to JSON-Server! Code: ` + request.status);
            };
            request.send();
        }
        showing = !showing;
    });
});