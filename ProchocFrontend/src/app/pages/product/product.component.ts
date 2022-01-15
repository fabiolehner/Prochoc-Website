import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ShopItem } from 'src/app/core/model/shop_item';
import { ConnectorService } from 'src/app/core/service/connector.service';
import { Basket } from 'src/app/core/util/basket';
import { BasketItem } from 'src/app/shopping-cart/shopping-cart.component';

@Component({
    selector: 'app-product',
    templateUrl: "product.component.html",
    styleUrls: ["product.component.scss"]
})
export class ProductComponent implements OnInit {

    constructor(private connector: ConnectorService, private router: Router, private snackBar: MatSnackBar) { }

    selectedAmount: number = 1;
    product: ShopItem = undefined;

    ngOnInit(): void {
        var parameters = window.location.href.split("/");
        var productId = parameters[parameters.length - 1];
        this.connector.getProductById(Number.parseInt(productId), (product) => this.product = product);
    }

    incrementAmount = () => this.selectedAmount++;
    decrementAmount = () => this.selectedAmount = Math.max(1, --this.selectedAmount);

    async addToBasket() {
        await this.connector.addToBasket(this.product, this.selectedAmount, () => {
            this.snackBar.open("Zum Warenkorb hinzugefügt!", "Okay");
        })
    }

    get Math() {
        return Math;
    }
}
