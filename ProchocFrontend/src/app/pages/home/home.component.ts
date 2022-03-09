import { Component, OnInit, ViewChild } from '@angular/core';
import { ConnectorService } from 'src/app/core/service/connector.service';
import { ShoppingCartComponent } from '../../shopping-cart/shopping-cart.component';

@Component({
    selector: 'home-page',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.scss']
})
export class HomeComponent implements OnInit {

    constructor(private connector: ConnectorService) { }

    async ngOnInit() {
    }

    @ViewChild(ShoppingCartComponent) shoppingCart!: ShoppingCartComponent;

    toggleShoppingCart(): void {
        this.shoppingCart.toggleShoppingCart();
    }
}
