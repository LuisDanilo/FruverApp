import { Order } from "../Models/order.js"

export const getOrders = async (req, res) => {
    try {
        const data = await Order.findAll()
        res.status(200).json(data)
    } catch(err) {
        console.error(err)
        res.status(400).json({ message: err })
    }
}