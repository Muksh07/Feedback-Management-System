import { Component, OnInit ,Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-DeleteUser',
  standalone:true,
  imports:[],
  templateUrl: './DeleteUser.component.html',
  styleUrls: ['./DeleteUser.component.css']
})
export class DeleteUserComponent implements OnInit 
{
  constructor(public dialogRef: MatDialogRef<DeleteUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }) { }
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
