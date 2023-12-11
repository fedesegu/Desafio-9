import { Router } from "express";
import { productController } from "../controllers/products.controller.js"

const router = Router();

router.get("/", productController.getAllProducts);
router.post("/", productController.createProduct);
router.get("/:id", productController.getProductById);
router.post("/:cid/products/:pid", productController.addProductToCart);
router.delete("/:cid/products/:pid", productController.removeProductFromCart);
router.put("/:cid/products/:pid", productController.updateProductQuantity);
router.delete("/:cid/empty", productController.clearCart);
router.delete("/:cid", productController.deleteCart);

export default router;