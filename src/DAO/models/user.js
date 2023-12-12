import mongoose from "mongoose"

const usersCollection = "usuarios";

const usersSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String, //para login 
    age: Number,
    password: String, //para login
    rol: String, //rol para ver hacia donde se dirige la página 
    orders: [
        {
        type: mongoose.SchemaTypes.ObjectId,
        ref:"Orders"
        }

    ]
})

export const usersModel = mongoose.model(usersCollection, usersSchema)

export default usersModel