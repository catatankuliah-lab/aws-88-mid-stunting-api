import path from "path";
import fs from "fs";
import multer from "multer";
import JanuariPenyaluranModel from "../models/JanuariPenyaluranModel.js";

// Setup penyimpanan file menggunakan multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {

    const idDtt = req.body.id_dtt;

    const folderPath = path.join('uploads', 'penyaluran', '1', 'DTT', idDtt);

    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    cb(null, folderPath);
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now().toString().slice(-8); // Ambil 8 digit timestamp terakhir
    const originalName = path.parse(file.originalname).name; // Nama asli tanpa ekstensi
    const extension = path.extname(file.originalname); // Ambil ekstensi file
    const idDtt = req.body.id_dtt || 'default'; // Ambil id_dtt dari body (default jika tidak ada)
    cb(null, `${idDtt}_${originalName}_${timestamp}${extension}`); // Format: id_dtt-nama_asli-timestamp.ext
  }
});

// Middleware upload menggunakan multer untuk menangani dua file
const upload = multer({ storage: storage });

// Controller untuk menambahkan penyaluran
export const addJanuariPenyaluran = async (req, res) => {
  const { file_ktp, file_kpm } = req.files;

  // Periksa apakah kedua file ada
  if (!file_ktp || !file_kpm) {
    return res.status(400).send('Both file_ktp and file_kpm are required.');
  }

  try {
    // Panggil model untuk menambahkan data penyaluran
    const result = await JanuariPenyaluranModel.addJanuariPenyaluran({
      id_dtt: req.body.id_dtt,
      id_kpm: req.body.id_kpm,
      jenis_penyaluran: req.body.jenis_penyaluran,
      file_ktp: file_ktp,
      file_kpm: file_kpm,
      id_user: req.body.id_user,
      tanggal_penyaluran: req.body.tanggal_penyaluran,
      waktu_penyaluran: req.body.waktu_penyaluran,
      nik_perwakilan: req.body.nik_perwakilan,
      nama_perwakilan: req.body.nama_perwakilan,
      alamat_perwakilan: req.body.alamat_perwakilan,
      nik_pengganti: req.body.nik_pengganti,
      nama_pengganti: req.body.nama_pengganti,
      alamat_pengganti: req.body.alamat_pengganti,
      keterangan_perwakilan: req.body.keterangan_perwakilan,
      keterangan_pergantian: req.body.keterangan_pergantian,
    });

    res.status(200).send({
      message: 'Penyaluran added successfully!',
      result,
    });
  } catch (error) {
    console.error('Error adding Januari Penyaluran:', error);
    res.status(500).send('Error saving data to database.');
  }
};

export { upload };