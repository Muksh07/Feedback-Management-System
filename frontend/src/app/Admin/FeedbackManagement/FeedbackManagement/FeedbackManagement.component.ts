import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { FeedbackService } from '../../../Services/Feedback.service';
import { ProductService } from '../../../Services/Product.service';
import { Product } from '../../../Models/Product';

@Component({
  selector: 'app-FeedbackManagement',
  standalone:true,
  imports:[CommonModule,MatTableModule, MatDialogModule],
  templateUrl: './FeedbackManagement.component.html',
  styleUrls: ['./FeedbackManagement.component.css']
})
export class FeedbackManagementComponent implements OnInit 
{
  feedbackList: any[] = [];
  displayedColumns: string[] = ['name', 'email', 'productName', 'rating', 'comment', 'actions'];

  constructor(private feedbackService: FeedbackService, private productService: ProductService) { }

  ngOnInit(): void 
  {
    this.loadFeedbackData();
  }

  loadFeedbackData(): void 
  {
    this.feedbackService.getAllFeedback().subscribe(
      (feedbacks: any[]) => {
        this.feedbackList = feedbacks;
      },
      (error) => {
        console.error('Error fetching feedback data:', error);
      }
    );
  }

  getProductName(productId: number): string 
  {
    const product: any| undefined = this.productService.getProductById(productId);
    return product ? product.name : '';
  }

  deleteFeedback(feedbackId: number): void 
  {
    this.feedbackService.deleteFeedback(feedbackId).subscribe(
      () => {
        this.feedbackList = this.feedbackList.filter((feedback) => feedback.id !== feedbackId);
      },
      (error) => {
        console.error('Error deleting feedback:', error);
      }
    );
  }
}


