
import cartModel from "../../DAO/models/cart.js"
import ProductsDao from "./products.dao.js";


    class CartDao{ 
    constructor() {
        this.productsDao = new ProductsDao(); 
    }

    async readCarts() { 
        return await cartModel.find(); 
    }

    async exist(cartId) { 
        return await cartModel.findById(cartId); 
    } 


    async addCarts() { /*addCarts es un método que se utiliza para crear un nuevo carrito en la base de datos.*/
        const newCart = await cartModel.create({ products: [] }); 
        return "Carrito Agregado";
    }

    /*Este método se utiliza para obtener un carrito específico de la base de datos según un ID dado, toma de argumento el id que debería ser único del carrito que quiero
    recuperar, llama al método exist(id)para verificar si existe un carrito con ese id en la base de datos, si no se encuentra carrito con ese id devuelve mensaje: "carrito no existe" */
    async getCartsById(cartId) {
        const cart = await this.exist(cartId);
        if (!cart) return "Carrito no existe";
        return cart;
    }


    /*Este método se utiliza para obtener detalles de productos a partir de una lista de IDs de productos.Recibe como argumento productIds, en plural, esto es
    porque busca devolver la lista de todos los carritos */
    async getProductsForCart(productIds) {
        //const products = await this.cartModel.getProductById(productIds); 
        const products = await this.productsDao.getProductById(productIds);


        return products; 
    }


    async addProductInCart(cartId, productId) { 
        const cart = await this.exist(cartId);
       
        if (!cart) {
            console.log("Carrito no existe");
            return "Carrito no existe";
        }
    
        // Buscar el producto en la base de datos con el ID especificado (productId).
        const product = await this.productsDao.exist(productId);
    
        // Verificar si el producto no existe en la base de datos.
        if (!product) {
            console.log("No se encuentra el producto");
            return "No se encuentra el producto";
        }
    
        // Comprobar si el producto ya está presente en el carrito.
        const existingProduct = cart.products.find((prod) => prod.id.equals(productId));
    
        if (existingProduct) {
            // El producto ya está en el carrito, incrementar la cantidad.
            existingProduct.quantity++;
            console.log("Producto sumado en el carrito");
        } else {
            // El producto no está en el carrito, agregarlo.
            cart.products.push({ id: productId, quantity: 1 });
            console.log("Producto en el carrito :)");
        }
    
        // Guardar el carrito actualizado en la base de datos.
        await cart.save();
        console.log("Carrito actualizado:", cart);
    
        return "Producto agregado al carrito";
    }
    
    
   

        
    }





export default  CartDao