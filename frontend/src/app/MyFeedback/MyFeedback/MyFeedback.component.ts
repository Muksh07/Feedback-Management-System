// import { CommonModule } from '@angular/common';
// import { Component, OnInit } from '@angular/core';
// import { FeedbackService } from '../../Services/Feedback.service';
// import { ProductService } from '../../Services/Product.service';
// import { Product } from '../../Models/Product';
// import { Feedback } from '../../Models/Feedback';
// import { MatTableDataSource, MatTableModule } from '@angular/material/table';
// import { Subscription } from 'rxjs';
// @Component({
//   selector: 'app-MyFeedback',
//   standalone: true,
//   imports:[CommonModule,MatTableModule],
//   templateUrl: './MyFeedback.component.html',
//   styleUrls: ['./MyFeedback.component.css']
// })
// export class MyFeedbackComponent implements OnInit 
// {
//   feedbackList!: MatTableDataSource<Feedback>;
//   Columns: string[] = ['productName', 'rating', 'comment', 'actions'];
//   private feedbackSubscription: Subscription | undefined;

//   constructor(private feedbackservice : FeedbackService, private productservice : ProductService) 
//   {
//     this.feedbackList = new MatTableDataSource<Feedback>([]);
//    }

//   ngOnInit() 
//   {
//     const userEmail = 'kumar@gmail.com';
//     this.feedbackservice.GetMyFeedback(userEmail).subscribe(
//       (feedbacks: Feedback[]) => {
//         this.feedbackList.data = feedbacks;
//       },
//       (error) => {
//         console.error('Error fetching feedback:', error);
//       }
//     );
//   }
//   getProductName(productId: number): string {
//     let productName = '';
//     this.productservice.getProductById(productId).subscribe(
//       (product: any) => {
//         productName = product.name;
//       },
//       (error) => {
//         console.error('Error fetching product:', error);
//       }
//     );
//     return productName;
//   }
//   handleUpdateFeedback(feedbackId: number): void {
//     console.log('Update feedback:', feedbackId);
//   }
//   handleDeleteFeedback(feedbackId: number): void {
//     console.log('Delete feedback:', feedbackId);
//   }

//   ngOnDestroy() 
//   {
//     if (this.feedbackSubscription) 
//     {
//       this.feedbackSubscription.unsubscribe();
//     }
//   }
// }
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, forkJoin, Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { FeedbackService } from '../../Services/Feedback.service';
import { ProductService } from '../../Services/Product.service';
import { Product } from '../../Models/Product';
import { Feedback } from '../../Models/Feedback';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-MyFeedback',
  standalone: true,
  imports:[CommonModule,MatTableModule],
  templateUrl: './MyFeedback.component.html',
  styleUrls: ['./MyFeedback.component.css']
})
export class MyFeedbackComponent implements OnInit, OnDestroy 
{
  feedbackList: MatTableDataSource<Feedback> = new MatTableDataSource<Feedback>([]);
  displayedColumns: string[] = ['productName', 'rating', 'comment', 'actions'];
  private feedbackSubscription: Subscription | undefined;

  constructor(private feedbackService: FeedbackService, private productService: ProductService) {}

  ngOnInit() {
    const userEmail = 'kumar@gmail.com';
    this.feedbackSubscription = this.feedbackService.GetMyFeedback(userEmail).pipe(
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

  ngOnDestroy() {
    if (this.feedbackSubscription) {
      this.feedbackSubscription.unsubscribe();
    }
  }

  handleUpdateFeedback(feedbackId: number): void {
    console.log('Update feedback:', feedbackId);
  }

  handleDeleteFeedback(feedbackId: number): void {
    console.log('Delete feedback:', feedbackId);
  }
}


