
import productModel from "../models/products.js"


class ProductsDao {
    async addProduct(product) {
        try {
            const newProduct = new productModel(product);
            await newProduct.save();
            return "Producto agregado";
        } catch (error) {
            return "No se puede agregar producto";
        }
    }




    async getProducts() {
        try {
            const products = await productModel.find().lean();
            return products;
        } catch (error) {
            return "No se puede obtener producto";
        }
    }

    async getProductById(productId) {
        try {
            const product = await productModel.findById(productId).lean();
            if (!product) return "No se encontró el producto";
            return product;
        } catch (error) {
            return "No se puede obtener producto";
        }
    }

    async updateProduct(productId, product) {
        try {
            const updatedProduct = await productModel.findByIdAndUpdate(productId, product, { new: true });
            if (!updatedProduct) return "No se encuentra producto";
            return "Producto actualizado";
        } catch (error) {
            return "Error al actualizar el producto";
        }
    }

    async deleteProduct(productId) {
        try {
            const deletedProduct = await productModel.findByIdAndRemove(productId);
            if (!deletedProduct) return "No se encontró el producto";
            return "Producto eliminado";
        } catch (error) {
            return "No se puede eliminar producto";
        }
    }

    async exist(productId) {
        try {
            const product = await productModel.findById(productId).lean();
            return !!product; // Devolverá true si el producto existe, de lo contrario, false.
        } catch (error) {
            return false; // En caso de error, asumimos que el producto no existe.
        }
    }
}





export default ProductsDao;