import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';
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

    public payPalConfig ? : IPayPalConfig = undefined;
    public paymentReceived = true; /* lol */
    cartItems: Array<BasketItem> = [];

    personalInformation: PersonalInformation = new PersonalInformation("Bastian", "Haider", "USDopaplatz 03", "Linz", "Upper Austria", "4030");

    constructor(private connector: ConnectorService, private snack: MatSnackBar, private router: Router) { }

    ngOnInit() {
        this.refetch();
        this.initConfig();
    }

    async refetch() {
        this.cartItems = await this.connector.getBasket();
    }

    calculatePrice(p: BasketItem) {
        return (Math.round((parseFloat(p.item.price) * p.count) * 100) / 100);
    }

    basketSum() {
        var sum = 0;
        this.cartItems.forEach(x => sum += x.count * parseFloat(x.item.price));
        return Math.round(sum * 100) / 100;
    }

    basketCount() {
        return this.cartItems.length;
    }

    checkout() {
        if (this.paymentReceived)
        {
            this.snack.open("Checkout erfolgreich!", "Okay");
            this.connector.checkout(this.personalInformation, (id) => this.router.navigate(["/confirmation/" + id]));
            
        }
        else this.snack.open("Es wurde noch keine Zahlung getätigt!", "Okay");
    }

    private initConfig() {
        var products = []
        var sum = 0;
        this.connector.getBasket().then((items) => {
            items.forEach(x => {
                products.push({
                    name: x.item.name,
                    quantity: '' + x.count,
                    category: 'DIGITAL_GOODS',
                    unit_amount: {
                        currency_code: 'USD',
                        value: x.item.price,
                    },
                });
                sum += x.count * parseFloat(x.item.price);
            });
            console.log(JSON.stringify(products));
            sum = Math.round(sum * 100) / 100

            this.payPalConfig = {
                currency: 'USD',
                clientId: 'AbYpglSFD-hFON5gKUJ82ypEOfaKsZKHw3gjUzH9IWxEqbv4MztPKMv4ZE45g7kXA9vueKeQt-6-TrL6',
                createOrderOnClient: (data) => < ICreateOrderRequest > {
                    intent: 'CAPTURE',
                    purchase_units: [{
                        amount: {
                            currency_code: 'USD',
                            value: '' + sum,
                            breakdown: {
                                item_total: {
                                    currency_code: 'USD',
                                    value: '' + sum
                                }
                            }
                        },
                        items: products
                    }]
                },
                advanced: {
                    commit: 'true'
                },
                style: {
                    label: 'paypal',
                    layout: 'vertical'
                },
                onApprove: (data, actions) => {
                    console.log('onApprove - transaction was approved, but not authorized', data, actions);
                    actions.order.get().then(details => {
                        console.log('onApprove - you can get full order details inside onApprove: ', details);
                    });

                },
                onClientAuthorization: (data) => {
                    this.paymentReceived = true;
                },
                onCancel: (data, actions) => {
                    console.log('OnCancel', data, actions);

                },
                onError: err => {
                    console.log('OnError', err);
                },
                onClick: (data, actions) => {
                    console.log('onClick', data, actions);
                }
            };
        }) 
    }
}
