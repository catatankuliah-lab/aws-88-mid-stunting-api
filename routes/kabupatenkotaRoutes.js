import express from "express";
import * as kabupatenkotaController from "../controllers/kabupatenkotaController.js";
import * as authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// Routes untuk kabupatenkota dengan otentikasi dan otorisasi
router.get(
  "/kabupatenkota",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3]),
  kabupatenkotaController.getAllKabupatenKota
);

router.get(
  "/kabupatenkota/:id_provinsi",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3]),
  kabupatenkotaController.getKabupatenKotaByIdProvinsi
);

// Routes untuk pengembangan (tanpa otentikasi dan otorisasi)
router.get("/dev/kabupatenkota", kabupatenkotaController.getAllKabupatenKota);
router.get("/dev/kabupatenkota/:id_provinsi", kabupatenkotaController.getKabupatenKotaByIdProvinsi);
export default router;
