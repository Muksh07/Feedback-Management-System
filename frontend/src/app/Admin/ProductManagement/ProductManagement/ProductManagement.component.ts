import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../Services/Product.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { EditProductComponent } from '../EditProduct/EditProduct/EditProduct.component';
import { AlertifyService } from '../../../Services/alertify.service';
import { AddNewProductComponent } from '../AddNewProduct/AddNewProduct/AddNewProduct.component';
import { Product } from '../../../Models/Product';
import { DeleteUserComponent } from '../../UserManagement/DeleteUser/DeleteUser/DeleteUser.component';
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
  constructor(private productService: ProductService, public dialog: MatDialog,
    private alertify:AlertifyService) { }
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
    const dialogRef = this.dialog.open(EditProductComponent, {
      width: '400px',
      data: { ...product }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) 
      {
        console.log('Dialog result:', result);
        const updatedProduct = { ...product, ...result };
        this.productService.updateProduct(updatedProduct).subscribe(
          (response) => 
          {
            //console.log('Update response:', response);
            this.alertify.success('Updated successfully');
            this.loadProducts();
          },
          (error) => {
            console.error('Error updating product:', error);
          }
        );
      }
    });
  }

  openAddProductDialog(): void 
  {
    const dialogRef = this.dialog.open(AddNewProductComponent, {
      width: '400px' ,
      height: '400px'
    });

    dialogRef.afterClosed().subscribe(newProduct => {
      if (newProduct) 
      {
        console.log('New product:', newProduct);
        this.productService.addProduct(newProduct).subscribe(
          (response) => {
            console.log('Add response:', response);
            this.alertify.success('Added successfully');
            this.loadProducts();
          },
          (error) => {
            console.error('Error adding product:', error);
          }
        );
      }
    });
  }

  openDeleteDialog(product: Product): void 
  {
    const dialogRef = this.dialog.open(DeleteUserComponent, {
      width: '400px',
      data: { message: `Are you sure you want to delete the product "${product.name}"?` }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        // User confirmed deletion (result is true)
        this.deleteProduct(product);
      }
    });
  }
  deleteProduct(product: Product): void 
  {
    this.productService.deleteProduct(product.id).subscribe(
      () => {
        console.log('Product deleted successfully');
        this.alertify.success('Deleted successfully');
        this.loadProducts(); // Reload feedbacks after deletion
      },
      (error) => {
        console.error('Error deleting feedback:', error);
      }
    );
  }
  
}
