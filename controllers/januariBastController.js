import JanuariBast from "../models/JanuariBastModel.js";

// Mendapatkan semua data Januari Bast
export const getAllJanuariBast = async (req, res) => {
  try {
    const januariBast = await JanuariBast.getAllJanuariBast();
    res.status(200).json({
      status: "success",
      data: januariBast,
      message: "Januari Bast fetched successfully.",
    });
  } catch (error) {
    console.error("Error fetching Januari Bast:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

// Mendapatkan data Januari Bast berdasarkan ID Bast
export const getJanuariBastByIdBast = async (req, res) => {
  const { id_bast } = req.params;

  try {
    const januariBast = await JanuariBast.getJanuariBastByIdBast(id_bast);
    if (januariBast.length > 0) {
      res.status(200).json({
        status: "success",
        data: januariBast,
        message: "Januari Bast by Bast ID fetched successfully.",
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "No Januari Bast found for the given Bast ID.",
      });
    }
  } catch (error) {
    console.error("Error fetching Januari Bast by Bast ID:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

// Mendapatkan data Januari Bast berdasarkan ID Alokasi
export const getJanuariBastByIdAlokasi = async (req, res) => {
  const { id_alokasi } = req.params;

  try {
    const januariBast = await JanuariBast.getJanuariBastByIdAlokasi(id_alokasi);
    if (januariBast.length > 0) {
      res.status(200).json({
        status: "success",
        data: januariBast,
        message: "Januari Bast by Alokasi ID fetched successfully.",
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "No Januari Bast found for the given Alokasi ID.",
      });
    }
  } catch (error) {
    console.error("Error fetching Januari Bast by Alokasi ID:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

// Mendapatkan data Januari Bast berdasarkan ID DTT
export const getJanuariBastByIdDtt = async (req, res) => {
  const { id_dtt } = req.params;

  try {
    const januariBast = await JanuariBast.getJanuariBastByIdDtt(id_dtt);
    if (januariBast.length > 0) {
      res.status(200).json({
        status: "success",
        data: januariBast,
        message: "Januari Bast by DTT ID fetched successfully.",
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "No Januari Bast found for the given DTT ID.",
      });
    }
  } catch (error) {
    console.error("Error fetching Januari Bast by DTT ID:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

// Mendapatkan data Januari Bast berdasarkan ID KPM
export const getJanuariBastByIdKpm = async (req, res) => {
  const { id_kpm } = req.params;

  try {
    const januariBast = await JanuariBast.getJanuariBastByIdKpm(id_kpm);
    if (januariBast.length > 0) {
      res.status(200).json({
        status: "success",
        data: januariBast,
        message: "Januari Bast by KPM ID fetched successfully.",
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "No Januari Bast found for the given KPM ID.",
      });
    }
  } catch (error) {
    console.error("Error fetching Januari Bast by KPM ID:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

// Mendapatkan data Januari Bast berdasarkan ID Kantor
export const getJanuariBastByIdKantor = async (req, res) => {
  const { id_kantor } = req.params;

  try {
    const januariBast = await JanuariBast.getJanuariBastByIdKantor(id_kantor);
    if (januariBast.length > 0) {
      res.status(200).json({
        status: "success",
        data: januariBast,
        message: "Januari Bast by Kantor ID fetched successfully.",
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "No Januari Bast found for the given Kantor ID.",
      });
    }
  } catch (error) {
    console.error("Error fetching Januari Bast by Kantor ID:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

// Menambahkan data Januari Bast baru
export const addJanuariBast = async (req, res) => {
  const {
    kode_bast,
    id_alokasi,
    id_dtt,
    id_kpm,
    foto_ktp,
    foto_penyerahan,
    status_bast,
  } = req.body;

  try {
    const result = await JanuariBast.addJanuariBast({
      kode_bast,
      id_alokasi,
      id_dtt,
      id_kpm,
      foto_ktp,
      foto_penyerahan,
      status_bast,
    });
    res.status(201).json({
      status: "success",
      data: result,
      message: "Januari Bast added successfully.",
    });
  } catch (error) {
    console.error("Error adding Januari Bast:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

// Memperbarui data Januari Bast berdasarkan ID Bast
export const updateJanuariBast = async (req, res) => {
  const { id_bast } = req.params;
  const {
    kode_bast,
    id_alokasi,
    id_dtt,
    id_kpm,
    foto_ktp,
    foto_penyerahan,
    status_bast,
  } = req.body;

  try {
    const result = await JanuariBast.updateJanuariBast(id_bast, {
      kode_bast,
      id_alokasi,
      id_dtt,
      id_kpm,
      foto_ktp,
      foto_penyerahan,
      status_bast,
    });

    if (result.affectedRows > 0) {
      res.status(200).json({
        status: "success",
        message: "Januari Bast updated successfully.",
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "Januari Bast not found for the given ID.",
      });
    }
  } catch (error) {
    console.error("Error updating Januari Bast:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};
