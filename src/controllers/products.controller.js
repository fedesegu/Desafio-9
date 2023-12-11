import { create, deleteProductById, findAllProducts, findProductById, upDateProductById } from "../services/products.services.js";



export const findAll = async (req, res) => {
    try {
      const products = await findAllProducts(req.query);
      res.status(200).json({ products });
    } catch (error) {
      return res.status(500).json({ error });
    }
}

export const findById = async (req, res) => {
    try {
      const {pid} = req.params
      const product = await findProductById(pid);
      res.status(200).json({ product });
    } catch (error) {
      return res.status(500).json({ error });
    }
}

export const updateById = async (req, res) => {
    try {
      const {pid} = req.params
      const data = req.body
      console.log(data,pid)
      const product = await upDateProductById(pid,data);
      res.status(200).json({ product });
    } catch (error) {
      return res.status(500).json({ error });
    }
}

export const createProduct = async (req, res) => {
    try {
      const createdProduct = await create(req.body);
      res
        .status(200)
        .json({ message: "Product created", product: createdProduct });
    } catch (error) {
      return res.status(500).json({ error });
    }
}

export const deleteProduct = async (req, res) => {
    const { idProduct } = req.params;
    try {
      await deleteProductById(idProduct);
      res.status(200).json({ message: "Product deleted" });
    } catch (error) {
      return res.status(500).json({ error });
    }
}