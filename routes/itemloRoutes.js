import express from "express";
import * as itemLOController from "../controllers/itemloController.js"; // Pastikan file controller sudah dibuat
import * as authMiddleware from "../middlewares/authMiddleware.js"; // Pastikan middleware sudah tersedia

const router = express.Router();

// Routes untuk Item LO dengan otentikasi dan otorisasi
router.get(
  "/itemlo",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3]), // Sesuaikan peran yang diizinkan
  itemLOController.getAllItemLO
);

router.get(
  "/itemlo/lo/:id_lo",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3]),
  itemLOController.getItemLOByIdLO
);

router.get(
  "/itemlo/:id_item_lo",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3]),
  itemLOController.getItemLOById
);

router.post(
  "/itemlo",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2]), // Sesuaikan peran yang diizinkan untuk menambahkan data
  itemLOController.addItemLO
);

router.delete(
  "/itemlo/:id_item_lo",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1]), // Sesuaikan peran yang diizinkan untuk menghapus data
  itemLOController.deleteItemLO
);

// Routes untuk pengembangan (tanpa otentikasi dan otorisasi)
router.get("/dev/itemlo", itemLOController.getAllItemLO);
router.get("/dev/itemlo/lo/:id_lo", itemLOController.getItemLOByIdLO);
router.get("/dev/itemlo/:id_item_lo", itemLOController.getItemLOById);
router.post("/dev/itemlo", itemLOController.addItemLO);
router.delete("/dev/itemlo/:id_item_lo", itemLOController.deleteItemLO);

export default router;
