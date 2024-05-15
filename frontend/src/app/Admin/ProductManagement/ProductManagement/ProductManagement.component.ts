import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../Services/Product.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-ProductManagement',
  standalone:true,
  imports:[CommonModule,MatTableModule, MatDialogModule],
  templateUrl: './ProductManagement.component.html',
  styleUrls: ['./ProductManagement.component.css']
})
export class ProductManagementComponent implements OnInit 
{
  products: any[] = [];
  displayedColumns: string[] = ['name', 'description', 'clients', 'actions'];

  constructor(private productService: ProductService, public dialog: MatDialog) { }

  ngOnInit(): void 
  {
    this.loadProducts();
  }

  loadProducts(): void 
  {
    this.productService.getAllProducts().subscribe(
      (products) => {
        this.products = products;
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  editProduct(product: any): void 
  {
    console.log('Edit product:', product);
  }

  deleteProduct(product: any): void 
  {
    console.log('Delete product:', product);
  }
}
