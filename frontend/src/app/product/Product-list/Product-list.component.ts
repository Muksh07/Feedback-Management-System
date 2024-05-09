import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import { Iproduct } from '../../../Ifunctionality/Iproduct';
import { ProductService } from '../../Services/Product.service';
@Component({
  selector: 'app-Product-list',
  standalone: true,
  imports:[ProductCardComponent,NgFor,NgIf],
  templateUrl: './Product-list.component.html',
  styleUrls: ['./Product-list.component.css']
})
export class ProductListComponent implements OnInit 
{
  products: Iproduct[] = [];
  constructor(private productService: ProductService) { }
  ngOnInit(): void 
  {
    this.productService.getAllProducts().subscribe(
      (data: Iproduct[]) => {
        this.products = data;
      },
      error => {
        console.error(error);
      } 
    );
  }
}
