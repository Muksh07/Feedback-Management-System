import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './Navbar/Navbar/Navbar.component';
import { HomeComponent } from './Home/Home/Home.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ProductCardComponent } from './product/product-card/product-card.component';
import { ProductListComponent } from './product/Product-list/Product-list.component';
import { ProductDetailsComponent } from './product/Product-details/Product-details.component';
import { RegisterComponent } from './Login & Register/RegisterComponent/Register/Register.component';
import { LoginComponent } from './Login & Register/LoginComponent/Login/Login.component';
import { BrowserModule } from '@angular/platform-browser';
import { ProductFeedbackComponent } from './product/product-feedback/product-feedback.component';
import { MyFeedbackComponent } from './MyFeedback/MyFeedback/MyFeedback.component';
import { DashboardComponent } from './Admin/Dashboard/Dashboard/Dashboard.component';
import { FeedbackManagementComponent } from './Admin/FeedbackManagement/FeedbackManagement/FeedbackManagement.component';
import { ProductManagementComponent } from './Admin/ProductManagement/ProductManagement/ProductManagement.component';
import { UserManagementComponent } from './Admin/UserManagement/UserManagement/UserManagement.component';
import { FeedbackPieChartComponent } from './Admin/Charts/PieChart/FeedbackPieChart/FeedbackPieChart.component';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HomeComponent,NavbarComponent,
             HttpClientModule,ProductCardComponent,ProductListComponent,
             ProductDetailsComponent,RegisterComponent,LoginComponent,
             HttpClientModule,ProductFeedbackComponent,MyFeedbackComponent,
             DashboardComponent,FeedbackManagementComponent,ProductManagementComponent,
            UserManagementComponent,FeedbackPieChartComponent],
  // providers: [{ provide: HTTP_INTERCEPTORS, useClass: CustomInterceptor, multi: true }],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent 
{
  title = 'frontend';
}
