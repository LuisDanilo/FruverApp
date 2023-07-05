import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Observable, of } from 'rxjs';
import { Product } from 'src/models/product.model';
import { ShoppingCartItem } from 'src/models/order.model';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.sass']
})
export class ShopComponent implements OnInit {
  products: Observable<Product[]> = of([])
  shoppingCartItems: Observable<ShoppingCartItem[]> = of([])
  minPrice: string = ''
  maxPrice: string = ''
  catalog: string = ''
  panel: string = 'shop'
  total: number = 0
  constructor(
    private productService: ProductService,
    private shopService: ShopService
  ) { }

  ngOnInit(): void {
    this.products = this.productService.getProducts({
      minPrice: this.minPrice,
      maxPrice: this.maxPrice,
      catalog: this.catalog
    })
    this.shoppingCartItems = this.shopService.getShoppingCartItems()
  }

  setPanel(p: string) {
    this.panel = p
  }

  enableButton(items: ShoppingCartItem[] | null) {
    return items && items.length > 0
  }
}
