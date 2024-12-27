import express from "express";
import * as itempoController from "../controllers/itempoController.js"; // Pastikan file controller sudah dibuat
import * as authMiddleware from "../middlewares/authMiddleware.js"; // Pastikan middleware sudah tersedia

const router = express.Router();

// Routes untuk Item PO dengan otentikasi dan otorisasi
router.get(
  "/itempo",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3]), // Sesuaikan peran yang diizinkan
  itempoController.getAllItemPO
);

router.get(
  "/itempo/:id_item_po",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3]),
  itempoController.getItemPOById
);

router.get(
  "/itempo/po/:id_po",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3]),
  itempoController.getItemPOByIdPO
);

router.post(
  "/itempo",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2]), // Sesuaikan peran yang diizinkan untuk menambahkan data
  itempoController.addItemPO
);

router.put(
  "/itempo/:id_item_po",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2]), // Sesuaikan peran yang diizinkan untuk memperbarui data
  itempoController.updateItemPO
);

router.delete(
  "/itempo/:id_item_po",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1]), // Sesuaikan peran yang diizinkan untuk menghapus data
  itempoController.deleteItemPO
);

// Routes untuk pengembangan (tanpa otentikasi dan otorisasi)
router.get("/dev/itempo", itempoController.getAllItemPO);
router.get("/dev/itempo/:id_item_po", itempoController.getItemPOById);
router.get("/dev/itempo/po/:id_po", itempoController.getItemPOByIdPO);
router.post("/dev/itempo", itempoController.addItemPO);
router.put("/dev/itempo/:id_item_po", itempoController.updateItemPO);
router.delete("/dev/itempo/:id_item_po", itempoController.deleteItemPO);

export default router;
