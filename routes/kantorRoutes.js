import express from "express";
import * as kantorController from "../controllers/kantorController.js";
import * as authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// Routes untuk kantor dengan otentikasi dan otorisasi
router.get(
  "/kantor",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 9]),
  kantorController.getAllKantors
);

// Routes untuk pengembangan (tanpa otentikasi dan otorisasi)
router.get("/dev/kantor", kantorController.getAllKantors);

export default router;
