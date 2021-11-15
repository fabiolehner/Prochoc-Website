import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ShopItem } from '../model/shop_item';

@Injectable({
    providedIn: 'root'
})
export class ConnectorService {

    API_URL = "http://localhost:5000/api/prochoc/";

    constructor(private client: HttpClient) { }

    getProducts(finishedCallback: (products: ShopItem[]) => void) {
        this.client.get<ShopItem[]>(this.API_URL + "getProducts").subscribe(data => finishedCallback(data));
    }
}
