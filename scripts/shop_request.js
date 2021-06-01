
const container = document.getElementById("container");
const productPage = "../product_pages/product.html";

const request = new XMLHttpRequest();
request.open('GET', 'http://localhost:5000/api/prochoc/getProducts', true);

request.onload = function () {

    const data = JSON.parse(this.response);
    if (request.status >= 200 && request.status < 400) {
        let pos = 0;
        data.forEach(entry => {
            let position;
            switch (pos) {
                case 0: position = "left";   break;
                case 1: position = "center"; break;
                case 2: position = "right";  break;
            }
            const card = document.createElement("div");
            const link = document.createElement("a");
            link.setAttribute("href", productPage + "?product=" + entry.id);
            card.setAttribute("id", position);
            card.setAttribute("class", "product");

            const image = document.createElement("img");
            const title = document.createElement("p");
            const price = document.createElement("p");
            const amount = document.createElement("p");

            image.setAttribute("src", "../images/"+entry.picture);
            title.textContent = entry.name;
            price.textContent = entry.price+"€";

            link.appendChild(image);
            link.appendChild(title);
            link.appendChild(price);
            card.appendChild(link);
            container.appendChild(card);

            pos++;
            if (pos >= 3) pos = 0;
        });
    } else console.log(`Could not connect to JSON-Server! Code: ` + request.status);
};

request.send();
