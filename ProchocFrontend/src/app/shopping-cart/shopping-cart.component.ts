import { Component, OnInit } from '@angular/core';
import { trigger, transition, animate, style } from '@angular/animations'
import { ShopItem } from '../core/model/shop_item';
import { Router } from '@angular/router';
import { ConnectorService } from '../core/service/connector.service';
import { Basket } from '../core/util/basket';

export class BasketItem {
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

    constructor(private router: Router, private connector: ConnectorService) { }

    ngOnInit(): void {
        Basket.accessWrapper((items) => {
            items.forEach(e => {
                this.connector.getProductById(e.item.id as number, (product) => this.basketItems.push(new BasketItem(product, e.count)));
            })
            return items;
        });
    }

    toggleShoppingCart() {
        this.cartVisible = !this.cartVisible;
    }

    deleteItem(item: BasketItem) {
        this.basketItems = this.basketItems.filter(x => x != item);
        Basket.accessWrapper(() => this.basketItems);
    }

    calculateSum(): Number {
        var sum = 0;
        this.basketItems.forEach(x => sum += (x.count as number) * (x.item.price as number));
        return sum;
    }

    checkout() {
        this.toggleShoppingCart();
        this.router.navigate(['/checkout']);
    }

    get Math() {
        return Math;
    }
}
