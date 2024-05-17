import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { MatCommonModule } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-EditProduct',
  standalone:true,
  imports:[CommonModule,MatCommonModule,MatCommonModule,FormsModule],
  templateUrl: './EditProduct.component.html',
  styleUrls: ['./EditProduct.component.css']
})
export class EditProductComponent implements OnInit 
{
  editedProduct: any;

  constructor(public dialogRef: MatDialogRef<EditProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any)
  {
    this.editedProduct = { ...data };
  }
  ngOnInit(): void { }

  onSave(): void {
    this.dialogRef.close(this.editedProduct);
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
