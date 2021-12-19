import { Component, OnInit, ViewChild } from '@angular/core';
import { ShopItem } from '../../core/model/shop_item';
import { ConnectorService } from '../../core/service/connector.service';
import { ShoppingCartComponent } from '../../shopping-cart/shopping-cart.component';

@Component({
    templateUrl: 'shop.component.html',
    selector: 'shop-page',  
    styleUrls: ['shop.component.scss']
})
export class ShopComponent implements OnInit {

    public shopItems: Array<ShopItem> = new Array<ShopItem>();
    constructor(private connector: ConnectorService) { }

    ngOnInit(): void {
        this.connector.getProducts((products) => this.shopItems = products);
        this.shopItems.push(new ShopItem(0, "Produkt 1", 4, "product1.png", 30, "Description"))
        this.shopItems.push(new ShopItem(0, "Produkt 2", 4, "product2.png", 30, "Description"))
        this.shopItems.push(new ShopItem(0, "Produkt 3", 4, "product3.png", 30, "Description"))
    }
    
    
    @ViewChild(ShoppingCartComponent) shoppingCart!: ShoppingCartComponent;

    toggleShoppingCart(): void {
        this.shoppingCart.toggleShoppingCart();
    }
    test(){
        console.log("test");
    }
}
