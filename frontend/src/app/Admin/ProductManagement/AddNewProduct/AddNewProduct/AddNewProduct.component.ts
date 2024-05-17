import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCommonModule } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-AddNewProduct',
  standalone:true,
  imports:[CommonModule,MatCommonModule,MatCommonModule,FormsModule],
  templateUrl: './AddNewProduct.component.html',
  styleUrls: ['./AddNewProduct.component.css']
})
export class AddNewProductComponent implements OnInit 
{
  newProduct: any = {}; 

  constructor(public dialogRef: MatDialogRef<AddNewProductComponent>) {}

  ngOnInit(): void {}

  addProduct(): void 
  {
    this.dialogRef.close(this.newProduct); 
  }

  cancel(): void 
  {
    this.dialogRef.close(); 
  }
}
