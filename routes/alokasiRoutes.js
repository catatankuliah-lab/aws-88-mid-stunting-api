import express from "express";
import * as alokasiController from "../controllers/alokasiController.js";
import * as authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// Routes untuk alokasi dengan otentikasi dan otorisasi
router.get(
  "/alokasi",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 4]),
  alokasiController.getAllAlokasi
);

// Routes untuk pengembangan (tanpa otentikasi dan otorisasi)
router.get("/dev/alokasi", alokasiController.getAllAlokasi);

export default router;
