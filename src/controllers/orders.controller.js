import ordersDao from "../DAO/classes/orders.dao.js"
import ProductsDao from "../DAO/classes/products.dao.js"
import CartDao from "../DAO/classes/cart.dao.js"
import usersDao from "../DAO/classes/users.dao.js"

const ordersD= new ordersDao()
const productD = new ProductsDao() //no se si es necesario 
const cartD = new CartDao()
const usersD = new usersDao()

export const getOrders = async (req, res) => {
    let result = await ordersD.getOrders()
    res.send({ status: "success", result })
}

export const getOrdersById = async (req, res) => {
    const {oid} = req.params
    let order = await ordersD.getOrdersById(oid)
    res.send({status: "success", result: order})
}


export const createOrder = async (req, res) => {
    const {user, products, cart} = req.body
    const resultUser = await usersD.getUserById(user)
    const resultProducts = await productD.getProductById(products) //no se si es necesario 
    const resultCart = await cartD.getCartsById(cart)
    let actualOrders = resultCart.products.filter(product => products.includes(product.id))
    let sum = actualOrders.reduce((acc, prev) => {
        acc += prev.price
        return acc
    }, 0)
    let orderNumber = Date.now()+ Math.floor (Math.random()*10000+1)
    let order = {
        number: orderNumber, 
        cart, 
        user, 
        status:"Pending", 
        products: actualOrders.map(product => product.id),
        totalPrice: sum
    }

    let orderResult = await ordersD.createOrder( order )
    resultUser.orders.push( orderResult._id )
    await usersD.updateUser( user, resultUser )
    res.send({status:"success", orderResult})
}

export const resolveOrder = async (req, res) => {
    const { resolve } = req.query 
    let order = await ordersD.getOrdersById(req.params.oid)
    order.status = resolve 
    await ordersD.resolveOrder(order._id, order)
    res.send({status: "success", result: "Orden Completada"})
}