
import { Router } from "express";
import cartModel from "../DAO/models/cart.js";
import productModel from "../DAO/models/products.js";
import CartDao from "../DAO/classes/cart.dao.js";



const CartRouter = Router();
const carts = new CartDao();
const productsModel = new productModel();

// Ruta para agregar un producto a un carrito específico
CartRouter.post('/:cartId/productos/:productId', async (req, res) => {
    const { cartId, productId } = req.params;

    // Verificar si el carrito existe
    const cart = await carts.exist(cartId);
    if (!cart) {
        return res.status(404).json({ error: 'El carrito no existe' });
    }

    // Verificar si el producto existe
    const product = await productsModel.exist(productId);
    if (!product) {
        return res.status(404).json({ error: 'El producto no existe' });
    }

    // Comprobar si el producto ya está en el carrito
    if (cart.products.some((prod) => prod.id === productId)) {
        const existingProduct = cart.products.find((prod) => prod.id === productId);
        existingProduct.quantity++;
    } else {
        // Agregar el producto al carrito
        cart.products.push(productId);

    }

    // Guardar el carrito actualizado en la base de datos
    await cart.save();

    return res.status(200).json({ message: 'Producto agregado al carrito' });
});


// Ruta para crear un nuevo carrito
CartRouter.post("/create", async (req, res) => {
    try {
        const newCart = new cartModel(); // Crea una nueva instancia de un carrito
        await newCart.save(); // Guarda el carrito en la base de datos

        res.status(201).json({ cartId: newCart._id }); // Devuelve el ID del carrito creado
    } catch (error) {
        res.status(500).json({ error: "No se pudo crear el carrito" });
    }
});

// Ruta para agregar un carrito
CartRouter.post("/addCart", async (req, res) => {
    res.send(await carts.addCarts());
});

// Ruta para agregar productos a un carrito
CartRouter.post("/addProduct", async (req, res) => {
    const cartId = req.body.cartId; // Utiliza req.body para obtener los datos
    const productId = req.body.productId;
    const quantity = req.body.quantity;
    res.send(await carts.addProductInCart(cartId, productId, quantity));
});


// GET api/carts/:cartId
CartRouter.get('/:cartId', async (req, res) => {
    const cartId = req.params.cartId;
    try {
        const cart = await cartModel.findById(cartId).populate('productos');

        if (!cart) {
            return res.status(404).json({ error: 'El carrito no existe' });
        }

        const productsInCart = await carts.getProductsForCart(cart.products);

        // Combina los detalles de los productos con el carrito
        const cartWithProductDetails = {
            cart: cart,
            productsInCart: productsInCart
        };

        // Renderiza la vista con los detalles de los productos y el carrito
        res.render('carrito', cartWithProductDetails);
    } catch (error) {
        res.status(500).json({ error: "No se pudo encontrar el carrito" });
    }
});

// PUT api/carts/:cartId
CartRouter.put('/:cartId', async (req, res) => {
    // Actualiza el carrito con un arreglo de productos
    const cartId = req.body.cartId;
    const updatedProducts = req.body.products;
    res.send(await carts.updateCartProducts(cartId, updatedProducts));
});

// PUT api/carts/:cartId/products/:productId
CartRouter.put('/:cartId/products/:productId', async (req, res) => {
    // Actualiza la cantidad de ejemplares del producto en el carrito
    const cartId = req.body.cartId; // Utiliza req.body para obtener los datos
    const productId = req.body.productId
    const quantity = req.body.quantity;
    res.send(await carts.updateProductQuantity(cartId, productId, quantity));
});


// DELETE api/carts/:cartId
CartRouter.delete('/:cartId', async (req, res) => {
    // Elimina todos los productos del carrito
    const cartId = req.body.cartId
    res.send(await carts.deleteCartProducts(cartId));
});

export default CartRouter;