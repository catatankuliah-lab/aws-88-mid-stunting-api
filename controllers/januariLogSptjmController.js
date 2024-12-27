import JanuariLogSptjm from "../models/JanuariLogSptjmModel.js";

// Mendapatkan semua data log Januari SPTJM
export const getAllJanuariLogSptjm = async (req, res) => {
  try {
    const logItems = await JanuariLogSptjm.getAllJanuariLogSptjm();
    res.status(200).json({
      status: "success",
      data: logItems,
      message: "Januari Log SPTJM fetched successfully.",
    });
  } catch (error) {
    console.error("Error fetching Januari Log SPTJM:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

// Mendapatkan data log Januari SPTJM berdasarkan ID SPTJM
export const getJanuariLogSptjmByIdSptjm = async (req, res) => {
  const { id_sptjm } = req.params;

  try {
    const logItems = await JanuariLogSptjm.getJanuariLogSptjmByIdSptjm(
      id_sptjm
    );
    if (logItems.length > 0) {
      res.status(200).json({
        status: "success",
        data: logItems,
        message: "Januari Log SPTJM by ID fetched successfully.",
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "No Januari Log SPTJM found for the given ID.",
      });
    }
  } catch (error) {
    console.error("Error fetching Januari Log SPTJM by ID:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

// Mendapatkan data log Januari SPTJM berdasarkan ID User
export const getJanuariLogSptjmByIdUser = async (req, res) => {
  const { id_user } = req.params;

  try {
    const logItems = await JanuariLogSptjm.getJanuariLogSptjmByIdUser(id_user);
    if (logItems.length > 0) {
      res.status(200).json({
        status: "success",
        data: logItems,
        message: "Januari Log SPTJM by User ID fetched successfully.",
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "No Januari Log SPTJM found for the given User ID.",
      });
    }
  } catch (error) {
    console.error("Error fetching Januari Log SPTJM by User ID:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

// Menambahkan data log Januari SPTJM
export const addJanuariLogSptjm = async (req, res) => {
  const { id_sptjm, id_user, tanggal_perubahan, kategori } = req.body;

  try {
    const result = await JanuariLogSptjm.addJanuariLogSptjm({
      id_sptjm,
      id_user,
      tanggal_perubahan,
      kategori,
    });
    res.status(201).json({
      status: "success",
      data: result,
      message: "Januari Log SPTJM added successfully.",
    });
  } catch (error) {
    console.error("Error adding Januari Log SPTJM:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};
