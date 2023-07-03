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
 * Funcion para inicializar las relaciones entre entidades
 */
const initRelations = () => {
  User.hasMany(UserRole, { foreignKey: 'user_id' })
  UserRole.belongsTo(User, { foreignKey: 'user_id' })
  //
  User.hasMany(UserSession, { foreignKey: 'user_id' })
  UserSession.belongsTo(User, { foreignKey: 'user_id' })
  //
  Role.hasMany(UserRole, { foreignKey: 'role_id' })
  UserRole.belongsTo(Role, { foreignKey: 'role_id' })
}

/**
 * Funcion principal que inicia los procesos de conexion a DB e inicializacion de la aplicacion express
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
