import { Routes } from '@angular/router';
import { LoginComponent } from './Login & Register/LoginComponent/Login/Login.component';
import { RegisterComponent } from './Login & Register/RegisterComponent/Register/Register.component';
import { HomeComponent } from './Home/Home/Home.component';
import { ProductListComponent } from './product/Product-list/Product-list.component';
import { ProductDetailsComponent } from './product/Product-details/Product-details.component';
import { ProductFeedbackComponent } from './product/product-feedback/product-feedback.component';


export const  myRouting :Routes = [
    {path: '', component: HomeComponent},
    {path: 'sign-up', component: RegisterComponent},
    {path: 'log-in', component: LoginComponent},
    { path: 'products', component: ProductListComponent },
    { path: 'product-details/:id', component: ProductDetailsComponent },
    {path: 'feedback/:productId' , component: ProductFeedbackComponent},
    {path: 'product-details/:id', component: ProductDetailsComponent}
    // {path: 'alumni-list', component: HomeComponent , canActivate:[customAuthentication]},
    // {path: '', component: StartBtnComponent},
]