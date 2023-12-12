import { addProductCart, cartBydId, cartUpdate, createCart, deleteCartProducts, deleteProducttoCart, findAllCarts, quantityUpdateCart } from "../services/cart.services.js";


export const findAll = async(req,res)=>{
    try {
        const carts = await findAllCarts()
        res.status(200).json({carts})
    } catch (error) {
      console.log(error)
      return res.status(500).json({ error });
    }
}

export const findCartById = async (req, res) => {
    try{
      const { idCart } = req.params;
      const cart = await cartBydId(idCart);
      res.json(cart);
    } catch (error) {
      return res.status(500).json({ error });
    }
}

export const addProductToCart = async (req, res) => {
    try{
      const { idCart, idProduct } = req.params;
      const cart = await addProductCart(idCart, idProduct);
      res.json({ cart });
    } catch (error) {
      return res.status(500).json({ error });
    }
}

export const addCart = async (req, res) => {
    try{
      const cart = await createCart();
      res.json({ cart });
    } catch (error) {
      return res.status(500).json({ error });
    }
}

export const quantityUpdate = async (req,res) => {
    try{
      const {cid,pid} = req.params
      const quantity = req.body
      const cart = await quantityUpdateCart(cid,pid,quantity);
      res.json({ cart });
    } catch (error) {
      return res.status(500).json({ error });
    }
}

export const upDateCart = async (req,res) => {
    try{
      const {cid} = req.params
      const arrayProducts = req.body
      console.log(arrayProducts)
      const cart = await cartUpdate(cid,arrayProducts);
      res.json({ cart });
    } catch (error) {
      return res.status(500).json({ error });
    }
}

export const deleteProductCart = async (req,res) => {
    try{
      const {cid,pid} = req.params
      const cart = await deleteProducttoCart(cid,pid);
      res.json({ cart });
    } catch (err){
      return res.status(500).json({ error: err.message });
    }
}

export const deleteCart = async (req,res) => {
    try{
      const {cid} = req.params
      const cart = await deleteCartProducts(cid);
      res.json({ cart });
    } catch (err){
      return res.status(500).json({ error: err.message });
    }
  }