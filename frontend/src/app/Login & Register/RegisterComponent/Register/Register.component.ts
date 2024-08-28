import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { IUser } from '../../../../Ifunctionality/IUser';
import { UserService } from '../../../Services/User.service';
import { AlertifyService } from '../../../Services/alertify.service';
@Component({
  selector: 'app-Register',
  standalone:true,
  imports:[CommonModule,FormsModule],
  templateUrl: './Register.component.html',
  styleUrls: ['./Register.component.css']
})
export class RegisterComponent implements OnInit 
{
    user: IUser = { 
    name: '',
    email: '',
    password: '',
    gender: '',
    phoneNumber: null,
    role: 'user',
    status: 'false'
  };
  
  constructor(private userService: UserService,private alertify:AlertifyService) { }
  ngOnInit() {}

  onSubmit(registrationForm: NgForm) 
  {
    if(registrationForm.valid)
    {
      this.userService.registerUser(this.user).subscribe(
        response => {
          console.log('User registered successfully:', response);
          this.alertify.success('Registration successful! Please wait for admin approval.')
          registrationForm.resetForm();
            // Clear the form data object
            this.user = {
              name: '',
              email: '',
              password: '',
              gender: '',
              phoneNumber: null}
        },
        error => {
          this.alertify.error('Email already Exist')
          console.error('Error registering user:', error);
        }
      );

    }
  }
}
