import { Component, OnInit } from '@angular/core';
import { FeedbackService } from '../../../../Services/Feedback.service';
import { ProductService } from '../../../../Services/Product.service';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-FeedbackBarChart',
  standalone:true,
  imports:[],
  templateUrl: './FeedbackBarChart.component.html',
  styleUrls: ['./FeedbackBarChart.component.css']
})
export class FeedbackBarChartComponent implements OnInit 
{
  feedbackData: any[] = [];

  constructor(private feedbackService: FeedbackService, private productService: ProductService) {}

  ngOnInit(): void {
    this.loadFeedbackData();
  }

  loadFeedbackData(): void {
    this.feedbackService.getAllFeedback().subscribe(
      (data) => {
        this.feedbackData = data;
        this.generateBarChart();
      },
      (error) => {
        console.error('Error fetching feedback data:', error);
      }
    );
  }

  generateBarChart(): void {
    const productIds = Array.from(new Set(this.feedbackData.map((item) => item.productId)));

    const labels: string[] = [];
    const averageRatings: number[] = [];

    productIds.forEach((productId) => {
      const productFeedbacks = this.feedbackData.filter((item) => item.productId === productId);
      const totalRatings = productFeedbacks.reduce((sum, item) => sum + item.rating, 0);
      const averageRating = totalRatings / productFeedbacks.length;

      this.productService.getProductById(productId).subscribe(
        (product) => {
          labels.push(product.name); // Use product name as label
          averageRatings.push(averageRating);

          // Check if all product data is collected before generating the chart
          if (labels.length === productIds.length) {
            this.generateChart(labels, averageRatings);
          }
        },
        (error) => {
          console.error(`Error fetching product with ID ${productId}:`, error);
        }
      );
    });
  }

  generateChart(labels: string[], averageRatings: number[]): void {
    const canvas = document.getElementById('barChart') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Average Rating of Products',
            data: averageRatings,
            backgroundColor: '#FF5733', // Customize bar color
          }],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Average Rating'
              }
            },
            x: {
              title: {
                display: true,
                text: 'Products'
              }
            }
          },
        }
      });
    }
  }
}
