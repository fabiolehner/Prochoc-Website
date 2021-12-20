import { Component, ViewChild } from '@angular/core';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss' ]
})
export class AppComponent {
    title = 'prochoc-frontend';

    @ViewChild(ShoppingCartComponent) shoppingCart!: ShoppingCartComponent;

    toggleShoppingCart(): void {
        this.shoppingCart.toggleShoppingCart();
    }
}

