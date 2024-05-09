import { Component, OnInit } from '@angular/core';
import { Iproduct } from '../../../Ifunctionality/Iproduct';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../Services/Product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-Product-details',
  standalone:true,
  imports:[CommonModule],
  templateUrl: './Product-details.component.html',
  styleUrls: ['./Product-details.component.css']
})
export class ProductDetailsComponent implements OnInit 
{
  product: any; 

  constructor(private route: ActivatedRoute, private productService: ProductService) 
  { 

  }

  ngOnInit(): void {
    this.getProductDetails(); 
  }

  getProductDetails(): void 
  {
    const productIdParam = this.route.snapshot.paramMap.get('id');
    if (productIdParam !== null)
    { 
      const productId = +productIdParam;
      this.productService.getProductById(productId).subscribe(
      (data: any) => {
        this.product = data; 
      },
      (error) => {
        console.error('Error fetching product details:', error);
      }
    );
    }
  }

  

}
