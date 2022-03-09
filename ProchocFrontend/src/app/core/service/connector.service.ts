import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductComponent } from 'src/app/pages/product/product.component';
import { BasketItem } from 'src/app/shopping-cart/shopping-cart.component';
import { Basket } from '../model/basket';
import { DeliveryInformation, PersonalInformation } from '../model/checkout_data';
import { ImageResult } from '../model/imageresult';
import { LoginData, LoginModel, RegisterModel } from '../model/login_model';
import { OrderDetail } from '../model/order_detail';
import { ShopItem } from '../model/shop_item';
import { UserInfo } from '../model/user_info';

const HEADERS = new HttpHeaders({'content-type': 'application/json'});

@Injectable({
    providedIn: 'root'
})
export class ConnectorService {

    // API_URL = "https://prochoc-webapi.azurewebsites.net/api/prochoc/";
    public static API_URL = "https://prochoc.tk/v1/api/prochoc/";

    constructor(private client: HttpClient) { }

    getProducts(finishedCallback: (products: ShopItem[]) => void) {
        this.client.get<ShopItem[]>(ConnectorService.API_URL + "getProducts")
            .subscribe(data => finishedCallback(data));
    }

    async editProduct(product: ShopItem): Promise<ShopItem> {
        var token = localStorage.getItem("__bearer");
        return await this.client.post<ShopItem>(ConnectorService.API_URL + "editProduct", JSON.stringify(product),
            {
                headers: new HttpHeaders({'content-type': 'application/json', 'Authorization': `Bearer ${token}`})
            }).toPromise();
    }

    async deleteProduct(product: ShopItem): Promise<any> {
        var token = localStorage.getItem("__bearer");
        return await this.client.post(ConnectorService.API_URL + "removeProduct", JSON.stringify(product),
            {
                headers: new HttpHeaders({'content-type': 'application/json', 'Authorization': `Bearer ${token}`})
            }).toPromise();
    }

    getProductById(id: number, finishedCallback: (product: ShopItem) => void) {
        this.client.get<ShopItem>(ConnectorService.API_URL + `getProductById?id=${id}`)
            .subscribe(data => finishedCallback(data));
    }

    async addToBasket(product: ShopItem, amount: number, finishedCallback: () => void) {
        var token = localStorage.getItem("__bearer");
        await this.client.post(ConnectorService.API_URL + "addToBasket", JSON.stringify({productId: product.id, count: amount}),
            {
                headers: new HttpHeaders({'content-type': 'application/json', 'Authorization': `Bearer ${token}`})
            }).toPromise();
    }

    async getBaskets(): Promise<Basket[]> {
        var token = localStorage.getItem("__bearer");
        return this.client.get<Basket[]>(ConnectorService.API_URL + "getBaskets",
            {
                headers: new HttpHeaders({'content-type': 'application/json', 'Authorization': `Bearer ${token}`})
            }).toPromise();
    }

    async markDone(basket: Basket) {
        var token = localStorage.getItem("__bearer");
        return this.client.post(ConnectorService.API_URL + "markDone", JSON.stringify(basket),
            {
                headers: new HttpHeaders({'content-type': 'application/json', 'Authorization': `Bearer ${token}`})
            }).toPromise();
    }

    async getBasket(): Promise<BasketItem[]> {
        var token = localStorage.getItem("__bearer");
        var result = await this.client.get<BasketItem[]>(ConnectorService.API_URL + "getBasket",
            {
                headers: new HttpHeaders({'content-type': 'application/json', 'Authorization': `Bearer ${token}`})
            }).toPromise();
        return result != null && result.length > 0 ? result : []
    }

    public getBasketById(id: any): Observable<BasketItem[]> {
        var token = localStorage.getItem("__bearer");
        return this.client.get<BasketItem[]>(ConnectorService.API_URL + "getBasket?basketId=" + id,
            {
                headers: new HttpHeaders({'content-type': 'application/json', 'Authorization': `Bearer ${token}`})
            });
    }

    async deleteBasketItem(item: BasketItem) {
        var token = localStorage.getItem("__bearer");
        await this.client.post(ConnectorService.API_URL + "removeFromBasket",
            JSON.stringify({productId: item.item.id, count: item.count}),
            {
                headers: new HttpHeaders({'content-type': 'application/json', 'Authorization': `Bearer ${token}`})
            }
        ).toPromise();
    }

    login(loginModel: LoginModel, finishedCallback: (loginData: LoginData) => void, onError: () => void) {
        this.client.post<LoginData>(ConnectorService.API_URL + "login", JSON.stringify(loginModel), { headers: HEADERS } )
            .subscribe(data => finishedCallback(data), (error) => onError());
    }

    register(registerModel: RegisterModel, finishedCallback: () => void) {
        this.client.post(ConnectorService.API_URL + "register", JSON.stringify(registerModel), { headers: HEADERS })
            .subscribe(data => finishedCallback());
    }

    getUserInfo(): Promise<UserInfo> {
        var token = localStorage.getItem("__bearer");
        return this.client.get<UserInfo>(ConnectorService.API_URL + "userinfo",
            {
                headers: new HttpHeaders({'content-type': 'application/json', 'Authorization': `Bearer ${token}`})
            }
        ).toPromise();
    }

    checkout(personalInformation: PersonalInformation, finishedCallback: (basketId: any) => void) {
        var token = localStorage.getItem("__bearer");
        this.client.post(ConnectorService.API_URL + "checkout",
            JSON.stringify({personalInformation: personalInformation, deliveryInformation: new DeliveryInformation(personalInformation)}), 
            {
                headers: new HttpHeaders({'content-type': 'application/json', 'Authorization': `Bearer ${token}`})
            }
        ).subscribe(id => finishedCallback(id));
    }

    getPreviousOrders(): Observable<OrderDetail[]> {
        var token = localStorage.getItem("__bearer");
        return this.client.get<OrderDetail[]>(ConnectorService.API_URL + "getPreviousOrders",
            {
                headers: new HttpHeaders({'content-type': 'application/json', 'Authorization': `Bearer ${token}`})
            }
        );
    }

    /* lol */
    isAdmin(): Promise<boolean> {
        var token = localStorage.getItem("__bearer");
        return this.client.get(ConnectorService.API_URL + "isAdmin",
            {
                headers: new HttpHeaders({'content-type': 'application/json', 'Authorization': `Bearer ${token}`})
            }
        )
        .toPromise().then(x => true, x => false); /* lol */
    }

    uploadImage(image: File): Observable<ImageResult> {
        var token = localStorage.getItem("__bearer");
        var formData: FormData = new FormData();
        formData.append('file', image, image.name);
        return this.client.post<ImageResult>(ConnectorService.API_URL + "uploadPicture", formData, {
            headers: new HttpHeaders({'Authorization': `Bearer ${token}`})
        });
    }
}
