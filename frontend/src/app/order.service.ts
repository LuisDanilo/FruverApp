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

  /**
   * Método que realiza la petición al backend para obtener el listado de órdenes
   */
  getOrders() {
    return this.http.get<Order[]>(`${BACKEND_HOST}/orders`, {
      headers: getAuthHeaders()
    })
  }

  /**
   * Método que realiza la petición al backend para obtener el listado de productos de una orden
   * (Para implementar más adelante)
   */
  getOrderItems(orderId: string) {
    const params = new HttpParams()
    return this.http.get<OrderItem[]>(`${BACKEND_HOST}/order/items`, {
      headers: getAuthHeaders(),
      params: params.set('order', orderId)
    })
  }

  /**
   * Método que realiza la petición al backend para crear una orden
   */
  createOrder(orderData: any) {
    return this.http.post(`${BACKEND_HOST}/order`, orderData, {
      headers: getAuthHeaders()
    })
  }

  /**
   * Método que realiza la petición al backend para aprobar una orden
   */
  approveOrder(orderId: string) {
    return this.http.put(`${BACKEND_HOST}/order`,
      { status: 'APPROVED', orderId },
      { headers: getAuthHeaders() }
    )
  }

  /**
   * Método que realiza la petición al backend para rechazar una orden
   */
  rejectOrder(orderId: string) {
    return this.http.put(`${BACKEND_HOST}/order`,
      { status: 'REJECTED', orderId },
      { headers: getAuthHeaders() }
    )
  }
}
