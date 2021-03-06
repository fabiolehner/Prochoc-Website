import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';

import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ShopComponent } from './pages/shop/shop.component';
import { HomeComponent } from './pages/home/home.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { AboutComponent } from './pages/about/about.component';
import { LoginComponent } from './pages/login/login.component';
import { ProductComponent } from './pages/product/product.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { RegisterComponent } from './pages/register/register.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { NgxPaypalComponent, NgxPayPalModule } from 'ngx-paypal';
import {MatSelectModule} from '@angular/material/select';
import { ConfirmationComponent } from './pages/confirmation/confirmation.component';
import { EditProductComponent } from './pages/edit-product/edit-product.component';
import { OrderOverviewComponent } from './pages/order-overview/order-overview.component';

@NgModule({
  declarations: [
    AppComponent,
    ShoppingCartComponent,
    ShopComponent,
    HomeComponent,
    CheckoutComponent,
    AboutComponent,
    LoginComponent,
    ProductComponent,
    RegisterComponent,
    LogoutComponent,
    ConfirmationComponent,
    EditProductComponent,
    OrderOverviewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    NgxPayPalModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
