import { Component, ViewChild } from '@angular/core';
import { UserInfo } from './core/model/user_info';
import { ConnectorService } from './core/service/connector.service';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss' ]
})
export class AppComponent {
    title = 'prochoc-frontend';

    constructor(private connector: ConnectorService) { }

    @ViewChild(ShoppingCartComponent) shoppingCart!: ShoppingCartComponent;

    toggleShoppingCart(): void {
        this.shoppingCart.refetch();
        this.shoppingCart.toggleShoppingCart();
    }

    isLoggedIn(): boolean {
        return localStorage.getItem("__bearer") != undefined;
    }

    async getName(): Promise<String> {
        var info = await this.connector.getUserInfo();
        return info.firstName + " " + info.lastName;
    }
}

