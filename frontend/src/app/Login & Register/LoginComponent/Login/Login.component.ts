import { Component} from '@angular/core';
import { FormsModule, NgForm} from '@angular/forms';
import { Router, RouterLinkActive } from '@angular/router';
import { UserService } from '../../../Services/User.service';
import { CommonModule } from '@angular/common';
import { AlertifyService } from '../../../Services/alertify.service';
import { RoleBaseService } from '../../../Security/RoleBase.service';
// import { RoleBasedService } from '../../../Services/Role-based.service';
@Component({
  selector: 'app-login',
  standalone:true,
  imports: [RouterLinkActive,FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent 
{
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  constructor(private authService: UserService,private myRouter: Router ,
              private alertify:AlertifyService,private rolebase:RoleBaseService) { }
  onLogin(loginForm: NgForm): void 
  {
    if (loginForm.valid) {  
      const { email, password } = loginForm.value;
      this.authService.login(email, password).subscribe(
        response => 
        {
          if (response.token) 
          {
            localStorage.setItem('token', response.token);
            const user = this.rolebase.decodeToken(response.token);
            this.rolebase.updateCurrentUser(user);
            this.alertify.success('Login successfull')
             // Redirect based on user role
             if (user && user['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] === 'admin') 
             {
              this.myRouter.navigate(['dashboard']);
             } 
             else 
             {
              this.myRouter.navigate(['products']);
             }
          } 
          else 
          {
            this.alertify.error('Wrong user or password');
          }
        },
        error => {
          this.alertify.error('Wrong user or password');
          console.log('Login failed:', error);
        }
      );
    } else {
      this.alertify.error('Wrong user or password');
    }
  }
}


