import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FeedbackService } from '../../Services/Feedback.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { IFeedback } from '../../../Ifunctionality/IFeedback';
import { AlertifyService } from '../../Services/alertify.service';
import { RoleBaseService } from '../../Security/RoleBase.service';
@Component({
  selector: 'app-product-feedback',
  standalone:true,
  imports:[CommonModule,FormsModule],
  templateUrl: './product-feedback.component.html',
  styleUrls: ['./product-feedback.component.css']
})
export class ProductFeedbackComponent implements OnInit 
{
  feedbackData: IFeedback = {
    name: '',
    email: '',
    productId: null,
    rating: null,
    comment: ''
  };
  constructor(private route: ActivatedRoute, 
    private feedbackService: FeedbackService,
    private alertify:AlertifyService,
    private rolebase : RoleBaseService)
  {}

  ngOnInit()
  {
      const decodedToken = this.rolebase.decodedToken(); 
      if (decodedToken) 
      {
        this.feedbackData.email = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'];
      }
  }

 

  submitFeedback(feedbackForm:NgForm): void 
  {
    
    if(feedbackForm.valid)
    { 
      // debugger
      const productIdParam = this.route.snapshot.paramMap.get('productId');
    if(productIdParam!== null)
    {
      this.feedbackData.productId = +productIdParam;
      this.feedbackService.submitFeedback(this.feedbackData).subscribe(
        (response) => {
          console.log('Feedback submitted successfully:', response);
          this.alertify.success('Success! Your Feedback has been submitted.')
          feedbackForm.resetForm();
          this.feedbackData = {
            name: '',
            email:  this.feedbackData.email,
            productId: this.feedbackData.productId, // Retain productId
            rating: null,
            comment: ''
          };
        },
        (error) => {
          console.error('Error submitting feedback:', error);
          this.alertify.error('Failed!');
        });
    }
    }   
  }
}
