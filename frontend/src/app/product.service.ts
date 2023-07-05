import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from 'src/models/product.model';
import { BACKEND_HOST } from 'src/utils/constants';
import { getAuthHeaders } from 'src/utils/utils';
import get from 'lodash.get'

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  /**
   * Método que ejecuta la petición al backend para obtener productos.
   * Retorna un arreglo de productos
   */
  getProducts(options?: any) {
    const maxPrice = get(options, 'maxPrice', null)
    const minPrice = get(options, 'minPrice', null)
    const catalog = get(options, 'catalog', null)
    let params = new HttpParams()
    if (minPrice) {
      params = params.set('min', minPrice)
    }
    if (maxPrice) {
      params = params.set('max', maxPrice)
    }
    if (catalog) {
      params = params.set('catalog', catalog)
    }
    return this.http.get<Product[]>(`${BACKEND_HOST}/products`, {
      headers: getAuthHeaders(),
      params
    })
  }
}
