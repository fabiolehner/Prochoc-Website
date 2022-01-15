import { BasketItem } from "src/app/shopping-cart/shopping-cart.component";

export class Basket {
    static async accessWrapper(manipulator: (basketItems: Array<BasketItem>) => Array<BasketItem>) {
        var basketProducts: Array<BasketItem> = [];
        var storedProducts = localStorage.getItem("basket_products");
        if (storedProducts != null) {
            basketProducts = JSON.parse(storedProducts);
        }
        basketProducts = manipulator(basketProducts);
        localStorage.setItem("basket_products", JSON.stringify(basketProducts));
    }

    static basketSum(): Number {
        var items;
        this.accessWrapper((i) => { items = i; return i })
        var sum = 0;
        items.forEach(x => sum += (x.count as number) * (Number.parseFloat(x.item.price) as number));
        return sum;
    }
}