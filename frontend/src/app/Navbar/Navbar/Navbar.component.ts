import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../../Services/alertify.service';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RoleBaseService } from '../../Security/RoleBase.service';
// import { RoleBasedService } from '../../Services/Role-based.service';
@Component({
  selector: 'app-Navbar',
  standalone: true,
  imports:[RouterLink,RouterLinkActive,CommonModule,RouterOutlet],
  templateUrl: './Navbar.component.html',
  styleUrls: ['./Navbar.component.css']
})
export class NavbarComponent implements OnInit 
{
  public loggedinuser : string = '';
  public loggedinuserRole : string = '';
  public isAdmin: boolean = false;

  constructor(private alertify:AlertifyService,private router: Router,
    private rolebase: RoleBaseService) 
  {  
  }
  ngOnInit() 
  {
    this.rolebase.currentUser.subscribe(user => {
      if (user) 
      {
        this.loggedinuser = user['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
        this.loggedinuserRole= user['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
        this.isAdmin = this.loggedinuserRole.toLowerCase() === 'admin';
      }
      else {
        // Reset isAdmin to false if no user is logged in
        this.isAdmin = false;
      }
    });    
  }

  loggedin() :boolean
  {
    return localStorage.getItem('token') !== null;
  }

  Onlogout() : void
  {
    localStorage.removeItem('token');
    this.isAdmin = false;
    this.router.navigate(['/']);
  } 

  OnMyFeedback(): void
  {
    this.router.navigate(['/my-feedbacks']);
  }
}
