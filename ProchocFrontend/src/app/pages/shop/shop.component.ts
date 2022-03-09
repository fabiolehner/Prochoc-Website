import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ImageUtil } from 'src/app/core/util/imageutil';
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
    public imageUtil: ImageUtil = new ImageUtil();
    public isAdmin: boolean = false;

    constructor(private connector: ConnectorService, private router: Router) { }

    async ngOnInit() {
        this.connector.getProducts((products) => this.shopItems = products);
        this.isAdmin = await this.connector.isAdmin();
    }
    
    @ViewChild(ShoppingCartComponent) shoppingCart!: ShoppingCartComponent;

    toggleShoppingCart(): void {
        this.shoppingCart.toggleShoppingCart();
    }

    openProduct(p: ShopItem) {
        this.router.navigate(["product", p.id]);
    }

    async createProduct() {
        this.router.navigate(["edit/new"]);
    }
}
