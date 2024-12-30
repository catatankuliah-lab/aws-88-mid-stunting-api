import express from "express";
import cors from "cors";
import sequelize from "./config/config.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import alokasiRoutes from "./routes/alokasiRoutes.js";
import provinsiRoutes from "./routes/provinsiRoutes.js";
import kabupatenkotaRoutes from "./routes/kabupatenkotaRoutes.js";
import kecamatanRoutes from "./routes/kecamatanRoutes.js";
import desaKelurahanRoutes from "./routes/desaKelurahanRoutes.js";
import kantorRoutes from "./routes/kantorRoutes.js";
import poRoutes from "./routes/poRoutes.js";
import moveRoutes from "./routes/moveRoutes.js";
import itempoRoutes from "./routes/itempoRoutes.js";
import loRoutes from "./routes/loRoutes.js";
import itemloRoutes from "./routes/itemloRoutes.js";

const app = express();
const PORT = process.env.PORT || 3089;

app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

app.use(express.json());

const init = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connected to the database.");
        await sequelize.sync();
        console.log("Database & tables created!");
        app.use("/api/v1", authRoutes);
        app.use("/api/v1", alokasiRoutes);
        app.use("/api/v1", userRoutes);
        app.use("/api/v1", kantorRoutes);
        app.use("/api/v1", provinsiRoutes);
        app.use("/api/v1", kabupatenkotaRoutes);
        app.use("/api/v1", kecamatanRoutes);
        app.use("/api/v1", desaKelurahanRoutes);
        app.use("/api/v1", poRoutes);
        app.use("/api/v1", moveRoutes);
        app.use("/api/v1", itempoRoutes);
        app.use("/api/v1", loRoutes);
        app.use("/api/v1", itemloRoutes);

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
};

init();
