import { Component, OnInit, ViewChild } from '@angular/core';
import { UserInfo } from './core/model/user_info';
import { ConnectorService } from './core/service/connector.service';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss' ]
})
export class AppComponent implements OnInit {
    title = 'prochoc-frontend';

    userInfo: UserInfo = undefined;
    isAdmin: boolean = false;

    @ViewChild(ShoppingCartComponent) shoppingCart!: ShoppingCartComponent;

    constructor(private connector: ConnectorService) { }

    async ngOnInit() {
        this.userInfo = await this.connector.getUserInfo();
        this.isAdmin = await this.connector.isAdmin();
    }

    toggleShoppingCart(): void {
        this.shoppingCart.refetch();
        this.shoppingCart.toggleShoppingCart();
    }

    isLoggedIn(): boolean {
        return this.userInfo != undefined;
    }
}

