import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Observable, of } from 'rxjs';
import { Product } from 'src/models/product.model';
import { ShoppingCartItem } from 'src/models/order.model';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.sass']
})
export class ShopComponent implements OnInit {
  products: Observable<Product[]> | undefined
  shoppingCartItems: Observable<ShoppingCartItem[]> = of([] as ShoppingCartItem[])
  minPrice: string = ''
  maxPrice: string = ''
  catalog: string = ''

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.products = this.productService.getProducts({
      minPrice: this.minPrice,
      maxPrice: this.maxPrice,
      catalog: this.catalog
    })
  }
}
