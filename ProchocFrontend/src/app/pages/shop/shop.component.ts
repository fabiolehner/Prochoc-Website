import { Component, OnInit, ViewChild } from '@angular/core';
import { ShopItem } from '../../core/model/shop_item';
import { ConnectorService } from '../../core/service/connector.service';
import { ShoppingCartComponent } from '../../shopping-cart/shopping-cart.component';

@Component({
    selector: 'shop-page',
    templateUrl: 'shop.component.html',
    styleUrls: ['shop.component.scss']
})
export class ShopComponent implements OnInit {

    public shopItems: Array<ShopItem> = new Array<ShopItem>();

    constructor(private connector: ConnectorService) { }

    ngOnInit(): void {
        this.connector.getProducts((products) => this.shopItems = products);
        this.shopItems.push(new ShopItem(0, "Produkt 1", 4, "product1.png", 30, "Description"))
        this.shopItems.push(new ShopItem(0, "Produkt 2", 4, "product2.png", 30, "Description"))
        this.shopItems.push(new ShopItem(0, "Produkt 2", 4, "product3.png", 30, "Description"))
    }
    
    @ViewChild(ShoppingCartComponent) shoppingCart!: ShoppingCartComponent;

    toggleShoppingCart(): void {
        this.shoppingCart.toggleShoppingCart();
    }
}
