import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../../Services/alertify.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RoleBaseService } from '../../Security/RoleBase.service';
// import { RoleBasedService } from '../../Services/Role-based.service';

@Component({
  selector: 'app-Navbar',
  standalone: true,
  imports:[RouterLink,RouterLinkActive,CommonModule],
  templateUrl: './Navbar.component.html',
  styleUrls: ['./Navbar.component.css']
})
export class NavbarComponent implements OnInit {


  public loggedinuser : string = '';

  constructor(private alertify:AlertifyService,private router: Router,
    private rolebase: RoleBaseService) 
  { 
    
  }

  ngOnInit() 
  {
    this.rolebase.currentUser.subscribe(user => {
      if (user) {
        this.loggedinuser = user['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
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
    this.router.navigate(['/']);
  }
  

  // OnLoginClick(): void 
  // {
  //   this.router.navigate(['/log-in']);
  // }

 
}
