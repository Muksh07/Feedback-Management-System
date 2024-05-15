import { Component, OnInit } from '@angular/core';
import { FeedbackService } from '../../../../Services/Feedback.service';
import { Chart, registerables } from 'chart.js';
import { ProductService } from '../../../../Services/Product.service';

Chart.register(...registerables);

@Component({
  selector: 'app-FeedbackPieChart',
  standalone:true,
  templateUrl: './FeedbackPieChart.component.html',
  styleUrls: ['./FeedbackPieChart.component.css']
})
export class FeedbackPieChartComponent implements OnInit {
  feedbackData: any[] = [];
  totalFeedbacks:number = 0;

  constructor(private feedbackService: FeedbackService, private productService: ProductService) {}

  ngOnInit(): void {
    this.loadFeedbackData();
  }

  loadFeedbackData(): void {
    this.feedbackService.getAllFeedback().subscribe(
      (data) => {
        this.feedbackData = data;
        this.generatePieChart();
      },
      (error) => {
        console.error('Error fetching feedback data:', error);
      }
    );
  }

  generatePieChart(): void {
    const productIds = this.feedbackData.map((item) => item.productId);
    const uniqueProductIds = Array.from(new Set(productIds));

    const labels: string[] = [];
    const counts: number[] = [];

    // Fetch product names for each unique product ID
    uniqueProductIds.forEach((productId) => {
      this.productService.getProductById(productId).subscribe(
        (product) => {
          labels.push(product.name); // Use product name as label
          const productFeedbackCount = this.feedbackData.filter((item) => item.productId === productId).length;
          counts.push(productFeedbackCount);

          // Check if all product names are fetched before generating the chart
          if (labels.length === uniqueProductIds.length) 
          {
            this.totalFeedbacks = this.feedbackData.length;
            this.generateChart(labels, counts);
          }
        },
        (error) => {
          console.error(`Error fetching product with ID ${productId}:`, error);
        }
      );
    });
  }

  generateChart(labels: string[], counts: number[]): void {
    const canvas = document.getElementById('pieChart') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      new Chart(ctx, {
        type: 'pie',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Feedbacks',
              data: counts,
              backgroundColor: ['#FF5733', '#C70039', '#900C3F', '#581845'] // Add more colors as needed
            }],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: true,
              position: 'bottom', // Adjust legend position
            },
            title: {
              display: true,
              text: `Total Feedbacks: ${this.totalFeedbacks}`,
              padding: 10, // Adjust title padding
              font: {
                size: 16, // Adjust title font size
                weight: 'bold', // Adjust title font weight
              },
            },
          },
        }
      });
    }
  }
}