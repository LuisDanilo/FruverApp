import { Component, Input, OnInit } from '@angular/core';
import { ShopService } from '../shop.service';
import { OrderItem, ShoppingCartItem } from 'src/models/order.model';
import { Observable, of } from 'rxjs';
import { Product } from 'src/models/product.model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.sass']
})
// export class ProductCardComponent implements OnInit {
export class ProductCardComponent {
  @Input() product: Product | null = null
  @Input() onProductAdded: null | (() => void) = null
  desiredUnits: string = ''
  constructor(private shopService: ShopService) { }

  // ngOnInit(): void {
  //   this.shoppingCartItems = this.shopService.getShoppingCartItems()
  // }

  addToShoppingCart() {
    this.product && this.shopService.addShoppingCartItem(this.product.id, this.desiredUnits).subscribe(data => {
      this.onProductAdded && this.onProductAdded()
    })
  }
}
