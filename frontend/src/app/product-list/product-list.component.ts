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

export class ProductListComponent implements OnInit {
  // Text del boton que lanza el modal
  @Input() text: string = "Ver productos"
  // ngModel para controlar la visualización el modal
  display = "none"
  // ID de la orden (si se está visualizando items de una orden)
  @Input() orderId: string = ''
  // Productos a listar
  // Cuando se trata del carrito es de tipo ShoppingCartItem[]
  // Cuando se trata de una orden es de tipo OrderItem[]
  items: Observable<OrderItem[] | ShoppingCartItem[]> | undefined

  constructor(
    private shopService: ShopService,
    private orderService: OrderService
  ) { }

  ngOnInit() {
    this.items = this.orderId ? this.orderService.getOrderItems(this.orderId) : this.shopService.getShoppingCartItems()
  }

  openModal() {
    this.ngOnInit()
    this.display = "block"
  }

  onCloseHandled() {
    this.display = "none"
  }
}