import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Observable, of } from 'rxjs';
import { Product } from 'src/models/product.model';
import { ShoppingCartItem } from 'src/models/order.model';
import { ShopService } from '../shop.service';
import { Notification } from 'src/models/notification.model';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.sass']
})
export class ShopComponent implements OnInit {
  // Datos inicializados a mostrar en las tabs 1,2, y 3 respectivamente
  products: Observable<Product[]> = of([])
  shoppingCartItems: Observable<ShoppingCartItem[]> = of([])
  notifications: Observable<Notification[]> = of([])
  // ngModels para filtros de productos
  minPrice: string = ''
  maxPrice: string = ''
  catalog: string = ''
  // ngModel para controlar la tab mostrada
  panel: string = 'shop'

  /**
   * Constructor para inicializar los servicios
   */
  constructor(
    private productService: ProductService,
    private shopService: ShopService,
    private notificationService: NotificationService
  ) { }

  /**
   * Obtiene listado de productos de la tienda
   * Obtiene listado de productos en el carrito
   * Obtiene notificaciones
   */
  ngOnInit(): void {
    this.products = this.productService.getProducts({
      minPrice: this.minPrice,
      maxPrice: this.maxPrice,
      catalog: this.catalog
    })
    this.shoppingCartItems = this.shopService.getShoppingCartItems()
    this.notifications = this.notificationService.getNotifications()
  }

  /**
   * Permite controlar el tab a mostrar
   */
  setPanel(p: string) {
    this.panel = p
  }

  /**
   * Permite saber si el botón de confirmar pedido puede ser mostrado
   * Esto es cuando hay productos en el carrito
   */
  enableConfirmOrderButton(items: ShoppingCartItem[] | null) {
    return items && items.length > 0
  }

  discardNotification(notificationId: string) {
    return this.notificationService.discardNotification(notificationId).subscribe(_ => {
      this.ngOnInit()
    })
  }
}
