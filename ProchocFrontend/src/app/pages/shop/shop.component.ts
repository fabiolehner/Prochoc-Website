<<<<<<< Updated upstream
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
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

    constructor(private connector: ConnectorService, private router: Router) { }

    ngOnInit(): void {
        this.connector.getProducts((products) => this.shopItems = products);
    }
    
    @ViewChild(ShoppingCartComponent) shoppingCart!: ShoppingCartComponent;

    toggleShoppingCart(): void {
        this.shoppingCart.toggleShoppingCart();
    }

    openProduct(p: ShopItem) {
        this.router.navigate(["product", p.id]);
    }
}
=======
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
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

    constructor(private connector: ConnectorService, private router: Router) { }

    ngOnInit(): void {
        this.connector.getProducts((products) => this.shopItems = products);
    }
    
    @ViewChild(ShoppingCartComponent) shoppingCart!: ShoppingCartComponent;

    toggleShoppingCart(): void {
        this.shoppingCart.toggleShoppingCart();
    }

    openProduct(p: ShopItem) {
        this.router.navigate(["product", p.id]);
    }
}
>>>>>>> Stashed changes
