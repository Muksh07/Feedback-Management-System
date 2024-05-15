import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ProductManagement',
  standalone:true,
  imports:[CommonModule],
  templateUrl: './ProductManagement.component.html',
  styleUrls: ['./ProductManagement.component.css']
})
export class ProductManagementComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
