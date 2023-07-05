import { Product } from "./product.model";


/**
 * Modelo Shopping Cart Item
 */
export class ShoppingCartItem {
    constructor(
        public name: string,
        public detail: string,
        public price: number,
        public adquired_units: number
    ) { }
}

export class OrderItem extends ShoppingCartItem { }

/**
 * Modelo Order
 */
export class Order {
    constructor(
        public id: string,
        public user: string,
        public delivery_address: string,
        public total: number,
        public no_available_products: boolean
    ) { }
}