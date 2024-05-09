import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Iproduct } from '../../../Ifunctionality/Iproduct';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit 
{
  @Input() product!: Iproduct;
  @Input() hiddenIcons?:boolean;

  constructor() { }

  ngOnInit() {
  }

}
