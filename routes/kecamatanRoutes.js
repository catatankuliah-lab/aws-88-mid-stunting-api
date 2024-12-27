import express from "express";
import * as kecamatanController from "../controllers/kecamatanController.js";
import * as authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// Routes untuk kecamatan dengan otentikasi dan otorisasi
router.get(
  "/kecamatan",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1,2,3]),
  kecamatanController.getAllKecamatan
);

router.get(
  "/kecamatan/:id_kabupaten_kota",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1,2,3]),
  kecamatanController.getKecamatanByIdKabupatenKota
);

// Routes untuk pengembangan (tanpa otentikasi dan otorisasi)
router.get("/dev/kecamatan", kecamatanController.getAllKecamatan);
router.get(
  "/dev/kecamatan/:id_kabupaten_kota",
  kecamatanController.getKecamatanByIdKabupatenKota
);

export default router;
