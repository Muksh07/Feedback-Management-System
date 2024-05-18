import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../../../Services/alertify.service';
import { UserService } from '../../../Services/User.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-ChangePassword',
  standalone:true,
  imports:[CommonModule,FormsModule],
  templateUrl: './ChangePassword.component.html',
  styleUrls: ['./ChangePassword.component.css']
})
export class ChangePasswordComponent implements OnInit 
{

  user = {
    email: '',
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  };
  constructor(private userService: UserService, private alertify: AlertifyService) { }

  ngOnInit(): void {}

  onSubmit(form: NgForm): void {
    if (form.valid && this.user.newPassword === this.user.confirmNewPassword) {
      this.userService.changePassword(this.user.oldPassword, this.user.newPassword).subscribe(
        (response: any) => {
          if (response === 'true') 
          {
            this.alertify.success('Password changed successfully');
            form.reset();
          } else {
            this.alertify.error(response);
          }
        },
        error => {
          this.alertify.error('Failed to change password');
          console.error('Error changing password:', error);
        }
      );
    } else {
      this.alertify.error('Passwords do not match');
    }
  }
  
}
