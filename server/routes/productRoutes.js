import express from "express";
import {
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  getAllProducts,
} from "../controllers/productController.js";
import { protect, admin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").get(getAllProducts).post(protect, admin, createProduct);
router
  .route("/:id")
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);

export default router;
