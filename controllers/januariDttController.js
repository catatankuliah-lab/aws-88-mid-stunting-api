import path from "path";
import fs from "fs";
import multer from "multer";
import JanuariDtt from "../models/JanuariDttModel.js";

// Konfigurasi Storage untuk Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const  id_dtt  = req.params.id_dtt;
    const uploadPath = path.join('./uploads', 'dtt', '1', id_dtt.toString());
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    req.uploadPath = uploadPath;

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    let currentDate = new Date();
    let year = currentDate.getFullYear(); // Mendapatkan tahun (e.g., 2024)
    let month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Mendapatkan bulan (e.g., 12)
    let date = String(currentDate.getDate()).padStart(2, '0'); // Mendapatkan tanggal (e.g., 23)

    // Menggabungkan menjadi format tahunbulantanggal
    let formattedDate = `${year}${month}${date}`;

    const uniqueSuffix = Date.now().toString().slice(-8);

    cb(null, `${formattedDate}_${uniqueSuffix}_DTT88LOG013273011001.pdf`);
  },
});


const upload = multer({ storage });

export const getAllJanuariDtt = async (req, res) => {
  try {
    const januariDtt = await JanuariDtt.getAllJanuariDtt();
    res.status(200).json({
      status: "success",
      data: januariDtt,
      message: "Januari DTT fetched successfully.",
    });
  } catch (error) {
    console.error("Error fetching Januari DTT:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

export const getJanuariDttByIdAlokasi = async (req, res) => {
  const { id_alokasi } = req.params;

  try {
    const januariDtt = await JanuariDtt.getJanuariDttByIdAlokasi(id_alokasi);
    if (januariDtt.length > 0) {
      res.status(200).json({
        status: "success",
        data: januariDtt,
        message: "Januari DTT by Alokasi fetched successfully.",
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "No Januari DTT found for the given Alokasi ID.",
      });
    }
  } catch (error) {
    console.error("Error fetching Januari DTT by Alokasi ID:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

export const getJanuariDttByIdDesaKelurahan = async (req, res) => {
  const { id_desa_kelurahan } = req.params;

  try {
    const januariDtt = await JanuariDtt.getJanuariDttByIdDesaKelurahan(id_desa_kelurahan);
    if (januariDtt.length > 0) {
      res.status(200).json({
        status: "success",
        data: januariDtt[0],
        message: "Januari DTT by Desa Kelurahan fetched successfully.",
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "No Januari DTT found for the given Desa Kelurahan ID.",
      });
    }
  } catch (error) {
    console.error("Error fetching Januari DTT by Desa Kelurahan ID:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

export const getJanuariDttByKodeDTT = async (req, res) => {
  const { kode_dtt } = req.params;

  try {
    const januariDtt = await JanuariDtt.getJanuariDttByKodeDTT(kode_dtt);
    if (januariDtt.length > 0) {
      res.status(200).json({
        status: "success",
        data: januariDtt[0],
        message: "Januari DTT by Desa Kelurahan fetched successfully.",
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "No Januari DTT found for the given Desa Kelurahan ID.",
      });
    }
  } catch (error) {
    console.error("Error fetching Januari DTT by Desa Kelurahan ID:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

export const getJanuariDttByIdKantor = async (req, res) => {
  const { id_kantor } = req.params;

  try {
    const januariDtt = await JanuariDtt.getJanuariDttByIdKantor(id_kantor);
    if (januariDtt.length > 0) {
      res.status(200).json({
        status: "success",
        data: januariDtt,
        message: "Januari DTT by Kantor fetched successfully.",
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "No Januari DTT found for the given Kantor ID.",
      });
    }
  } catch (error) {
    console.error("Error fetching Januari DTT by Kantor ID:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

export const uploadFileDTTT = async (req, res) => {
  const { id_dtt } = req.params;
  const file_dtt = req.file.filename;

  try {
    const result = await JanuariDtt.uploadFileDTTT(id_dtt, {
      file_dtt
    });
    if (result.affectedRows > 0) {
      res.status(200).json({
        status: "success",
        message: "Januari DTT updated successfully.",
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "Januari DTT not found for the given ID.",
      });
    }
  } catch (error) {
    console.error("Error updating Januari DTT:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

export { upload };
