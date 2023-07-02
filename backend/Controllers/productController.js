import { Product } from "../Models/product.js"
import { Catalog } from "../Models/catalog.js"
import isNumber from "lodash.isnumber"
import { Op } from "sequelize"

export const getProducts = async (req, res) => {
    try {
        const options = {}
        const { catalog, min, max } = req.query
        if(catalog) {
            options.include = [
                { model: Catalog, where: { id: catalog }}
            ]
        }
        if(isNumber(min) && min >=0) {
            options.where.price[Op.gte] = min
        }
        if(isNumber(max)) {
            options.where.price[Op.lte] = max
        }
        const data = await Product.findAll(options)
        res.status(200).json(data)
    } catch(err) {
        console.error(err)
        res.status(400).json({ message: err })
    }
}