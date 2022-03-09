import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { ConfirmationComponent } from './pages/confirmation/confirmation.component';
import { EditProductComponent } from './pages/edit-product/edit-product.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { OrderOverviewComponent } from './pages/order-overview/order-overview.component';
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
        path: "logout",
        component: LogoutComponent
    },
    {
        path: "register",
        component: RegisterComponent
    },
    {
        path: "confirmation/:id",
        component: ConfirmationComponent
    },
    {
        path: "edit/:id",
        component: EditProductComponent
    },
    {
        path: "order-overview",
        component: OrderOverviewComponent
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
