import express from "express";
import * as desaKelurahanController from "../controllers/desaKelurahanController.js";
import * as authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// Routes untuk desa/kelurahan dengan otentikasi dan otorisasi
router.get(
  "/desaKelurahan",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1,2,3]),
  desaKelurahanController.getAllDesaKelurahan
);

router.get(
  "/desaKelurahan/:id_kecamatan",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1,2,3]),
  desaKelurahanController.getDesaKelurahanByIdKecamatan
);

// Routes untuk pengembangan (tanpa otentikasi dan otorisasi)
router.get("/dev/desaKelurahan", desaKelurahanController.getAllDesaKelurahan);
router.get(
  "/dev/desaKelurahan/:id_kecamatan",
  desaKelurahanController.getDesaKelurahanByIdKecamatan
);

export default router;
