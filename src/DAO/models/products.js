//CREANDO EL ESQUEMA O ESTRUCTUR DE LOS DATOS QUE SE GUARDARÁN EN ATLAS
import mongoose from "mongoose";

const productCollection = "productos" //la colección para atlas 

//el schema
const productSchema = mongoose.Schema({
    product: String,
    description: String,
    price: Number,
})

//se crea la constante para exportar 
const productModel = mongoose.model(productCollection, productSchema)

export default productModel

/*

{
    "product": "String",
    "description": "String",
    "price": 1000,
}


*/
