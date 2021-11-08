import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ShopComponent } from './shop/shop.component';

export const routingComponents = [ ] 
const routes: Routes = [
    {
        path: "home",
        component: HomeComponent
    },
    {
      path: "shop",
      component: ShopComponent
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
