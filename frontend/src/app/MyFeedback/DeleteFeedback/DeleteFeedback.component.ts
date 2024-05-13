import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-DeleteFeedback',
  standalone:true,
  imports:[],
  templateUrl: './DeleteFeedback.component.html',
  styleUrls: ['./DeleteFeedback.component.css']
})
export class DeleteFeedbackComponent implements OnInit 
{

  constructor(public dialogRef: MatDialogRef<DeleteFeedbackComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {}

  onNoClick(): void 
  {
    this.dialogRef.close(false); 
  }

  onYesClick(): void
  {
    this.dialogRef.close(true); 
  }

}
