import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/models/product.model';
import { ProductService } from '../product.service';
import get from 'lodash.get'
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.sass']
})
export class ProductsComponent implements OnInit {
  panel: string = 'products'
  products: Observable<Product[]> | undefined

  constructor(private router: Router, private productService: ProductService) { }

  ngOnInit(): void {
    this.products = this.productService.getProducts()
    console.log(this.products)
  }

  setPanel(p: string) {
    this.panel = p
  }

}
