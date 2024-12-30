import express from "express";
import * as moveController from "../controllers/moveController.js"; // Pastikan file controller sudah dibuat
import * as authMiddleware from "../middlewares/authMiddleware.js"; // Pastikan middleware sudah tersedia

const router = express.Router();

// Routes untuk Move dengan otentikasi dan otorisasi
router.get(
  "/move",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3]), // Sesuaikan peran yang diizinkan
  moveController.getAllMoves
);

router.get(
  "/move/filter",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3]), // Sesuaikan peran yang diizinkan
  moveController.getFilteredMove
);

router.get(
  "/move/:id_move",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3]),
  moveController.getMoveById
);

router.get(
  "/move/item/:id_item_po",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3]),
  moveController.getMoveByItemId
);

router.post(
  "/move",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2]), // Sesuaikan peran yang diizinkan untuk menambahkan data
  moveController.addMove
);

router.put(
  "/move/:id_move",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2]), // Sesuaikan peran yang diizinkan untuk memperbarui data
  moveController.updateMove
);

router.delete(
  "/move/:id_move",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1]), // Sesuaikan peran yang diizinkan untuk menghapus data
  moveController.deleteMove
);

// Routes untuk pengembangan (tanpa otentikasi dan otorisasi)
router.get("/dev/move", moveController.getAllMoves);
router.get("/dev/move/:id_move", moveController.getMoveById);
router.get("/dev/move/item/:id_item_po", moveController.getMoveByItemId);
router.post("/dev/move", moveController.addMove);
router.put("/dev/move/:id_move", moveController.updateMove);
router.delete("/dev/move/:id_move", moveController.deleteMove);

export default router;
