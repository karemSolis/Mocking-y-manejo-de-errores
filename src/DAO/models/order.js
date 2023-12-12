import mongoose from "mongoose";

const collection = "Orders"

const schema = new mongoose.Schema({
    number: Number,
    cart: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "carritos"
    },
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "usuarios"
    },
    products: [],
    totalPrice: Number,
    status: String,
    //ref: "productos"
})

const orderModel = mongoose.model(collection, schema)
export default orderModel

/*


{
    "first_name": "Nanami",
    "last_name": "Kento",
    "email": "nanamikentoq@gmail.com",
    "age": "28",
    "password": "123456",
    "rol": "user",
    "orders": []

}




*/