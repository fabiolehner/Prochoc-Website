import { Component, OnInit } from '@angular/core';
import { trigger, transition, animate, style } from '@angular/animations'
import { ShopItem } from '../core/model/shop_item';

class BasketItem {
    constructor(public item: ShopItem, public count: Number) { }
}

@Component({
    selector: 'shopping-cart',
    templateUrl: 'shopping-cart.component.html',
    styleUrls: ['shopping-cart.component.scss'],
    animations: [
        trigger('slideInOut', [
          transition(':enter', [
            style({transform: 'translateX(100%)'}),
            animate('200ms ease-in-out', style({transform: 'translateX(0%)'}))
          ]),
          transition(':leave', [
            animate('200ms ease-in-out', style({transform: 'translateX(100%)'}))
          ])
        ])
      ]
})
export class ShoppingCartComponent implements OnInit {

    public cartVisible = false;
    public basketItems: Array<BasketItem> = new Array<BasketItem>();
    displayedColumns = ['image', 'name', 'count', 'price', 'delete']

    ngOnInit(): void {
        this.basketItems.push(new BasketItem(new ShopItem(0, "Product 1", 4.25, "/assets/images/product1.png", 1), 5));
        this.basketItems.push(new BasketItem(new ShopItem(0, "Product 1", 4.25, "/assets/images/product2.png", 1), 2));
        this.basketItems.push(new BasketItem(new ShopItem(0, "Product 1", 4.25, "/assets/images/product1.png", 1), 123));
        this.basketItems.push(new BasketItem(new ShopItem(0, "Product 1", 4.25, "/assets/images/product3.png", 1), 3));
        this.basketItems.push(new BasketItem(new ShopItem(0, "Product 1", 4.25, "/assets/images/product2.png", 1), 2));
        console.log(this.basketItems);
        
    }

    toggleShoppingCart() {
        this.cartVisible = !this.cartVisible;
    }

    deleteItem(item: BasketItem) {
        this.basketItems = this.basketItems.filter(x => x != item);
    }

    calculateSum(): Number {
        var sum = 0;
        this.basketItems.forEach(x => sum += (x.count as number) * (x.item.price as number));
        return sum;
    }

    get Math() {
        return Math;
    }
}
