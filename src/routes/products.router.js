import {Router} from 'express'
import { __dirname } from "../utils.js"
import { findById, findAll, createProduct, deleteProduct, updateById } from '../controllers/products.controller.js';

const router = Router();

router.get("/", findAll)
router.get("/:pid", findById)
router.post("/", createProduct)
router.delete("/:pid", deleteProduct)
router.put("/:pid", updateById)

export default router