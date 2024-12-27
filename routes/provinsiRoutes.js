import express from "express";
import * as provinsiController from "../controllers/provinsiController.js";
import * as authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// Routes untuk provinsi dengan otentikasi dan otorisasi
router.get(
  "/provinsi",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3]),
  provinsiController.getAllProvinsi
);

// Routes untuk pengembangan (tanpa otentikasi dan otorisasi)
router.get("/dev/provinsi", provinsiController.getAllProvinsi);
export default router;
