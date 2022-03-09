import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderDetail } from 'src/app/core/model/order_detail';
import { ConnectorService } from 'src/app/core/service/connector.service';
import { ImageUtil } from 'src/app/core/util/imageutil';
import { BasketItem } from 'src/app/shopping-cart/shopping-cart.component';

@Component({
    selector: 'app-confirmation',
    templateUrl: 'confirmation.component.html',
    styleUrls: ['confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {

    public basketItems: BasketItem[] = [];
    public basketId: any;
    public previousOrders: OrderDetail[] = [];
    public selectedOrder: OrderDetail;
    public imageUtil: ImageUtil = new ImageUtil();

    constructor(private connector: ConnectorService, private router: Router) { }

    ngOnInit(): void {
        var parameters = window.location.href.split("/");
        var basketId = parameters[parameters.length - 1];
        this.basketId = basketId;
        this.connector.getBasketById(basketId).subscribe(items => this.basketItems = items);
        this.connector.getPreviousOrders().subscribe(orders => console.log(this.previousOrders = orders));
    }

    calculateSum(): Number {
        var sum = 0;
        this.basketItems.forEach(x => sum += (x.count as number) * (parseFloat(x.item.price) as number));
        return Math.round(sum * 100) / 100;
    }

    formatDate(date: Date): string {
        var dateObj = new Date(date);
        const zeroPad = (num, places) => String(num).padStart(places, '0')
        return `${zeroPad(dateObj.getDay(), 2)}.${zeroPad(dateObj.getMonth(), 2)}.${zeroPad(dateObj.getFullYear(), 4)} - `
            + `${zeroPad(dateObj.getHours(), 2)}:${zeroPad(dateObj.getMinutes(), 2)}`;
    }

    jumpToOrder() {
        if (this.selectedOrder == undefined) return;
        this.router.navigate(["/confirmation/" + this.selectedOrder.basketId])
        .then(() => {
            window.location.reload();
        });
    }

    get Math() {
        return Math;
    }
}
