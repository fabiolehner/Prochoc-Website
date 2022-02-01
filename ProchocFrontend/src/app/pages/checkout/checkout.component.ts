<<<<<<< Updated upstream
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PersonalInformation } from 'src/app/core/model/checkout_data';
import { ConnectorService } from 'src/app/core/service/connector.service';
import { Basket } from 'src/app/core/util/basket';
import { BasketItem } from 'src/app/shopping-cart/shopping-cart.component';

@Component({
    selector: 'app-checkout',
    templateUrl: 'checkout.component.html',
    styleUrls: ['checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

    cartItems: Array<BasketItem> = [];

    personalInformation: PersonalInformation = new PersonalInformation("Bastian", "Haider", "Europaplatz 03", "Linz", "Upper Austria", "4030");

    constructor(private connector: ConnectorService, private snack: MatSnackBar, private router: Router) { }

    async ngOnInit() {
        this.refetch();
    }

    async refetch() {
        this.cartItems = await this.connector.getBasket();
    }

    basketSum() {
        var sum = 0;
        this.cartItems.forEach(x => sum += x.count * x.item.price);
        return sum;
    }

    basketCount() {
        return this.cartItems.length;
    }

    checkout() {
        this.connector.checkout(this.personalInformation);
        this.snack.open("Checkout erfolgreich!", "Okay");
        this.router.navigate(["/home"]);
    }
}
=======
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PersonalInformation } from 'src/app/core/model/checkout_data';
import { ConnectorService } from 'src/app/core/service/connector.service';
import { Basket } from 'src/app/core/util/basket';
import { BasketItem } from 'src/app/shopping-cart/shopping-cart.component';

@Component({
    selector: 'app-checkout',
    templateUrl: 'checkout.component.html',
    styleUrls: ['checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

    cartItems: Array<BasketItem> = [];

    personalInformation: PersonalInformation = new PersonalInformation("Bastian", "Haider", "Europaplatz 03", "Linz", "Upper Austria", "4030");

    constructor(private connector: ConnectorService, private snack: MatSnackBar, private router: Router) { }

    async ngOnInit() {
        this.refetch();
    }

    async refetch() {
        this.cartItems = await this.connector.getBasket();
    }

    basketSum() {
        var sum = 0;
        this.cartItems.forEach(x => sum += x.count * x.item.price);
        return sum;
    }

    basketCount() {
        return this.cartItems.length;
    }

    checkout() {
        this.connector.checkout(this.personalInformation);
        this.snack.open("Checkout erfolgreich!", "Okay");
        this.router.navigate(["/home"]);
    }
}
>>>>>>> Stashed changes
