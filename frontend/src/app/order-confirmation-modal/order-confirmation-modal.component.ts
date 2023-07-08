import { Component, Input } from '@angular/core';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './order-confirmation-modal.component.html',
  styleUrls: ['./order-confirmation-modal.component.sass']
})

export class OrderConfirmationModalComponent {
  // ngModel para controlar la visualización el modal
  display = "none"
  // Información adicional para la creación de la orden
  address: string = localStorage.getItem('address') || ''
  phone: string = localStorage.getItem('phone') || ''
  dni: string = localStorage.getItem('dni') || ''

  @Input() onOrderCreated: (p: string) => void = () => { }

  constructor(
    private orderService: OrderService
  ) { }

  /**
   * Método que permite crear una orden
   */
  createOrder() {
    return this.orderService.createOrder({ address: this.address, phone: this.phone, dni: this.dni }).subscribe(_ => {
      this.onOrderCreated('shop')
      this.onCloseHandled()
    })
  }

  /**
   * Método que permite visualizar el modal
   */
  openModal() {
    this.display = "block"
  }

  /**
   * Método que permite ocultar el modal
   */
  onCloseHandled() {
    this.display = "none"
  }
}
