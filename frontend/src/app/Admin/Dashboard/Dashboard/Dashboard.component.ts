import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FeedbackPieChartComponent } from '../../Charts/PieChart/FeedbackPieChart/FeedbackPieChart.component';
import { FeedbackBarChartComponent } from '../../Charts/BarChart/FeedbackBarChart/FeedbackBarChart.component';

@Component({
  selector: 'app-Dashboard',
  standalone:true,
  imports:[CommonModule, RouterOutlet,FeedbackPieChartComponent,FeedbackBarChartComponent],
  templateUrl: './Dashboard.component.html',
  styleUrls: ['./Dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
