import express from "express";
import * as poController from "../controllers/poController.js"; // Pastikan file controller sudah dibuat
import * as authMiddleware from "../middlewares/authMiddleware.js"; // Pastikan middleware sudah tersedia

const router = express.Router();

// Routes untuk PO dengan otentikasi dan otorisasi
router.get(
  "/po",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3]), // Sesuaikan peran yang diizinkan
  poController.getAllPO
);

router.get(
  "/po/filter",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3]), // Sesuaikan peran yang diizinkan
  poController.getFilteredPO
);

router.get(
  "/po/jumlah/kantor/:id_kantor",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3]), // Sesuaikan peran yang diizinkan
  poController.getJumlahPOByKantor
);

router.get(
  "/po/:id_po",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3]),
  poController.getPOById
);

router.get(
  "/po/kantor/:id_kantor",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3]),
  poController.getPOByIdKantor
);

router.post(
  "/po",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2]), // Sesuaikan peran yang diizinkan untuk menambahkan data
  poController.addPO
);

router.put(
  "/po/:id_po",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2]), // Sesuaikan peran yang diizinkan untuk memperbarui data
  poController.updatePO
);

router.delete(
  "/po/:id_po",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1]), // Sesuaikan peran yang diizinkan untuk menghapus data
  poController.deletePO
);

// Routes untuk pengembangan (tanpa otentikasi dan otorisasi)
router.get("/dev/po", poController.getAllPO);
router.get("/dev/po/:id_po", poController.getPOById);
router.get("/dev/po/kantor/:id_kantor", poController.getPOByIdKantor);
router.post("/dev/po", poController.addPO);
router.put("/dev/po/:id_po", poController.updatePO);
router.delete("/dev/po/:id_po", poController.deletePO);

export default router;
