import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProductComponent } from './pages/product/product.component';
import { RegisterComponent } from './pages/register/register.component';
import { ShopComponent } from './pages/shop/shop.component';

export const routingComponents = []
const routes: Routes = [
    {
        path: "home",
        component: HomeComponent
    },
    {
        path: "shop",
        component: ShopComponent
    },
    {
        path: "product/:id",
        component: ProductComponent
    },
    {
        path: "checkout",
        component: CheckoutComponent
    },
    {
        path: "about",
        component: AboutComponent
    },
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "register",
        component: RegisterComponent
    },

    // Otherwise redirect to the main page if a
    // non existent route has been specified.  
    { path: "**", redirectTo: "home" }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
