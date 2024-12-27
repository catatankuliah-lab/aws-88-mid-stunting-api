import JanuariLogItemRencanaSalur from "../models/JanuariLogItemRencanaSalurModel.js";

// Mengambil semua data log Januari Item Rencana Salur
export const getAllJanuariLogItemRencanaSalur = async (req, res) => {
  try {
    const logItemRencanaSalur =
      await JanuariLogItemRencanaSalur.getAllJanuariLogItemRencanaSalur();
    res.status(200).json({
      status: "success",
      data: logItemRencanaSalur,
      message: "All Januari Log Item Rencana Salur fetched successfully.",
    });
  } catch (error) {
    console.error("Error fetching all Januari Log Item Rencana Salur:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

// Mengambil log berdasarkan ID Item Rencana Salur
export const getJanuariLogItemRencanaSalurByIdItemRencanaSalur = async (
  req,
  res
) => {
  const { id_item_rencana_salur } = req.params;

  try {
    const logItemRencanaSalur =
      await JanuariLogItemRencanaSalur.getJanuariLogItemRencanaSalurByIdItemRencanaSalur(
        id_item_rencana_salur
      );
    if (logItemRencanaSalur.length > 0) {
      res.status(200).json({
        status: "success",
        data: logItemRencanaSalur,
        message:
          "Januari Log Item Rencana Salur by Item Rencana Salur ID fetched successfully.",
      });
    } else {
      res.status(404).json({
        status: "error",
        message:
          "No Januari Log Item Rencana Salur found for the given Item Rencana Salur ID.",
      });
    }
  } catch (error) {
    console.error(
      "Error fetching Januari Log Item Rencana Salur by Item Rencana Salur ID:",
      error
    );
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

// Mengambil log berdasarkan ID User
export const getJanuariLogItemRencanaSalurByIdUser = async (req, res) => {
  const { id_user } = req.params;

  try {
    const logItemRencanaSalur =
      await JanuariLogItemRencanaSalur.getJanuariLogItemRencanaSalurByIdUser(
        id_user
      );
    if (logItemRencanaSalur.length > 0) {
      res.status(200).json({
        status: "success",
        data: logItemRencanaSalur,
        message:
          "Januari Log Item Rencana Salur by User ID fetched successfully.",
      });
    } else {
      res.status(404).json({
        status: "error",
        message:
          "No Januari Log Item Rencana Salur found for the given User ID.",
      });
    }
  } catch (error) {
    console.error(
      "Error fetching Januari Log Item Rencana Salur by User ID:",
      error
    );
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

// Menambahkan log item Januari Rencana Salur
export const addJanuariLogItemRencanaSalur = async (req, res) => {
  const { id_item_rencana_salur, id_user, tanggal_log, kategori } = req.body;

  try {
    const result =
      await JanuariLogItemRencanaSalur.addJanuariLogItemRencanaSalur({
        id_item_rencana_salur,
        id_user,
        tanggal_log,
        kategori,
      });

    res.status(201).json({
      status: "success",
      data: result,
      message: "Januari Log Item Rencana Salur added successfully.",
    });
  } catch (error) {
    console.error("Error adding Januari Log Item Rencana Salur:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

// Memperbarui log item Januari Rencana Salur
export const updateJanuariLogItemRencanaSalur = async (req, res) => {
  const { id_log_item_rencana_salur } = req.params;
  const { id_item_rencana_salur, id_user, tanggal_log, kategori } = req.body;

  try {
    const result =
      await JanuariLogItemRencanaSalur.updateJanuariLogItemRencanaSalur(
        id_log_item_rencana_salur,
        { id_item_rencana_salur, id_user, tanggal_log, kategori }
      );

    if (result.affectedRows > 0) {
      res.status(200).json({
        status: "success",
        data: result,
        message: "Januari Log Item Rencana Salur updated successfully.",
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "No Januari Log Item Rencana Salur found with the given ID.",
      });
    }
  } catch (error) {
    console.error("Error updating Januari Log Item Rencana Salur:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};
