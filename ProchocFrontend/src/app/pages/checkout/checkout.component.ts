import { Component, OnInit } from '@angular/core';
import { Basket } from 'src/app/core/util/basket';
import { BasketItem } from 'src/app/shopping-cart/shopping-cart.component';

@Component({
    selector: 'app-checkout',
    templateUrl: 'checkout.component.html',
    styleUrls: ['checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

    cartItems: Array<BasketItem> = [];

    constructor() { }

    ngOnInit(): void {
        Basket.accessWrapper((items) => {
            this.cartItems = items;
            return items;
        })
    }

    basketSum() {
        return Basket.basketSum();
    }

    basketCount() {
        var count: number = 0;
        Basket.accessWrapper((items) => { 
            count = items.length; 
            return items });
        return count;
    }
}
