import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderItem, ShoppingCartItem } from 'src/models/order.model';
import { ShopService } from '../shop.service';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.sass']
})

export class ProductListComponent {
  // ngModel para controlar la visualización el modal
  display = "none"
  address: string = localStorage.getItem('address') || ''
  phone: string = localStorage.getItem('phone') || ''
  dni: string = localStorage.getItem('dni') || ''

  @Input() onOrderCreated: (p: string) => void = () => { }

  constructor(
    private orderService: OrderService
  ) { }

  createOrder() {
    return this.orderService.createOrder({ address: this.address, phone: this.phone, dni: this.dni }).subscribe(_ => {
      this.onOrderCreated('shop')
      this.onCloseHandled()
    })
  }

  openModal() {
    this.display = "block"
  }

  onCloseHandled() {
    this.display = "none"
  }
}