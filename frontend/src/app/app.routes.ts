import { Routes } from '@angular/router';
import { LoginComponent } from './Login & Register/LoginComponent/Login/Login.component';
import { RegisterComponent } from './Login & Register/RegisterComponent/Register/Register.component';
import { HomeComponent } from './Home/Home/Home.component';
import { ProductListComponent } from './product/Product-list/Product-list.component';
import { ProductDetailsComponent } from './product/Product-details/Product-details.component';
import { ProductFeedbackComponent } from './product/product-feedback/product-feedback.component';
import { MyFeedbackComponent } from './MyFeedback/MyFeedback/MyFeedback.component';
import { DashboardComponent } from './Admin/Dashboard/Dashboard/Dashboard.component';
import { UserManagementComponent } from './Admin/UserManagement/UserManagement/UserManagement.component';
import { ProductManagementComponent } from './Admin/ProductManagement/ProductManagement/ProductManagement.component';
import { FeedbackManagementComponent } from './Admin/FeedbackManagement/FeedbackManagement/FeedbackManagement.component';
import { ChangePasswordComponent } from './Login & Register/ChangePassword/ChangePassword/ChangePassword.component';
import { CustomAuthentication } from './Security/Authentication';


export const  myRouting :Routes = [
    {path: '', component: HomeComponent},
    {path: 'sign-up', component: RegisterComponent},
    {path: 'log-in', component: LoginComponent},
    {path: 'change-password', component: ChangePasswordComponent},
    { path: 'products', component: ProductListComponent ,canActivate:[CustomAuthentication]},
    { path: 'product-details/:id', component: ProductDetailsComponent },
    {path: 'feedback/:productId' , component: ProductFeedbackComponent},
    {path: 'product-details/:id', component: ProductDetailsComponent},
    { path: 'my-feedbacks', component: MyFeedbackComponent },

    { path: 'dashboard', component: DashboardComponent},
    { path: 'UserManagement', component: UserManagementComponent },
    { path: 'ProductManagement', component: ProductManagementComponent },
    { path: 'FeedbackManagement', component: FeedbackManagementComponent }
    // {path: 'alumni-list', component: HomeComponent , canActivate:[customAuthentication]},
    // {path: '', component: StartBtnComponent},
]