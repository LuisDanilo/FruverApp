import { ProductCatalog } from "../Models/productCatalog.js"

export const getCatalogProducts = async (req, res) => {
    try {
        const data = await ProductCatalog.findAll()
        res.status(200).json(data)
    } catch(err) {
        console.error(err)
        res.status(400).json({ message: err })
    }
}