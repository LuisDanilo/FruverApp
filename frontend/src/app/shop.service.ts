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

  addShoppingCartItem(productId: string, desiredUnits: string) {
    return this.http.post(`${BACKEND_HOST}/cart`, { productId, desiredUnits }, {
      headers: getAuthHeaders()
    })
  }

  getShoppingCartItems() {
    return this.http.get<ShoppingCartItem[]>(`${BACKEND_HOST}/cart/items`, {
      headers: getAuthHeaders()
    })
  }
}
