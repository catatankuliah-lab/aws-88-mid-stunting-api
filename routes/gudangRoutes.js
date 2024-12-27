import express from "express";
import * as gudangController from "../controllers/gudangController.js";
import * as authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// Routes untuk gudang dengan otentikasi dan otorisasi
router.get(
  "/gudang",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1,2,3]),
  gudangController.getAllGudang
);

router.get(
  "/gudang/:id_kantor",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1,2,3]),
  gudangController.getGudangByIdKantor
);

// Routes untuk pengembangan (tanpa otentikasi dan otorisasi)
router.get("/dev/gudang", gudangController.getAllGudang);
router.get("/dev/gudang/:id_kantor", gudangController.getGudangByIdKantor);

export default router;
