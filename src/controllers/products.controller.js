import ProductsDao from "../DAO/classes/products.dao.js";

const productsDaoInstance = new ProductsDao();

export const addProduct = async (req, res) => {
    const product = req.body;

    try {
        const result = await productsDaoInstance.addProduct(product);
        res.status(200).json({ status: "success", result: result });
    } catch (error) {
        console.error("Error al agregar producto:", error);
        res.status(500).json({ status: "error", error: "No se puede agregar producto" });
    }
};

export const getProducts = async (req, res) => {
    try {
        const result = await productsDaoInstance.getProducts();
        res.status(200).json({ status: "success", result: result });
    } catch (error) {
        console.error("Error al obtener productos:", error);
        res.status(500).json({ status: "error", error: "No se puede obtener productos" });
    }
};

export const getProductById = async (req, res) => {
    const { productId } = req.params;

    try {
        const result = await productsDaoInstance.getProductById(productId);
        res.status(200).json({ status: "success", result: result });
    } catch (error) {
        console.error("Error al obtener producto por ID:", error);
        res.status(500).json({ status: "error", error: "No se puede obtener producto por ID" });
    }
};

export const updateProduct = async (req, res) => {
    const { productId } = req.params;
    const updatedProduct = req.body;

    try {
        const result = await productsDaoInstance.updateProduct(productId, updatedProduct);
        res.status(200).json({ status: "success", result: result });
    } catch (error) {
        console.error("Error al actualizar producto:", error);
        res.status(500).json({ status: "error", error: "Error al actualizar producto" });
    }
};

export const deleteProduct = async (req, res) => {
    const { productId } = req.params;

    try {
        const result = await productsDaoInstance.deleteProduct(productId);
        res.status(200).json({ status: "success", result: result });
    } catch (error) {
        console.error("Error al eliminar producto:", error);
        res.status(500).json({ status: "error", error: "No se puede eliminar producto" });
    }
};

export const exist = async (req, res) => {
    const { productId } = req.params;

    try {
        const result = await productsDaoInstance.exist(productId);
        res.status(200).json({ status: "success", result: result });
    } catch (error) {
        console.error("Error al verificar la existencia del producto:", error);
        res.status(500).json({ status: "error", error: "Error al verificar la existencia del producto" });
    }
};
