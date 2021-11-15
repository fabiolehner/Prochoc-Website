var showing = false;
const productCardHeight = 140;
var productCount;

$(document).ready(function() {
    const cartCard = document.getElementsByClassName("shopping-cart-card").item(0);
    
    // $(".shopping-cart-card").hide();
    $("#cart").click(function(instance) {
        if (showing)
            $(".shopping-cart-card").css("visibility", "hidden");
        else {
            $(".shopping-cart-card").css("visibility", "visible");

            //Clear cart
            cartCard.innerHTML = "";

            //Create title
            const title = document.createElement("h1");
            title.innerHTML = "Shopping Cart";
            title.style.cssText = "text-align: center;";
            cartCard.appendChild(title);

            //Inflate card
            var request = new XMLHttpRequest();
            var body = {
                "customerId": "" + getUserId()
            }
            request.open('POST', 'http://localhost:5000/api/prochoc/getBasket', true);
            request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
            request.onload = function () {
                var data = JSON.parse(this.response);
                if (request.status >= 200 && request.status < 400) {
                    data.forEach(entry => {
                        console.log(entry);
                        //Create card for each entry
                        const productCard = document.createElement("div");
                        productCard.style.cssText = "background-color: #ddd; width: 370px; height: " + productCardHeight + "px; position: relative; border-radius: 3px; margin: 15px;";

                        //Parse product data
                        var request = new XMLHttpRequest();
                        request.open('GET', 'http://localhost:5000/api/prochoc/getProducts', true);
                        request.onload = function () {
                            var data = JSON.parse(this.response);
                            if (request.status >= 200 && request.status < 400) {
                                data.forEach(product => {
                                    if (product.id === entry.product.id) {

                                        const productTitle = document.createElement("h3");
                                        productTitle.setAttribute("style", "padding-top: 25px;padding-left: 25px;");
                                        productTitle.setAttribute("productId", entry.product.id);
                                        console.log(product.id);
                                        productTitle.setAttribute("class", "productTitle");
                                        productTitle.setAttribute("amount", entry.amount);
                                        productTitle.innerHTML = + entry.amount + "x" + " - " + product.name; 

                                        const productPrice = document.createElement("p");
                                        productPrice.setAttribute("style", "padding-left: 25px;");
                                        productPrice.innerHTML = product.price+"€";

                                        //Remove button
                                        const removeProductButton = document.createElement("button");
                                        removeProductButton.setAttribute("style", "float: right; margin-right: 25px; margin-bottom: 25px;");
                                        removeProductButton.innerHTML = "Remove from cart";
                                        removeProductButton.onclick = function() {
                                            var id = removeProductButton.parentElement.getElementsByClassName("productTitle").item(0).getAttribute("productId");
                                            var amount = removeProductButton.parentElement.getElementsByClassName("productTitle").item(0).getAttribute("amount");
                                            console.log("id: " + id);
                                            removeIdFromBag(id, amount);
                                            removeProductButton.parentElement.remove();
                                        };

                                        productCard.appendChild(productTitle);
                                        productCard.appendChild(productPrice);
                                        productCard.appendChild(removeProductButton);
                                        cartCard.appendChild(productCard);
                                        productCount++;
                                        // $(".shopping-cart-card").height(productCount * (30 + productCardHeight));
                                    }
                                });
                            } else console.log(`Could not connect to JSON-Server! Code: ` + request.status);
                        };
                        request.send();
                    });
                } else console.log(`Could not connect to JSON-Server! Code: ` + request.status);
            };
            request.send(JSON.stringify(body));

            var center = document.createElement("center");
            var checkoutButton = document.createElement("a");
            checkoutButton.innerHTML = "Checkout";
            checkoutButton.setAttribute("href", "checkout.html");
            center.appendChild(checkoutButton);
            cartCard.appendChild(center);
        }
        showing = !showing;
    });
});