import { Component, OnInit } from '@angular/core';
import { trigger, transition, animate, style } from '@angular/animations'
import { ShopItem } from '../core/model/shop_item';


export interface PeriodicElement {
    name: string;
    position: number;
    weight: number;
    symbol: string;
  }
  
  const ELEMENT_DATA: PeriodicElement[] = [
    {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
    {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
    {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
    {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
    {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
    {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
    {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
    {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
    {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  ];
  
  /**
   * @title Basic use of `<table mat-table>`
   */
  @Component({
    selector: 'table-basic-example',
    styleUrls: ['table-basic-example.css'],
    templateUrl: 'table-basic-example.html',
  })
  export class TableBasicExample {
    displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
    dataSource = ELEMENT_DATA;
  }

@Component({
    selector: 'shopping-cart',
    templateUrl: 'shopping-cart.component.html',
    styleUrls: ['shopping-cart.component.scss'],
    animations: [
        trigger('slideInOut', [
          transition(':enter', [
            style({transform: 'translateX(100%)'}),
            animate('200ms ease-in-out', style({transform: 'translateX(0%)'}))
          ]),
          transition(':leave', [
            animate('200ms ease-in-out', style({transform: 'translateX(100%)'}))
          ])
        ])
      ]
})
export class ShoppingCartComponent implements OnInit {

    public cartVisible = false;
    public basketItems: ShopItem[];

    ngOnInit(): void {
        this.basketItems.push(new ShopItem("Product 1", 4.25, "none"));
        this.basketItems.push(new ShopItem("Product 2", 3.25, "none"));
        this.basketItems.push(new ShopItem("Product 3", 1.65, "none"));
        this.basketItems.push(new ShopItem("Product 4", 4.50, "none"));
    }

    toggleShoppingCart() {
        this.cartVisible = !this.cartVisible;
    }
}
