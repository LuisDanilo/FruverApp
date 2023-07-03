import { Product } from "../Models/product.js"
import { ProductCatalog } from "../Models/productCatalog.js"
import toNumber from "lodash.tonumber"

import { Op } from "sequelize"

/**
 * Función que recupera un listado de productos.
 * Permite consultar productos usando filtros de precio y catálogo.
 * Retorna un listado de productos con los filtros indicados.
 */
export const getProducts = async (req, res) => {
    try {
        // Recuperación de los filtros
        const { catalog, min, max } = req.query
        const minPrice = toNumber(min)
        const maxPrice = toNumber(max)
        const catalogId = toNumber(catalog)
        // Opciones de consulta / filtros
        const options = {
            ...(catalogId > 0 ? { include: [{ model: ProductCatalog, where: { catalog_id: catalogId } }] } : {}), // Existe parámetro catalog? Filtre productos por catálogo
            where: {
                [Op.and]: [
                    (minPrice ? { price: { [Op.gte]: minPrice } } : {}), // Existe parámetro min? Filtre productos por limite inferior
                    (maxPrice ? { price: { [Op.lte]: maxPrice } } : {}), // Existe parámetro max? Filtre productos por limite superior
                    { available_units: { [Op.gt]: 0 } } // Filtre productos con unidades disponibles
                ]
            }
        }
        // Consultar productos
        const data = await Product.findAll(options)
        // Mapear productos consultados para retornar una respuesta más limpia
        res.status(200).json(data.map(({ name, price, available_units, detail }) => ({ name, price, available_units, detail })))
    } catch (err) {
        console.error(err)
        res.status(400).json({ message: `${err}` })
    }
}