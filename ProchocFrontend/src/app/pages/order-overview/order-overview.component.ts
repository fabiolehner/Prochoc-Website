import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Basket } from 'src/app/core/model/basket';
import { ConnectorService } from 'src/app/core/service/connector.service';

@Component({
    selector: 'app-order-overview',
    templateUrl: 'order-overview.component.html',
    styleUrls: ['order-overview.component.scss']
})
export class OrderOverviewComponent implements OnInit {

    constructor(private router: Router, private connector: ConnectorService) { }

    public baskets: Basket[] = [];

    async ngOnInit() {
        if (!this.connector.isAdmin())
        {
            this.router.navigate(['/home']);
        }
        this.baskets = await this.connector.getBaskets();
        this.baskets = this.baskets.filter(x => x.status == 1);
    }

    count(basket: Basket): string {
        return basket.products.length + " Produkte";
    }

    sum(basket: Basket): string {
        var sum = 0;
        basket.products.forEach(x => sum += (x.count as number) * (parseFloat(x.product.price) as number));
        return Math.round(sum * 100) / 100 + " € gesamt";
    } 

    formatDate(date: Date): string {
        var dateObj = new Date(date);
        const zeroPad = (num, places) => String(num).padStart(places, '0')
        return `${zeroPad(dateObj.getDay(), 2)}.${zeroPad(dateObj.getMonth(), 2)}.${zeroPad(dateObj.getFullYear(), 4)} - `
            + `${zeroPad(dateObj.getHours(), 2)}:${zeroPad(dateObj.getMinutes(), 2)}`;
    }

    showOrder(basket: Basket) {
        this.router.navigate(['/confirmation/' + basket.id]);
    }

    removeOrder(basket: Basket) {
        this.connector.markDone(basket).then(_ => window.location.reload());
    }
}
