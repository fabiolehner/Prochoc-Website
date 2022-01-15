import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductComponent } from 'src/app/pages/product/product.component';
import { BasketItem } from 'src/app/shopping-cart/shopping-cart.component';
import { LoginData, LoginModel, RegisterModel } from '../model/login_model';
import { ShopItem } from '../model/shop_item';

const HEADERS = new HttpHeaders({'content-type': 'application/json'});

@Injectable({
    providedIn: 'root'
})
export class ConnectorService {

    API_URL = "https://prochoc-webapi.azurewebsites.net/api/prochoc/";

    constructor(private client: HttpClient) { }

    getProducts(finishedCallback: (products: ShopItem[]) => void) {
        this.client.get<ShopItem[]>(this.API_URL + "getProducts")
            .subscribe(data => finishedCallback(data));
    }

    getProductById(id: number, finishedCallback: (product: ShopItem) => void) {
        this.client.get<ShopItem>(this.API_URL + `getProductById?id=${id}`)
            .subscribe(data => finishedCallback(data));
    }

    async addToBasket(product: ShopItem, amount: number, finishedCallback: () => void) {
        var token = localStorage.getItem("__bearer");
        await this.client.post(this.API_URL + "addToBasket", JSON.stringify({productId: product.id, count: amount}),
            {
                headers: new HttpHeaders({'content-type': 'application/json', 'Authorization': `Bearer ${token}`})
            }).toPromise();
    }

    async getBasket(): Promise<BasketItem[]> {
        var token = localStorage.getItem("__bearer");
        var result = await this.client.get<BasketItem[]>(this.API_URL + "getBasket",
            {
                headers: new HttpHeaders({'content-type': 'application/json', 'Authorization': `Bearer ${token}`})
            }).toPromise();
        return result != null && result.length > 0 ? result : []
    }

    async deleteBasketItem(item: BasketItem) {
        var token = localStorage.getItem("__bearer");
        await this.client.post(this.API_URL + "removeFromBasket",
            JSON.stringify({productId: item.item.id, count: item.count}),
            {
                headers: new HttpHeaders({'content-type': 'application/json', 'Authorization': `Bearer ${token}`})
            }
        ).toPromise();
    }

    login(loginModel: LoginModel, finishedCallback: (loginData: LoginData) => void, onError: () => void) {
        this.client.post<LoginData>(this.API_URL + "login", JSON.stringify(loginModel), { headers: HEADERS } )
            .subscribe(data => finishedCallback(data), (error) => onError());
    }

    register(registerModel: RegisterModel, finishedCallback: () => void) {
        this.client.post(this.API_URL + "register", JSON.stringify(registerModel), { headers: HEADERS })
            .subscribe(data => finishedCallback());
    }
}
