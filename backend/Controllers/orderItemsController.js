import { OrderItem } from "../Models/orderItem.js"

export const getOrderItems = async (req, res) => {
    try {
        const data = await OrderItem.findAll()
        res.status(200).json(data)
    } catch(err) {
        console.error(err)
        res.status(400).json({ message: err })
    }
}