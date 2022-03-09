import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ShopItem } from 'src/app/core/model/shop_item';
import { ConnectorService } from 'src/app/core/service/connector.service';
import { Basket } from 'src/app/core/util/basket';
import { ImageUtil } from 'src/app/core/util/imageutil';
import { BasketItem } from 'src/app/shopping-cart/shopping-cart.component';

@Component({
    selector: 'app-product',
    templateUrl: "product.component.html",
    styleUrls: ["product.component.scss"]
})
export class ProductComponent implements OnInit {

    constructor(private connector: ConnectorService, private router: Router, private snackBar: MatSnackBar) { }
    
    public imageUtil: ImageUtil = new ImageUtil();
    selectedAmount: number = 1;
    product: ShopItem = undefined;
    isAdmin: boolean = false;

    async ngOnInit() {
        var parameters = window.location.href.split("/");
        var productId = parameters[parameters.length - 1];
        this.connector.getProductById(Number.parseInt(productId), (product) => this.product = product);
        this.isAdmin = await this.connector.isAdmin();
    }

    incrementAmount = () => this.selectedAmount++;
    decrementAmount = () => this.selectedAmount = Math.max(1, --this.selectedAmount);

    async addToBasket() {
        await this.connector.addToBasket(this.product, this.selectedAmount, () => {
            this.snackBar.open("Zum Warenkorb hinzugefügt!", "Okay");
        })
    }

    async editProduct() {
        this.router.navigate(["/edit/" + this.product.id]);
    }

    async deleteProduct() {
        this.connector.deleteProduct(this.product).then(x => {
            this.router.navigate(["/shop"]).then(window.location.reload);
        })
    }

    get Math() {
        return Math;
    }
}
