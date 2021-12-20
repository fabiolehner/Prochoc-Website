import { BasketItem } from "src/app/shopping-cart/shopping-cart.component";

export class Basket {
    static accessWrapper(manipulator: (basketItems: Array<BasketItem>) => Array<BasketItem>) {
        var basketProducts: Array<BasketItem> = [];
        var storedProducts = localStorage.getItem("basket_products");
        if (storedProducts != null) {
            basketProducts = JSON.parse(storedProducts);
        }
        basketProducts = manipulator(basketProducts);
        localStorage.setItem("basket_products", JSON.stringify(basketProducts));
    }
}