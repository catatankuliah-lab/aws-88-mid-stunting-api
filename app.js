import express from "express";
import cors from "cors";
import sequelize from "./config/config.js";
import userRoutes from "./routes/userRoutes.js";
import provinsiRoutes from "./routes/provinsiRoutes.js";
import kabupatenkotaRoutes from "./routes/kabupatenkotaRoutes.js";
import kecamatanRoutes from "./routes/kecamatanRoutes.js";
import desaKelurahanRoutes from "./routes/desaKelurahanRoutes.js";
import kantorRoutes from "./routes/kantorRoutes.js";

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
        // app.use("/api", authRoutes);
        // app.use("/api", roleRoutes);
        app.use("/api/v1", userRoutes);
        app.use("/api/v1", kantorRoutes);
        app.use("/api/v1", provinsiRoutes);
        app.use("/api/v1", kabupatenkotaRoutes);
        app.use("/api/v1", kecamatanRoutes);
        app.use("/api/v1", desaKelurahanRoutes);
        // app.use("/api", gudangRoutes);
        // app.use("/api", januariDttRoutes);
        // app.use("/api", alokasiRoutes);
        // app.use("/api", januariItemRencanaSalurRoutes);
        // app.use("/api", januariRencanaSalurRoutes);
        // app.use("/api", januariKpmRoutes);
        // app.use("/api", januariLogRencanaSalurRoutes);
        // app.use("/api", januariLogItemRencanaSalurRoutes);
        // app.use("/api", januariDoRoutes);
        // app.use("/api", januariLogDoRoutes);
        // app.use("/api", januariLoRoutes);
        // app.use("/api", januariLogLoRoutes);
        // app.use("/api", januariItemLoRoutes);
        // app.use("/api", januariBastRoutes);
        // app.use("/api", januariBastPenggantiRoutes);
        // app.use("/api", januariSptjmRoutes);
        // app.use("/api", januariItemSptjmRoutes);
        // app.use("/api", januariLogSptjmRoutes);
        // app.use("/api", januariLogItemSptjmRoutes);
        // app.use("/api", januariPenyaluranRoutes);

        // app.use("/api", januariPDFDORoutes);

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
};

init();
