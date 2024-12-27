import JanuariBastPengganti from "../models/JanuariBastPenggantiModel.js";

// Mendapatkan semua data Januari Bast Pengganti
export const getAllJanuariBastPengganti = async (req, res) => {
  try {
    const data = await JanuariBastPengganti.getAllJanuariBastPengganti();
    res.status(200).json({
      status: "success",
      data,
      message: "Data Januari Bast Pengganti fetched successfully.",
    });
  } catch (error) {
    console.error("Error fetching data Januari Bast Pengganti:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

// Mendapatkan data Januari Bast Pengganti berdasarkan ID Bast Pengganti
export const getJanuariBastPenggantiById = async (req, res) => {
  const { id_bast_pengganti } = req.params;

  try {
    const data = await JanuariBastPengganti.getJanuariBastPenggantiById(
      id_bast_pengganti
    );
    if (data.length > 0) {
      res.status(200).json({
        status: "success",
        data,
        message: "Data Januari Bast Pengganti fetched successfully.",
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "No data found for the given ID Bast Pengganti.",
      });
    }
  } catch (error) {
    console.error("Error fetching data by ID Bast Pengganti:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

// Mendapatkan data Januari Bast Pengganti berdasarkan ID Item SPTJM
export const getJanuariBastPenggantiByIdItemSptjm = async (req, res) => {
  const { id_item_sptjm } = req.params;

  try {
    const data =
      await JanuariBastPengganti.getJanuariBastPenggantiByIdItemSptjm(
        id_item_sptjm
      );
    if (data.length > 0) {
      res.status(200).json({
        status: "success",
        data,
        message:
          "Data Januari Bast Pengganti by ID Item SPTJM fetched successfully.",
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "No data found for the given ID Item SPTJM.",
      });
    }
  } catch (error) {
    console.error("Error fetching data by ID Item SPTJM:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

// Menambahkan data Januari Bast Pengganti baru
export const addJanuariBastPengganti = async (req, res) => {
  const {
    kode_bast_pengganti,
    id_item_sptjm,
    foto_ktp_pengganti,
    foto_penyerahan_pengganti,
    status_bast_pengganti,
  } = req.body;

  try {
    const result = await JanuariBastPengganti.addJanuariBastPengganti({
      kode_bast_pengganti,
      id_item_sptjm,
      foto_ktp_pengganti,
      foto_penyerahan_pengganti,
      status_bast_pengganti,
    });
    res.status(201).json({
      status: "success",
      data: result,
      message: "Data Januari Bast Pengganti added successfully.",
    });
  } catch (error) {
    console.error("Error adding data Januari Bast Pengganti:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

// Memperbarui data Januari Bast Pengganti berdasarkan ID Bast Pengganti
export const updateJanuariBastPengganti = async (req, res) => {
  const { id_bast_pengganti } = req.params;
  const {
    kode_bast_pengganti,
    id_item_sptjm,
    foto_ktp_pengganti,
    foto_penyerahan_pengganti,
    status_bast_pengganti,
  } = req.body;

  try {
    const result = await JanuariBastPengganti.updateJanuariBastPengganti(
      id_bast_pengganti,
      {
        kode_bast_pengganti,
        id_item_sptjm,
        foto_ktp_pengganti,
        foto_penyerahan_pengganti,
        status_bast_pengganti,
      }
    );

    if (result.affectedRows > 0) {
      res.status(200).json({
        status: "success",
        message: "Data Januari Bast Pengganti updated successfully.",
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "No data found for the given ID Bast Pengganti.",
      });
    }
  } catch (error) {
    console.error("Error updating data Januari Bast Pengganti:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};
