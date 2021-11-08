import { Component, OnInit, ViewChild } from '@angular/core';
import { ShopItem } from '../core/model/shop_item';
import { ShoppingCartComponent } from '../shopping-cart/shopping-cart.component';

@Component({
    selector: 'shop-page',
    templateUrl: 'shop.component.html',
    styleUrls: ['shop.component.scss']
})
export class ShopComponent implements OnInit {

    public shopItems: Array<ShopItem> = new Array<ShopItem>();

    constructor() { }

    ngOnInit(): void {
        this.shopItems.push(new ShopItem("Product 1", 4.25, "none"));
        this.shopItems.push(new ShopItem("Product 2", 3.25, "none"));
        this.shopItems.push(new ShopItem("Product 3", 1.65, "none"));
        this.shopItems.push(new ShopItem("Product 4", 4.50, "none"));
    }
    
    @ViewChild(ShoppingCartComponent) shoppingCart!: ShoppingCartComponent;

    toggleShoppingCart(): void {
        this.shoppingCart.toggleShoppingCart();
    }
}
