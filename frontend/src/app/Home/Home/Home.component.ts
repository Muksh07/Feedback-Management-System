import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../Navbar/Navbar/Navbar.component';

@Component({
  selector: 'app-Home',
  standalone:true,
  imports:[NavbarComponent],
  templateUrl: './Home.component.html',
  styleUrls: ['./Home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
