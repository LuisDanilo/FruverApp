import { Order } from "../Models/order.js"
import { OrderItem } from "../Models/orderItem.js"
import { Product } from "../Models/product.js"
import { ShoppingCartItem } from "../Models/shoppingCartItem.js"
import { User } from "../Models/user.js"
import { ShoppingCart } from "../Models/shoppingCart.js"
import { literal } from "sequelize"
import { Notification } from "../Models/notification.js"

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
            status: o.status,
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
            status: 'IN_PROGRESS',
            address, dni, phone
        })
        shoppingCart.dataValues.shopping_cart_items.forEach(async ci => {
            await OrderItem.create({
                order_id: order.id,
                product_id: ci.dataValues.product_id,
                adquired_units: ci.dataValues.units
            })
        })
        await ShoppingCartItem.destroy({
            where: { shopping_cart_id: shoppingCartId },
        })
        await ShoppingCart.update(
            { total: 0 },
            { where: { id: shoppingCartId } }
        )
        await Notification.create({
            user_id: req.user.id,
            text: `Tu orden #${order.id} fue creada existósamente`
        })
        res.status(204).send()
    } catch (err) {
        console.error(err)
        res.status(400).json({ message: `${err}` })
    }
}

export const updateOrder = async (req, res) => {
    try {
        let friendlyOrderStatus
        if (req.body.status === 'APPROVED') {
            friendlyOrderStatus = 'APROBADA'
        } else if (req.body.status === 'REJECTED') {
            friendlyOrderStatus = 'RECHAZADA'
        } else {
            friendlyOrderStatus = 'PENDIENTE'
        }
        const order = await Order.findByPk(req.body.orderId)
        await Order.update(
            { status: req.body.status },
            { where: { id: req.body.orderId } }
        )
        if (req.body.status === 'REJECTED') {
            const orderItems = await OrderItem.findAll({
                where: { order_id: req.body.orderId }
            })
            orderItems.forEach(async oi => {
                await Product.update(
                    { available_units: literal(`available_units + ${oi.dataValues.adquired_units}`) },
                    { where: { id: oi.dataValues.product_id } }
                )
            })
        }
        await Notification.create({
            user_id: order.user_id,
            text: `Tu orden #${req.body.orderId} fue actualizada a ${friendlyOrderStatus}`
        })
        res.status(200).send()
    } catch (err) {
        console.error(err)
        res.status(400).json({ message: `${err}` })
    }
}