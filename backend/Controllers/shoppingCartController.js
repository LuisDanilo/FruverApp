import { Product } from "../Models/product.js"
import { ShoppingCart } from "../Models/shoppingCart.js"
import { ShoppingCartItem } from "../Models/shoppingCartItem.js"
import { literal } from 'sequelize'

/**
 * Función que agrega un producto al carrito de compras del usuario.
 * Retorna un listado de productos.
 */
export const addShoppingCartItem = async (req, res) => {
    try {
        // Recuperar producto a agregar
        const product = await Product.findByPk(req.body.productId)
        const shoppingCartId = req.user.dataValues.shopping_cart.dataValues.id
        if (!product || product.dataValues.available_units < req.body.desiredUnits) {
            // Error al querer agregar el producto sin unidades disponibles
            throw new Error("Couldnt add product to shopping cart")
        }
        // Crear el producto en el carrito de compras
        await ShoppingCartItem.create({
            shopping_cart_id: shoppingCartId,
            product_id: req.body.productId,
            units: req.body.desiredUnits
        }).catch(err => {
            if (err.name === "SequelizeUniqueConstraintError") {
                // Se intenta agregar un producto que ya existe en el carrito
                // Se procede a actualizar la cantidad de items del producto existente
                return ShoppingCartItem.update(
                    { units: literal(`units + ${req.body.desiredUnits}`) },
                    { where: { shopping_cart_id: shoppingCartId, product_id: req.body.productId } }
                )
            }
            return Promise.reject(err)
        })
        // Actualizar las unidades disponibles del producto
        await Product.update(
            { available_units: literal(`available_units - ${req.body.desiredUnits}`) },
            { where: { id: req.body.productId } }
        )
        // Actualizar el total del carrito
        await ShoppingCart.update(
            { total: literal(`total + (${product.dataValues.price} * ${req.body.desiredUnits})`) },
            { where: { id: shoppingCartId } }
        )
        res.status(204).send()
    } catch (err) {
        console.error(err)
        res.status(400).json({ message: `${err}` })
    }
}


/**
 * Función que recupera un listado de productos que estén en el carrito del usuario.
 * Retorna un listado de productos.
 */
export const getShoppingCartItems = async (req, res) => {
    try {
        // Consultar productos del carrito de compras
        const shoppingCart = await ShoppingCart.findOne({
            where: { user_id: req.user.dataValues.id },
            include: [
                { model: ShoppingCartItem, include: [{ model: Product }] }
            ]
        })
        // Mapear productos consultados para retornar una respuesta más limpia
        res.status(200).json(shoppingCart.dataValues.shopping_cart_items.map(ci => ({
            name: ci.dataValues.product.dataValues.name,
            detail: ci.dataValues.product.dataValues.detail,
            price: ci.dataValues.product.dataValues.price,
            adquired_units: ci.dataValues.units
        })))
    } catch (err) {
        console.error(err)
        res.status(400).json({ message: `${err}` })
    }
}
