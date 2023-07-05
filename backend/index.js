import express from 'express'
import cors from 'cors'
import { sequelize } from './Database/database.js'
import { userRouter } from './Routes/userRoutes.js'
import { catalogRouter } from './Routes/catalogRoutes.js'
import { orderRouter } from './Routes/orderRoutes.js'
import { productRouter } from './Routes/productRoutes.js'
import { productCatalogRouter } from './Routes/productCatalogRoutes.js'
import { roleRouter } from './Routes/roleRoutes.js'
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

const app = express()
app.set('port', 3000)
app.use(cors())
app.use(express.json())
app.use(userRouter)
app.use(shoppingCartRouter)
app.use(orderRouter)
app.use(productRouter)
app.use(userSessionRouter)

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
}


/**
 * Funcion para inicializar la base de datos con algunos registros aleatorios
 */
async function initdb() {
  let userRole, adminRole
  // Creacion de roles 
  try {
    // Creacion de rol administrador
    // El rol administrador sera el que pueda formalizar un pedido
    adminRole = await Role.create({
      name: 'Adminstrator',
      policy: { "GET": { "/logout": true, "/orders": true, "/products": true, "/order/items": true } }
    })
    // Creacion del rol usuario
    // El rol usuario sera el que pueda listar productos, manejar un carrito de compras y realizar pedidos
    userRole = await Role.create({
      name: 'User',
      policy: { "GET": { "/logout": true, "/products": true, "/cart/items": true }, "POST": { "/cart": true, "/order": true } }
    })
  } catch (err) {
    console.error(err)
  }
  // Creacion de 28 usuarios aleatorios
  for (let [idx, _] of Array(28).entries()) {
    try {
      const newUser = await User.create({
        name: faker.person.firstName(),
        lastname: faker.person.lastName(),
        email: faker.internet.email(),
        dni: faker.string.numeric(10),
        address: faker.location.streetAddress(),
        phone: faker.phone.number(),
        username: 'demo' + idx,
        password: 'demo' + idx,
        role_id: idx % 2 == 0 ? adminRole.id : userRole.id
      })
      await ShoppingCart.create({
        user_id: newUser.id,
        total: 0
      })
    } catch (err) {
      console.error(err)
    }
  }
  // Creacion de catalogos
  await Catalog.create({
    name: 'Frutas'
  })
  await Catalog.create({
    name: 'Verduras'
  })
  // Creacion de productos aleatorios
  const p = [
    {
      "name": "Manzana",
      "detail": "Fruta fresca y jugosa",
      "price": 2217,
      "available_units": 58,
      "catalog": 1
    },
    {
      "name": "Plátano",
      "detail": "Fruta rica en potasio",
      "price": 2385,
      "available_units": 62,
      "catalog": 1
    },
    {
      "name": "Sandía",
      "detail": "Fruta refrescante para el verano",
      "price": 4106,
      "available_units": 51,
      "catalog": 1
    },
    {
      "name": "Zanahoria",
      "detail": "Hortaliza saludable y rica en betacaroteno",
      "price": 2956,
      "available_units": 63,
      "catalog": 2
    },
    {
      "name": "Tomate",
      "detail": "Fruto versátil para diferentes preparaciones culinarias",
      "price": 2305,
      "available_units": 69,
      "catalog": 2
    },
    {
      "name": "Lechuga",
      "detail": "Hojas verdes y crujientes para ensaladas",
      "price": 2053,
      "available_units": 72,
      "catalog": 2
    },
    {
      "name": "Piña",
      "detail": "Fruta tropical jugosa y dulce",
      "price": 3840,
      "available_units": 59,
      "catalog": 1
    },
    {
      "name": "Papa",
      "detail": "Tubérculo versátil para guarniciones y platos principales",
      "price": 2465,
      "available_units": 64,
      "catalog": 2
    },
    {
      "name": "Mango",
      "detail": "Dulce fruta exótica con pulpa jugosa",
      "price": 4123,
      "available_units": 56,
      "catalog": 1
    },
    {
      "name": "Espinaca",
      "detail": "Verdura rica en hierro y nutrientes esenciales",
      "price": 2794,
      "available_units": 68,
      "catalog": 2
    },
    {
      "name": "Naranja",
      "detail": "Cítrico jugoso y lleno de vitamina C",
      "price": 2365,
      "available_units": 65,
      "catalog": 1
    },
    {
      "name": "Pimiento",
      "detail": "Vegetal colorido y sabroso para guisos y ensaladas",
      "price": 2239,
      "available_units": 71,
      "catalog": 2
    },
    {
      "name": "Pera",
      "detail": "Fruta jugosa y dulce, perfecta para postres",
      "price": 2614,
      "available_units": 60,
      "catalog": 1
    },
    {
      "name": "Pepino",
      "detail": "Hortaliza refrescante para ensaladas y gazpachos",
      "price": 2142,
      "available_units": 67,
      "catalog": 2
    },
    {
      "name": "Melón",
      "detail": "Fruta dulce y jugosa, ideal para el verano",
      "price": 3039,
      "available_units": 57,
      "catalog": 1
    },
    {
      "name": "Calabacín",
      "detail": "Vegetal versátil para asar, saltear o rellenar",
      "price": 2275,
      "available_units": 69,
      "catalog": 2
    },
    {
      "name": "Cereza",
      "detail": "Pequeña fruta roja y jugosa, perfecta como snack",
      "price": 3218,
      "available_units": 54,
      "catalog": 1
    },
    {
      "name": "Patata",
      "detail": "Tubérculo versátil para diversas preparaciones",
      "price": 2401,
      "available_units": 61,
      "catalog": 2
    },
    {
      "name": "Uva",
      "detail": "Fruta pequeña y dulce, ideal para postres y vinos",
      "price": 2873,
      "available_units": 66,
      "catalog": 1
    },
    {
      "name": "Cebolla",
      "detail": "Hortaliza aromática para salsas y guisos",
      "price": 2197,
      "available_units": 70,
      "catalog": 2
    },
    {
      "name": "Limón",
      "detail": "Cítrico ácido y refrescante, perfecto para aliños",
      "price": 2336,
      "available_units": 68,
      "catalog": 1
    },
    {
      "name": "Calabaza",
      "detail": "Vegetal dulce y nutritivo para cremas y pasteles",
      "price": 2750,
      "available_units": 63,
      "catalog": 2
    },
    {
      "name": "Mandarina",
      "detail": "Pequeño cítrico jugoso y fácil de pelar",
      "price": 2419,
      "available_units": 64,
      "catalog": 1
    },
    {
      "name": "Brócoli",
      "detail": "Verdura llena de nutrientes y antioxidantes",
      "price": 2657,
      "available_units": 59,
      "catalog": 2
    },
    {
      "name": "Melocotón",
      "detail": "Fruta jugosa y dulce, ideal para postres",
      "price": 2935,
      "available_units": 55,
      "catalog": 1
    },
    {
      "name": "Calabacita",
      "detail": "Vegetal tierno y sabroso para guisos y salteados",
      "price": 2232,
      "available_units": 67,
      "catalog": 2
    },
    {
      "name": "Mora",
      "detail": "Pequeña fruta oscura y dulce, ideal para postres",
      "price": 3127,
      "available_units": 53,
      "catalog": 1
    },
    {
      "name": "Perejil",
      "detail": "Hierba aromática y decorativa para platos",
      "price": 2168,
      "available_units": 71,
      "catalog": 2
    },
    {
      "name": "Durazno",
      "detail": "Fruta jugosa y dulce, perfecta para postres",
      "price": 2561,
      "available_units": 62,
      "catalog": 1
    },
    {
      "name": "Champiñón",
      "detail": "Seta suave y versátil para platos salteados",
      "price": 2345,
      "available_units": 68,
      "catalog": 2
    },
    {
      "name": "Frambuesa",
      "detail": "Pequeña fruta dulce y ácida, ideal para postres",
      "price": 3194,
      "available_units": 56,
      "catalog": 1
    },
    {
      "name": "Coliflor",
      "detail": "Verdura versátil y nutritiva para guisos y gratinados",
      "price": 2725,
      "available_units": 61,
      "catalog": 2
    },
    {
      "name": "Ciruela",
      "detail": "Fruta jugosa y dulce, ideal para postres y mermeladas",
      "price": 2959,
      "available_units": 57,
      "catalog": 1
    },
    {
      "name": "Escarola",
      "detail": "Variedad de lechuga con hojas rizadas y amargas",
      "price": 2175,
      "available_units": 65,
      "catalog": 2
    },
    {
      "name": "Kiwi",
      "detail": "Fruta pequeña y exótica, rica en vitamina C",
      "price": 2374,
      "available_units": 67,
      "catalog": 1
    },
    {
      "name": "Apio",
      "detail": "Vegetal crujiente y refrescante para ensaladas",
      "price": 2247,
      "available_units": 69,
      "catalog": 2
    },
    {
      "name": "Granada",
      "detail": "Fruta llena de antioxidantes y sabor agridulce",
      "price": 2838,
      "available_units": 54,
      "catalog": 1
    },
    {
      "name": "Repollo",
      "detail": "Verdura crujiente y versátil para ensaladas y cocidos",
      "price": 2146,
      "available_units": 72,
      "catalog": 2
    },
    {
      "name": "Fresa",
      "detail": "Pequeña fruta dulce y jugosa, perfecta como postre",
      "price": 3213,
      "available_units": 58,
      "catalog": 1
    },
    {
      "name": "Espárrago",
      "detail": "Hortaliza delicada y sabrosa, ideal para guarniciones",
      "price": 2261,
      "available_units": 70,
      "catalog": 2
    },
    {
      "name": "Coco",
      "detail": "Fruta tropical con sabor dulce y textura cremosa",
      "price": 2467,
      "available_units": 63,
      "catalog": 1
    },
    {
      "name": "Puerro",
      "detail": "Hortaliza con sabor suave para sopas y guisos",
      "price": 2321,
      "available_units": 66,
      "catalog": 2
    },
    {
      "name": "Albaricoque",
      "detail": "Fruta jugosa y ligeramente ácida, perfecta para postres",
      "price": 2714,
      "available_units": 60,
      "catalog": 1
    },
    {
      "name": "Alcachofa",
      "detail": "Hortaliza con sabor delicado y textura tierna",
      "price": 2286,
      "available_units": 64,
      "catalog": 2
    },
    {
      "name": "Ciruela pasa",
      "detail": "Fruta deshidratada dulce y jugosa",
      "price": 2095,
      "available_units": 73,
      "catalog": 1
    },
    {
      "name": "Remolacha",
      "detail": "Hortaliza dulce y nutritiva, perfecta para ensaladas",
      "price": 2378,
      "available_units": 67,
      "catalog": 2
    },
    {
      "name": "Mango verde",
      "detail": "Fruta tropical aún sin madurar, ideal para preparaciones saladas",
      "price": 2213,
      "available_units": 72,
      "catalog": 1
    },
    {
      "name": "Hinojo",
      "detail": "Hortaliza de sabor anisado, ideal para ensaladas",
      "price": 2280,
      "available_units": 69,
      "catalog": 2
    },
    {
      "name": "Carambola",
      "detail": "Fruta tropical con forma de estrella y sabor agridulce",
      "price": 2465,
      "available_units": 66,
      "catalog": 1
    },
    {
      "name": "Rábano",
      "detail": "Raíz picante y crujiente para ensaladas y salsas",
      "price": 2337,
      "available_units": 63,
      "catalog": 2
    },
    {
      "name": "Morango",
      "detail": "Pequeña fruta dulce y jugosa, ideal para postres",
      "price": 3191,
      "available_units": 59,
      "catalog": 1
    },
    {
      "name": "Habas",
      "detail": "Legumbre tierna y sabrosa, ideal para guisos",
      "price": 2219,
      "available_units": 68,
      "catalog": 2
    },
    {
      "name": "Níspero",
      "detail": "Fruta dulce y jugosa, típica en climas cálidos",
      "price": 2464,
      "available_units": 65,
      "catalog": 1
    }
  ]

  for (let j of p) {
    const { catalog, ...info } = j
    const prod = await Product.create(info)
    await ProductCatalog.create({
      catalog_id: catalog,
      product_id: prod.id
    })
  }
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
    await initdb()
    app.listen(app.get('port'), () => {
      console.log('Server ready at port 3000 🚀')
    })
  } catch (err) {
    console.error(err)
  }
}

main()
