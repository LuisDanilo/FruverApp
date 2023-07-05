import { Component, Input } from '@angular/core';
import { OrderItem, ShoppingCartItem } from 'src/models/order.model';

@Component({
  selector: 'app-shopping-cart-item-card',
  templateUrl: './shopping-cart-item-card.component.html',
  styleUrls: ['./shopping-cart-item-card.component.sass']
})
export class ShoppingCartItemCardComponent {
  // Item a mostrar
  @Input() item: OrderItem | ShoppingCartItem | undefined
}
