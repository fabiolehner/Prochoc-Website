import { BasketItem } from "src/app/shopping-cart/shopping-cart.component";
import { ShopItem } from "./shop_item";

export class BasketEntry {
    constructor(public id: number, public count: number, public product: ShopItem) {}
}

export class Basket {
    constructor(public id: number, public products: BasketEntry[], public orderDate: Date, public status: number) {}
}