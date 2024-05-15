import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, forkJoin, Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { FeedbackService } from '../../Services/Feedback.service';
import { ProductService } from '../../Services/Product.service';
import { Product } from '../../Models/Product';
import { Feedback } from '../../Models/Feedback';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { RoleBaseService } from '../../Security/RoleBase.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UpdateFeedbackComponent } from '../UpdateFeedback/UpdateFeedback.component';
import { AlertifyService } from '../../Services/alertify.service';
import { DeleteFeedbackComponent } from '../DeleteFeedback/DeleteFeedback.component';
@Component({
  selector: 'app-MyFeedback',
  standalone: true,
  imports:[CommonModule,MatTableModule, MatDialogModule],
  templateUrl: './MyFeedback.component.html',
  styleUrls: ['./MyFeedback.component.css']
})
export class MyFeedbackComponent implements OnInit, OnDestroy 
{
  feedbackList: MatTableDataSource<Feedback> = new MatTableDataSource<Feedback>([]);
  displayedColumns: string[] = ['productName', 'rating', 'comment', 'actions'];
  private feedbackSubscription: Subscription | undefined;
  userEmail : string = '';

  constructor(private feedbackService: FeedbackService, private productService: ProductService,
    private rolebase:RoleBaseService,private dialog: MatDialog,private alertify:AlertifyService) {}

    ngOnInit() 
    {
      this.getUserEmail(); // Call function to retrieve current user's email
    }
  
    ngOnDestroy() 
    {
      if (this.feedbackSubscription) 
      {
        this.feedbackSubscription.unsubscribe();
      }
    }
  
    getUserEmail(): void 
    {
      this.rolebase.currentUser.subscribe(user => {
        if (user) {
          this.userEmail = user['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress']; // Extract user email
          this.loadFeedbackData(); // Once userEmail is retrieved, load feedback data
        }
      });
    }
  
    loadFeedbackData(): void 
    {
      if (this.userEmail) {
        this.feedbackSubscription = this.feedbackService.GetMyFeedback(this.userEmail).pipe(
          switchMap((feedbacks: Feedback[]) => {
            const productRequests: Observable<Product>[] = feedbacks.map(feedback =>
              this.productService.getProductById(feedback.productId)
            );
            return forkJoin(productRequests).pipe(
              map((products: Product[]) => {
                return feedbacks.map((feedback, index) => ({
                  ...feedback,
                  productName: products[index].name // Add productName property to each feedback
                }));
              })
            );
          })
        ).subscribe(
          (feedbacksWithProducts: Feedback[]) => {
            this.feedbackList.data = feedbacksWithProducts;
          },
          (error) => {
            console.error('Error fetching feedbacks or products:', error);
          }
        );
      }
    }
  
    openEditDialog(feedback: Feedback): void 
    {
      const dialogRef = this.dialog.open(UpdateFeedbackComponent, {
        width: '400px',
        data: { ...feedback } // Pass the feedback data to the dialog
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) 
        {
          // Update the feedback
          this.updateFeedback(result);
        }
      });
    }

    updateFeedback(updatedFeedback: Feedback): void 
    {
      this.feedbackService.updateFeedback(updatedFeedback).subscribe(
        (response: any) => {
          console.log('Feedback updated successfully' , response);
          this.alertify.success('Updated successfully');
          this.loadFeedbackData(); // Reload feedbacks after update
        },
        (error) => {
          console.error('Error updating feedback:', error);
          this.alertify.error('Erorr');
        }
      );
    }

    openDeleteDialog(feedback: Feedback): void 
    {
      const dialogRef = this.dialog.open(DeleteFeedbackComponent, {
        width: '400px',
        data: { feedback } // Pass the feedback data to the dialog
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
          console.log('Feedback deleted successfully');
          this.alertify.success('Deleted successfully');
          this.loadFeedbackData(); // Reload feedbacks after deletion
        },
        (error) => {
          console.error('Error deleting feedback:', error);
        }
      );
    }
}


