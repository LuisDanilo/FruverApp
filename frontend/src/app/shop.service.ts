import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ShoppingCartItem } from 'src/models/order.model';
import { BACKEND_HOST } from 'src/utils/constants';
import { getAuthHeaders } from 'src/utils/utils';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Método que realiza la petición al backend para agregar un producto al carrito
   */
  addShoppingCartItem(productId: string, desiredUnits: string) {
    return this.http.post(`${BACKEND_HOST}/cart`, { productId, desiredUnits }, {
      headers: getAuthHeaders()
    })
  }

  /**
   * Método que realiza la petición al backend para obtener los productos del carrito
   */
  getShoppingCartItems() {
    return this.http.get<ShoppingCartItem[]>(`${BACKEND_HOST}/cart/items`, {
      headers: getAuthHeaders()
    })
  }
}
