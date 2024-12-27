import path from "path";
import fs from "fs";
import multer from "multer";
import JanuariDoModel from "../models/JanuariDoModel.js";

// Konfigurasi Storage untuk Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { id_alokasi, nama_kantor, nama_gudang, tanggal_do } = req.body;
    let formattedDate = '00000000';
    if (tanggal_do) {
      formattedDate = tanggal_do.replace(/[^0-9]/g, '').slice(0, 8);
    }
    if (!id_alokasi || !nama_kantor || !nama_gudang) {
      return cb(new Error('Missing required fields in request body'));
    }
    const uploadPath = path.join('./uploads', 'do', id_alokasi.toString(), nama_kantor, nama_gudang, formattedDate);
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    req.uploadPath = uploadPath;

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    let formattedDate = '00000000';
    if (req.body.tanggal_do) {
      formattedDate = req.body.tanggal_do.replace(/[^0-9]/g, '').slice(0, 8);
    }
    const uniqueSuffix = Date.now().toString().slice(-8);
    const cleanNomorDO = req.body.nomor_do ? req.body.nomor_do.replace(/[^a-zA-Z0-9]/g, '') : 'default';

    cb(null, `${formattedDate}_${uniqueSuffix}_${cleanNomorDO}.pdf`);
  },
});


const upload = multer({ storage });

export const getAllJanuariDo = async (req, res) => {
  try {
    const doItems = await JanuariDoModel.getAllJanuariDo();
    res.status(200).json({
      status: "success",
      data: doItems,
      message: "Januari DO fetched successfully.",
    });
  } catch (error) {
    console.error("Error fetching Januari DO:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

export const getJanuariDoByIdAlokasi = async (req, res) => {
  const { id_alokasi } = req.params;

  try {
    const doItems = await JanuariDoModel.getJanuariDoByIdAlokasi(id_alokasi);
    if (doItems.length > 0) {
      res.status(200).json({
        status: "success",
        data: doItems,
        message: "Januari DO by Alokasi fetched successfully.",
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "No Januari DO found for the given Alokasi ID.",
      });
    }
  } catch (error) {
    console.error("Error fetching Januari DO by Alokasi ID:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

export const getJanuariDoByIdDo = async (req, res) => {
  const { id_do } = req.params;

  try {
    const doItem = await JanuariDoModel.getJanuariDoByIdDo(id_do);
    if (doItem) {
      res.status(200).json({
        status: "success",
        data: doItem,
        message: "Januari DO by ID fetched successfully.",
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "No Januari DO found for the given ID.",
      });
    }
  } catch (error) {
    console.error("Error fetching Januari DO by ID:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

export const addJanuariDo = async (req, res) => {
  const { id_alokasi, id_kantor, id_gudang, nomor_do, tanggal_do, status_do } = req.body;
  const file_do = req.file.filename;

  const uploadPath = req.uploadPath ? path.join(req.uploadPath, file_do) : null;

  try {
    const result = await JanuariDoModel.addJanuariDo({
      id_alokasi,
      id_kantor,
      id_gudang,
      nomor_do,
      tanggal_do,
      file_do,
      status_do,
      path_do: uploadPath,
    });
    res.status(201).json({
      status: "success",
      data: result,
      message: "Januari DO added successfully.",
    });
  } catch (error) {
    console.error("Error adding Januari DO:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

export const updateJanuariDo = async (req, res) => {
  const { id_do } = req.params;
  const { id_alokasi, id_gudang, nomor_do, tanggal_do, file_do, status_do } =
    req.body;

  try {
    const result = await JanuariDoModel.updateJanuariDo(id_do, {
      id_alokasi,
      id_gudang,
      nomor_do,
      tanggal_do,
      file_do,
      status_do,
    });
    if (result.affectedRows > 0) {
      res.status(200).json({
        status: "success",
        message: "Januari DO updated successfully.",
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "Januari DO not found for the given ID.",
      });
    }
  } catch (error) {
    console.error("Error updating Januari DO:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

export const getPaginatedJanuariDOGudang = async (req, res) => {
  const { page = 1, limit = 10, } = req.query;
  const { id_gudang } = req.params;

  try {
    const { data, total } = await JanuariDoModel.getPaginatedJanuariDOGudang(
      parseInt(page),
      parseInt(limit),
      parseInt(id_gudang)
    );

    res.json({
      data,
      currentPage: parseInt(page),
      limit: parseInt(limit),
      totalData: total,
      totalPages: Math.ceil(total / parseInt(limit)),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPaginatedJanuariDOKantor = async (req, res) => {
  const { page = 1, limit = 10, } = req.query;
  const { id_kantor } = req.params;

  console.log(id_kantor);

  try {
    const { data, total } = await JanuariDoModel.getPaginatedJanuariDOKantor(
      parseInt(page),
      parseInt(limit),
      parseInt(id_kantor)
    );

    res.json({
      data,
      currentPage: parseInt(page),
      limit: parseInt(limit),
      totalData: total,
      totalPages: Math.ceil(total / parseInt(limit)),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllJanuariDoIdGudang = async (req, res) => {
  const { id_gudang } = req.params;

  try {
    const { data } = await JanuariDoModel.getAllJanuariDoIdGudang(
      parseInt(id_gudang)
    );

    res.json({
      data
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Export Upload Middleware
export { upload };