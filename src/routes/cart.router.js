import { Router } from "express";
import { addCart, addProductToCart, deleteCart, deleteProductCart, findAll, findCartById, quantityUpdate, upDateCart } from "../controllers/carts.controller.js";

const router = Router()

router.get("/", findAll);
router.get("/:idCart", findCartById);
router.post("/:idCart/products/:idProduct", addProductToCart);
router.post("/", addCart);
router.put("/:cid/products/:pid", quantityUpdate)
router.put("/:cid", upDateCart)
router.delete("/:cid/products/:pid", deleteProductCart)
router.delete("/:cid", deleteCart)

export default router;