import { response } from "express";
import CartDao from "../DAO/classes/cart.dao.js";

export const addToCart = async (req, res) => {
    const { cartId, productId } = req.body;

    try {
        const result = await CartDao.addProductInCart(cartId, productId);
        res.json({ status: "success", result: result });
    } catch (error) {
        console.error("Error en addToCart:", error);
        res.status(500).json({ status: "error", error: "Error al agregar al carrito" });
    }
};

export const getCart = async (req, res) => {
    try {
        const result = await CartDao.readCarts();
        res.json({ status: "success", result: result });
    } catch (error) {
        console.error("Error en getCart:", error);
        res.status(500).json({ status: "error", error: "Error al obtener el carrito" });
    }
};

export const createCart = async (req, res) => {
    try {
        const result = await CartDao.addCarts();
        res.json({ status: "success", result: result });
    } catch (error) {
        console.error("Error en createCart:", error);
        res.status(500).json({ status: "error", error: "Error al crear el carrito" });
    }
};

export const getCartById = async (req, res) => {
    const { cartId } = req.params;

    try {
        const result = await CartDao.getCartsById(cartId);
        res.json({ status: "success", result: result });
    } catch (error) {
        console.error("Error en getCartById:", error);
        res.status(500).json({ status: "error", error: "Error al obtener el carrito por ID" });
    }
};

export const getProductsForCart = async (req, res) => {
    const { productIds } = req.body;

    try {
        const result = await CartDao.getProductsForCart(productIds);
        res.json({ status: "success", result: result });
    } catch (error) {
        console.error("Error en getProductsForCart:", error);
        res.status(500).json({ status: "error", error: "Error al obtener los productos para el carrito" });
    }
};
