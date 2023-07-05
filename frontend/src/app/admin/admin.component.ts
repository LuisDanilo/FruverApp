import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/models/product.model';
import { ProductService } from '../product.service';
import { Observable } from 'rxjs';
import { Order } from 'src/models/order.model';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.sass']
})
export class AdminComponent implements OnInit {
  // Panel a mostrar en administración
  panel: string = 'orders'
  // Listado de productos
  products: Observable<Product[]> | undefined
  // Listado de órdenes
  orders: Observable<Order[]> | undefined

  constructor(private router: Router, private productService: ProductService, private orderService: OrderService) { }

  ngOnInit(): void {
    this.products = this.productService.getProducts()
    this.orders = this.orderService.getOrders()
  }

  /**
   * Método que actualiza la variable panel
   */
  setPanel(p: string) {
    this.panel = p
  }

  approveOrder(orderId: string) {
    return this.orderService.approveOrder(orderId).subscribe(_ => this.ngOnInit())
  }

  rejectOrder(orderId: string) {
    return this.orderService.rejectOrder(orderId).subscribe(_ => this.ngOnInit())
  }
}
