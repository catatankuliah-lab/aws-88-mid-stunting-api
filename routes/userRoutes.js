import express from "express";
import multer from "multer";
import * as userController from "../controllers/userController.js";
import * as authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// Routes untuk user dengan otentikasi dan otorisasi
router.get(
  "/user",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 9]),
  userController.getAllUsers
);
router.get(
  "/user/:id_user",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 9, 11]),
  userController.getUserById
);

// Routes untuk pengembangan (tanpa otentikasi dan otorisasi)
router.get("/dev/user", userController.getAllUsers);
router.get("/dev/user/:id_user", userController.getUserById);
router.post("/dev/user", userController.createUser);

export default router;
