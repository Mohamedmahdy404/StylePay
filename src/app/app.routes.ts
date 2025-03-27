import { Routes } from '@angular/router';
import { ProductComponent } from './Components/Product/product.component';
import { HomeComponent } from './Components/home/home.component';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    { path: 'home', component: HomeComponent },
    { path: 'product', component: ProductComponent }
];
