import JanuariLogItemSptjm from "../models/JanuariLogItemSptjmModel.js";

// Mendapatkan semua data log Januari Item SPTJM
export const getAllJanuariLogItemSptjm = async (req, res) => {
  try {
    const logItems = await JanuariLogItemSptjm.getAllJanuariLogItemSptjm();
    res.status(200).json({
      status: "success",
      data: logItems,
      message: "Januari Log Item SPTJM fetched successfully.",
    });
  } catch (error) {
    console.error("Error fetching Januari Log Item SPTJM:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

// Mendapatkan data log Januari Item SPTJM berdasarkan ID Item SPTJM
export const getJanuariLogItemSptjmByIdItemSptjm = async (req, res) => {
  const { id_item_sptjm } = req.params;

  try {
    const logItems =
      await JanuariLogItemSptjm.getJanuariLogItemSptjmByIdItemSptjm(
        id_item_sptjm
      );
    if (logItems.length > 0) {
      res.status(200).json({
        status: "success",
        data: logItems,
        message: "Januari Log Item SPTJM by ID fetched successfully.",
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "No Januari Log Item SPTJM found for the given ID.",
      });
    }
  } catch (error) {
    console.error("Error fetching Januari Log Item SPTJM by ID:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

// Mendapatkan data log Januari Item SPTJM berdasarkan ID User
export const getJanuariLogItemSptjmByIdUser = async (req, res) => {
  const { id_user } = req.params;

  try {
    const logItems = await JanuariLogItemSptjm.getJanuariLogItemSptjmByIdUser(
      id_user
    );
    if (logItems.length > 0) {
      res.status(200).json({
        status: "success",
        data: logItems,
        message: "Januari Log Item SPTJM by User ID fetched successfully.",
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "No Januari Log Item SPTJM found for the given User ID.",
      });
    }
  } catch (error) {
    console.error("Error fetching Januari Log Item SPTJM by User ID:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

// Menambahkan data log Januari Item SPTJM
export const addJanuariLogItemSptjm = async (req, res) => {
  const { id_item_sptjm, id_user, tanggal_perubahan, kategori } = req.body;

  try {
    const result = await JanuariLogItemSptjm.addJanuariLogItemSptjm({
      id_item_sptjm,
      id_user,
      tanggal_perubahan,
      kategori,
    });
    res.status(201).json({
      status: "success",
      data: result,
      message: "Januari Log Item SPTJM added successfully.",
    });
  } catch (error) {
    console.error("Error adding Januari Log Item SPTJM:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};
