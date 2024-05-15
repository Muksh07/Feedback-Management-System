import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-UserManagement',
  standalone:true,
  imports:[CommonModule],
  templateUrl: './UserManagement.component.html',
  styleUrls: ['./UserManagement.component.css']
})
export class UserManagementComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
