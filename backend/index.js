import express from 'express'
import cors from 'cors'
import { sequelize } from './Database/database.js'
import { userRouter } from './Routes/userRoutes.js'
import { catalogRouter } from './Routes/catalogRoutes.js'
import { orderRouter } from './Routes/orderRoutes.js'
import { orderItemRouter } from './Routes/orderItemRoutes.js'
import { productRouter } from './Routes/productRoutes.js'
import { productCatalogRouter } from './Routes/productCatalogRoutes.js'
import { roleRouter } from './Routes/roleRoutes.js'
import { userSessionRouter } from './Routes/userSessionRoutes.js'
import { User } from './Models/user.js'
import { Role } from './Models/role.js'
import { UserRole } from './Models/userRole.js'
import { UserSession } from './Models/userSession.js'
import { ProductCatalog } from './Models/productCatalog.js'
import { Catalog } from './Models/catalog.js'
import { Product } from './Models/product.js'

const app = express()
app.set('port', 3000)
app.use(cors())
app.use(express.json())
app.use(userRouter)
app.use(roleRouter)
app.use(catalogRouter)
app.use(orderRouter)
app.use(orderItemRouter)
app.use(productRouter)
app.use(productCatalogRouter)
app.use(userSessionRouter)
// app.use(shoppingCartRouter)
// app.use(shoppingCartItemRouter)
// app.use(userRoleRouter)

/**
 * Función para inicializar las relaciones entre entidades
 * Se realiza antes de poner el servidor en funcionamiento
 */
const initRelations = () => {
  // User roles M:N
  User.hasMany(UserRole, { foreignKey: 'user_id' })
  UserRole.belongsTo(User, { foreignKey: 'user_id' })
  Role.hasMany(UserRole, { foreignKey: 'role_id' })
  UserRole.belongsTo(Role, { foreignKey: 'role_id' })
  // User sessions 1:N
  User.hasMany(UserSession, { foreignKey: 'user_id' })
  UserSession.belongsTo(User, { foreignKey: 'user_id' })
  // Product catalog M:N
  Catalog.hasMany(ProductCatalog, { foreignKey: 'catalog_id' })
  ProductCatalog.belongsTo(Catalog, { foreignKey: 'catalog_id' })
  Product.hasMany(ProductCatalog, { foreignKey: 'product_id' })
  ProductCatalog.belongsTo(Product, { foreignKey: 'product_id' })
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
    await initRelations()
    await sequelize.sync()
    app.listen(app.get('port'), () => {
      console.log('Server ready at port 3000 🚀')
    })
  } catch (err) {
    console.error(err);
  }
}

main()
