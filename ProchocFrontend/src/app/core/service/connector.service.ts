import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginData, LoginModel } from '../model/login_model';
import { ShopItem } from '../model/shop_item';

const HEADERS = new HttpHeaders({'content-type': 'application/json'});

@Injectable({
    providedIn: 'root'
})
export class ConnectorService {

    API_URL = "http://localhost:5000/api/prochoc/";

    constructor(private client: HttpClient) { }

    getProducts(finishedCallback: (products: ShopItem[]) => void) {
        this.client.get<ShopItem[]>(this.API_URL + "getProducts")
            .subscribe(data => finishedCallback(data));
    }

    getProductById(id: number, finishedCallback: (product: ShopItem) => void) {
        this.client.get<ShopItem>(this.API_URL + `getProductById?id=${id}`)
            .subscribe(data => finishedCallback(data));
    }

    addToBasket(product: ShopItem, amount: number, finishedCallback: () => void) {
        // this.client.post(this.API_URL + "addToBasket")
    }

    login(loginModel: LoginModel, finishedCallback: (loginData: LoginData) => void) {
        this.client.post<LoginData>(this.API_URL + "login", JSON.stringify(loginModel), { headers: HEADERS } )
            .subscribe(data => console.log(JSON.stringify(data)));
    }
}
