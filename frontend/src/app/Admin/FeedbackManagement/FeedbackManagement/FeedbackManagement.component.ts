import { CommonModule } from '@angular/common';
import { Component, OnInit} from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { FeedbackService } from '../../../Services/Feedback.service';
import { ProductService } from '../../../Services/Product.service';
import { Product } from '../../../Models/Product';
import { forkJoin } from 'rxjs';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Feedback } from '../../../Models/Feedback';
import { DeleteUserComponent } from '../../UserManagement/DeleteUser/DeleteUser/DeleteUser.component';
import { AlertifyService } from '../../../Services/alertify.service';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
@Component({
  selector: 'app-FeedbackManagement',
  standalone:true,
  imports:[CommonModule,MatTableModule, MatDialogModule,MatFormFieldModule,
    MatSelectModule,FormsModule,MatInputModule,],
  templateUrl: './FeedbackManagement.component.html',
  styleUrls: ['./FeedbackManagement.component.css']
})
export class FeedbackManagementComponent implements OnInit 
{
  feedbackList: any[] = [];
  filteredFeedbackList: any[] = [];
  displayedColumns: string[] = ['name', 'email', 'productName', 'rating', 'comment', 'actions'];
  constructor(private feedbackService: FeedbackService, private productService: ProductService,
    private dialog: MatDialog,private alertify:AlertifyService) { }
  ngOnInit(): void 
  {
    this.loadFeedbackData();
  }
  loadFeedbackData(): void 
  {
    this.feedbackService.getAllFeedback().subscribe(
      (feedbacks: any[]) => {
        // Fetch all product details
        const productObservables = feedbacks.map(feedback => this.productService.getProductById(feedback.productId));
        forkJoin(productObservables).subscribe(
          (products: Product[]) => {
            this.feedbackList = feedbacks.map(feedback => {
              const product = products.find(p => p.id === feedback.productId);
              return { ...feedback, productName: product ? product.name : 'Unknown' };
            });
            this.filteredFeedbackList = this.feedbackList;
          },
          (error) => {
            console.error('Error fetching product data:', error);
          }
        );
      },
      (error) => {
        console.error('Error fetching feedback data:', error);
      }
    );
  }
  applyFilter(searchValue: string): void 
  {
    this.filteredFeedbackList = this.feedbackList.filter(feedback =>
      feedback.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      feedback.email.toLowerCase().includes(searchValue.toLowerCase()) ||
      feedback.productName.toLowerCase().includes(searchValue.toLowerCase()) ||
      feedback.comment.toLowerCase().includes(searchValue.toLowerCase())
    );
  }
  openDeleteDialog(feedback: Feedback): void 
  {
    const dialogRef = this.dialog.open(DeleteUserComponent, {
      width: '400px',
      data: { message: `Are you sure you want to delete the Feedback?` }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        // User confirmed deletion (result is true)
        this.deleteFeedback(feedback);
      }
    });
  }
  deleteFeedback(feedback: Feedback): void 
  {
    this.feedbackService.deleteFeedback(feedback.id).subscribe(
      () => {
        console.log('feedback deleted successfully');
        this.alertify.success('Deleted successfully');
        this.loadFeedbackData(); // Reload feedbacks after deletion
      },
      (error) => {
        console.error('Error deleting feedback:', error);
      }
    );
  }
  printFeedback(feedback: Feedback): void 
  {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text('Feedback Details', 10, 10);
    doc.setFontSize(12);
    doc.text(`Name: ${feedback.name}`, 10, 20);
    doc.text(`Email: ${feedback.email}`, 10, 30);
    doc.text(`Product Name: ${feedback.productName}`, 10, 40);
    doc.text(`Rating: ${feedback.rating}`, 10, 50);
    doc.text(`Comment: ${feedback.comment}`, 10, 60);
    doc.save(`Feedback_${feedback.id}.pdf`);
  }
}


