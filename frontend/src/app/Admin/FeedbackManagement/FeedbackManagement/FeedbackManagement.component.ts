import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-FeedbackManagement',
  standalone:true,
  imports:[CommonModule],
  templateUrl: './FeedbackManagement.component.html',
  styleUrls: ['./FeedbackManagement.component.css']
})
export class FeedbackManagementComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
