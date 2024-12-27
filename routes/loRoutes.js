import express from "express";
import * as loController from "../controllers/loController.js"; // Pastikan file controller sudah dibuat
import * as authMiddleware from "../middlewares/authMiddleware.js"; // Pastikan middleware sudah tersedia

const router = express.Router();

// Routes untuk LO dengan otentikasi dan otorisasi
router.get(
  "/lo",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3]), // Sesuaikan peran yang diizinkan
  loController.getAllLO
);

router.get(
  "/lo/:id_lo",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3]),
  loController.getLOById
);

router.get(
  "/lo/po/:id_po",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3]),
  loController.getLOByIdPO
);

router.get(
  "/lo/kantor/:id_kantor",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3]),
  loController.getLOByIdKantor
);

router.post(
  "/lo",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2]), // Sesuaikan peran yang diizinkan untuk menambahkan data
  loController.addLO
);

router.put(
  "/lo/:id_lo",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2]), // Sesuaikan peran yang diizinkan untuk memperbarui data
  loController.updateLO
);

router.delete(
  "/lo/:id_lo",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1]), // Sesuaikan peran yang diizinkan untuk menghapus data
  loController.deleteLO
);

// Routes untuk pengembangan (tanpa otentikasi dan otorisasi)
router.get("/dev/lo", loController.getAllLO);
router.get("/dev/lo/:id_lo", loController.getLOById);
router.get("/dev/lo/po/:id_po", loController.getLOByIdPO);
router.get("/dev/lo/kantor/:id_kantor", loController.getLOByIdKantor);
router.post("/dev/lo", loController.addLO);
router.put("/dev/lo/:id_lo", loController.updateLO);
router.delete("/dev/lo/:id_lo", loController.deleteLO);

export default router;
