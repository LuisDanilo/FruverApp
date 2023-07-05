import { Order } from "../Models/order.js"
import { OrderItem } from "../Models/orderItem.js"
import { Product } from "../Models/product.js"
import { ShoppingCartItem } from "../Models/shoppingCartItem.js"
import { User } from "../Models/user.js"
import { ShoppingCart } from "../Models/shoppingCart.js"
import { literal } from "sequelize"

/**
 * Función que obtiene todas las órdenes.
 * Retorna un listado de órdenes.
 */
export const getOrders = async (req, res) => {
    try {
        const orders = await Order.findAll({
            include: [
                { model: User },
                { model: OrderItem, include: [{ model: Product }] }
            ]
        })
        res.status(200).json(orders.map(o => ({
            id: o.id,
            total: o.total,
            user: o.user.name + ' ' + o.user.lastname,
            delivery_address: o.user.address,
            no_available_products: o.order_items.some(oi => oi.product.available_units <= 0),
            // items: o.order_items.map(oi => ({
            //     name: oi.product.name,
            //     detail: oi.product.detail,
            //     price: oi.product.price,
            //     adquired_units: oi.adquired_units
            // }))
        })))
    } catch (err) {
        console.error(err)
        res.status(400).json({ message: err })
    }
}

/**
 * Función que obtiene todos los productos de una orden.
 * Retorna un listado de productos.
 */
export const getOrderItems = async (req, res) => {
    try {
        const { order: orderId } = req.query
        const orderItems = await OrderItem.findAll({
            where: { order_id: orderId },
            include: [{ model: Product }]
        })
        res.status(200).json(orderItems.map(oi => ({
            name: oi.product.name,
            detail: oi.product.detail,
            price: oi.product.price,
            adquired_units: oi.adquired_units
        })))
    } catch (err) {
        console.error(err)
        res.status(400).json({ message: err })
    }
}

/**
 * Función que obtiene todos los productos de una orden.
 * Retorna un listado de productos.
 */
export const createOrder = async (req, res) => {
    try {
        const { address, dni, phone } = req.body
        const shoppingCartId = req.user.dataValues.shopping_cart.dataValues.id
        const shoppingCart = await ShoppingCart.findOne({
            where: { id: shoppingCartId },
            include: [
                { model: ShoppingCartItem }
            ]
        })
        const order = await Order.create({
            user_id: req.user.id,
            total: shoppingCart.dataValues.total,
            status: 'IN_PROGRES',
            address, dni, phone
        })
        shoppingCart.dataValues.shopping_cart_items.forEach(async ci => {
            await OrderItem.create({
                order_id: order.id,
                product_id: ci.dataValues.product_id,
                adquired_units: ci.dataValues.units
            })
            await Product.update(
                { available_units: literal(`available_units - ${ci.dataValues.units}`) },
                { where: { id: ci.dataValues.product_id } }
            )
        })
        await ShoppingCartItem.destroy({
            where: { shopping_cart_id: shoppingCartId },
        })
        await ShoppingCart.update(
            { total: 0 },
            { where: { id: shoppingCartId } }
        )
        res.status(204).send()
    } catch (err) {
        console.error(err)
        res.status(400).json({ message: `${err}` })
    }
}