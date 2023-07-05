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
        // Recuperar órdenes
        const orders = await Order.findAll({
            include: [
                { model: User },
                { model: OrderItem, include: [{ model: Product }] }
            ]
        })
        // Formatear la respuesta
        res.status(200).json(orders.map(o => ({
            id: o.id,
            total: o.total,
            status: o.status,
            user: o.user.name + ' ' + o.user.lastname,
            delivery_address: o.user.address,
            no_available_products: o.order_items.some(oi => oi.product.available_units <= 0)
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
        // Recuperar parámetros
        const { order: orderId } = req.query
        // Recuperar productos de la orden
        const orderItems = await OrderItem.findAll({
            where: { order_id: orderId },
            include: [{ model: Product }]
        })
        // Formatear la respuesta
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
 * Función que crea una orden y notifica al usuario.
 */
export const createOrder = async (req, res) => {
    try {
        // Recuperar los parámetros
        const { address, dni, phone } = req.body
        const shoppingCartId = req.user.dataValues.shopping_cart.dataValues.id
        // Recuperar el carrito del usuario autenticado
        const shoppingCart = await ShoppingCart.findOne({
            where: { id: shoppingCartId },
            include: [
                { model: ShoppingCartItem }
            ]
        })
        // Crear una nueva orden
        const order = await Order.create({
            user_id: req.user.id,
            total: shoppingCart.dataValues.total,
            status: 'IN_PROGRESS',
            address, dni, phone
        })
        // Agregar los productos del carrito a la orden
        shoppingCart.dataValues.shopping_cart_items.forEach(async ci => {
            await OrderItem.create({
                order_id: order.id,
                product_id: ci.dataValues.product_id,
                adquired_units: ci.dataValues.units
            })
        })
        // Vaciar el carrito
        await ShoppingCartItem.destroy({
            where: { shopping_cart_id: shoppingCartId },
        })
        // Reiniciar el conteo total del carrito
        await ShoppingCart.update(
            { total: 0 },
            { where: { id: shoppingCartId } }
        )
        // Crear notificación (al usuario que generó la orden)
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

/**
 * Función que actualiza el estado de una orden y notifica al usuario.
 */
export const updateOrder = async (req, res) => {
    try {
        // Mensaje amigable para la notificación del usuario
        let friendlyOrderStatus
        if (req.body.status === 'APPROVED') {
            friendlyOrderStatus = 'APROBADA'
        } else if (req.body.status === 'REJECTED') {
            friendlyOrderStatus = 'RECHAZADA'
        } else {
            friendlyOrderStatus = 'PENDIENTE'
        }
        // Recuperar la orden a actualizar
        const order = await Order.findByPk(req.body.orderId)
        // Actualizar el estado de la orden
        await Order.update(
            { status: req.body.status },
            { where: { id: req.body.orderId } }
        )
        if (req.body.status === 'REJECTED') {
            // Recuperar los productos de la orden
            const orderItems = await OrderItem.findAll({
                where: { order_id: req.body.orderId }
            })
            // Reembolsar los productos de la orden al inventario
            orderItems.forEach(async oi => {
                await Product.update(
                    { available_units: literal(`available_units + ${oi.dataValues.adquired_units}`) },
                    { where: { id: oi.dataValues.product_id } }
                )
            })
        }
        // Crea la notificación al usuario
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
