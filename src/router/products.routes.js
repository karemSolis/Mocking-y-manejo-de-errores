import { Router } from "express";
import ProductModel from "../DAO/models/products.js";


const productRouter = Router();



productRouter.get("/:id", async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: "Producto no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el producto" });
  }
});

productRouter.get("/", async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.render("products", { products }); // Pasa la lista de productos a la vista
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los productos" });
  }
});

productRouter.post("/", async (req, res) => {
  const { product, description, price } = req.body;
  try {
    const newProduct = new ProductModel({
      product,
      description,
      price
    });
    await newProduct.save();
    res.json(newProduct);
  } catch (error) {
    res.status(500).json({ error: "Error al crear un nuevo producto" });
  }
});

productRouter.put("/:id", async (req, res) => {
  const { product, description, price } = req.body;
  try {
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      req.params.id,
      {
        product,
        description,
        price
      },
      { new: true }
    );

    if (updatedProduct) {
      res.json(updatedProduct);
    } else {
      res.status(404).json({ error: "Producto no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el producto" });
  }
});

productRouter.delete("/:id", async (req, res) => {
  try {
    const deletedProduct = await ProductModel.findByIdAndRemove(req.params.id);
    if (deletedProduct) {
      res.json(deletedProduct);
    } else {
      res.status(404).json({ error: "Producto no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el producto" });
  }
});

//details
productRouter.get("/details/:id", async (req, res) => {
  try {
    const products = await ProductModel.findById(req.params.id);
    if (product) {
      res.render("details", { products });
    } else {
      res.status(404).json({ error: "Producto no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el producto" });
  }
});


export default productRouter;