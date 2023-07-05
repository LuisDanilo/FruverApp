import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order, OrderItem } from 'src/models/order.model';
import { BACKEND_HOST } from 'src/utils/constants';
import { getAuthHeaders } from 'src/utils/utils';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  getOrders() {
    return this.http.get<Order[]>(`${BACKEND_HOST}/orders`, {
      headers: getAuthHeaders()
    })
  }

  getOrderItems(orderId: string) {
    const params = new HttpParams()
    return this.http.get<OrderItem[]>(`${BACKEND_HOST}/order/items`, {
      headers: getAuthHeaders(),
      params: params.set('order', orderId)
    })
  }
}
