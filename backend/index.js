import express from 'express'
import cors from 'cors'
import { sequelize } from './Database/database.js'
import { orderRouter } from './Routes/orderRoutes.js'
import { productRouter } from './Routes/productRoutes.js'
import { userSessionRouter } from './Routes/userSessionRoutes.js'
import { User } from './Models/user.js'
import { Role } from './Models/role.js'
import { UserSession } from './Models/userSession.js'
import { ProductCatalog } from './Models/productCatalog.js'
import { Catalog } from './Models/catalog.js'
import { Product } from './Models/product.js'
import { faker } from '@faker-js/faker'
import { OrderItem } from './Models/orderItem.js'
import { Order } from './Models/order.js'
import { shoppingCartRouter } from './Routes/shoppingCartRoutes.js'
import { ShoppingCart } from './Models/shoppingCart.js'
import { ShoppingCartItem } from './Models/shoppingCartItem.js'
import { Notification } from './Models/notification.js'
import { notificationRouter } from './Routes/notificationRoutes.js'

// App
const app = express()
// Configuración inicial
app.set('port', 3000)
app.use(cors())
app.use(express.json())
// Rutas
app.use(userSessionRouter)
app.use(shoppingCartRouter)
app.use(notificationRouter)
app.use(orderRouter)
app.use(productRouter)

/**
 * Función para inicializar las relaciones entre entidades
 * Se realiza antes de poner el servidor en funcionamiento
 */
const initRelations = () => {
  // User roles 1:N 
  Role.hasOne(User, { foreignKey: 'role_id' })
  User.belongsTo(Role, { foreignKey: 'role_id' })
  // User sessions 1:N
  User.hasMany(UserSession, { foreignKey: 'user_id' })
  UserSession.belongsTo(User, { foreignKey: 'user_id' })
  // Product catalog M:N
  Catalog.hasMany(ProductCatalog, { foreignKey: 'catalog_id' })
  ProductCatalog.belongsTo(Catalog, { foreignKey: 'catalog_id' })
  Product.hasMany(ProductCatalog, { foreignKey: 'product_id' })
  ProductCatalog.belongsTo(Product, { foreignKey: 'product_id' })
  // Order products N:M
  Order.hasMany(OrderItem, { foreignKey: 'order_id' })
  OrderItem.belongsTo(Order, { foreignKey: 'order_id' })
  Product.hasMany(OrderItem, { foreignKey: 'product_id' })
  OrderItem.belongsTo(Product, { foreignKey: 'product_id' })
  // User orders 1:N
  User.hasMany(Order, { foreignKey: 'user_id' })
  Order.belongsTo(User, { foreignKey: 'user_id' })
  // User shopping cart 1:1
  User.hasOne(ShoppingCart, { foreignKey: 'user_id' })
  ShoppingCart.belongsTo(User, { foreignKey: 'user_id' })
  // Shopping cart products N:M
  ShoppingCart.hasMany(ShoppingCartItem, { foreignKey: 'shopping_cart_id' })
  ShoppingCartItem.belongsTo(ShoppingCart, { foreignKey: 'shopping_cart_id' })
  Product.hasMany(ShoppingCartItem, { foreignKey: 'product_id' })
  ShoppingCartItem.belongsTo(Product, { foreignKey: 'product_id' })
  // User notifications 1:N
  User.hasMany(Notification, { foreignKey: 'user_id' })
  Notification.belongsTo(User, { foreignKey: 'user_id' })
}


/**
 * Función principal que inicia el servidor
 * Conexión a DB
 * Inicialización de DB
 * Ejecución de la aplicación express 
 */
async function main() {
  try {
    await sequelize.authenticate()
    initRelations()
    app.listen(app.get('port'), () => {
      console.log('Server ready at port 3000 🚀')
    })
  } catch (err) {
    console.error(err)
  }
}

main()
