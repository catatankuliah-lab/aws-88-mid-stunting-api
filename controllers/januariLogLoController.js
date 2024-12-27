import JanuariLogLo from "../models/JanuariLogLoModel.js";

// Mendapatkan semua data log Januari LO
export const getAllJanuariLogLo = async (req, res) => {
  try {
    const logItems = await JanuariLogLo.getAllJanuariLogLo();
    res.status(200).json({
      status: "success",
      data: logItems,
      message: "Januari Log LO fetched successfully.",
    });
  } catch (error) {
    console.error("Error fetching Januari Log LO:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

// Mendapatkan data log Januari LO berdasarkan ID LO
export const getJanuariLogLoByIdLo = async (req, res) => {
  const { id_lo } = req.params;

  try {
    const logItems = await JanuariLogLo.getJanuariLogLoByIdLo(id_lo);
    if (logItems.length > 0) {
      res.status(200).json({
        status: "success",
        data: logItems,
        message: "Januari Log LO by ID fetched successfully.",
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "No Januari Log LO found for the given ID.",
      });
    }
  } catch (error) {
    console.error("Error fetching Januari Log LO by ID:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

// Mendapatkan data log Januari LO berdasarkan ID User
export const getJanuariLogLoByIdUser = async (req, res) => {
  const { id_user } = req.params;

  try {
    const logItems = await JanuariLogLo.getJanuariLogLoByIdUser(id_user);
    if (logItems.length > 0) {
      res.status(200).json({
        status: "success",
        data: logItems,
        message: "Januari Log LO by User ID fetched successfully.",
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "No Januari Log LO found for the given User ID.",
      });
    }
  } catch (error) {
    console.error("Error fetching Januari Log LO by User ID:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

// Menambahkan data log Januari LO
export const addJanuariLogLo = async (req, res) => {
  const { id_lo, id_user, tanggal_perubahan, kategori } = req.body;

  try {
    const result = await JanuariLogLo.addJanuariLogLo({
      id_lo,
      id_user,
      tanggal_perubahan,
      kategori,
    });
    res.status(201).json({
      status: "success",
      data: result,
      message: "Januari Log LO added successfully.",
    });
  } catch (error) {
    console.error("Error adding Januari Log LO:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};
