import { Component, OnInit,Inject } from '@angular/core';
import { MatCommonModule } from '@angular/material/core';
import { Feedback } from '../../Models/Feedback';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-UpdateFeedback',
  standalone:true,
  imports:[MatCommonModule,MatCommonModule,FormsModule],
  templateUrl: './UpdateFeedback.component.html',
  styleUrls: ['./UpdateFeedback.component.css']
})
export class UpdateFeedbackComponent implements OnInit 
{
  editedFeedback: Feedback;

  constructor(public dialogRef: MatDialogRef<UpdateFeedbackComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Feedback) 
  { 
    this.editedFeedback = { ...data };
  }

  ngOnInit() {}

  submitEditFeedback(): void 
  {
    // Close the dialog and pass the editedFeedback back to parent component
    this.dialogRef.close(this.editedFeedback);
  }

}
