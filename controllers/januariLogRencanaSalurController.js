import JanuariLogRencanaSalur from "../models/JanuariLogRencanaSalurModel.js";

// Mengambil semua data log Januari Rencana Salur
export const getAllJanuariLogRencanaSalur = async (req, res) => {
  try {
    const logRencanaSalur =
      await JanuariLogRencanaSalur.getAllJanuariLogRencanaSalur();
    res.status(200).json({
      status: "success",
      data: logRencanaSalur,
      message: "All Januari Log Rencana Salur fetched successfully.",
    });
  } catch (error) {
    console.error("Error fetching all Januari Log Rencana Salur:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

// Mengambil log berdasarkan ID Rencana Salur
export const getJanuariLogRencanaSalurByIdRencanaSalur = async (req, res) => {
  const { id_rencana_salur } = req.params;

  try {
    const logRencanaSalur =
      await JanuariLogRencanaSalur.getJanuariLogRencanaSalurByIdRencanaSalur(
        id_rencana_salur
      );

    if (logRencanaSalur.length > 0) {
      res.status(200).json({
        status: "success",
        data: logRencanaSalur,
        message:
          "Januari Log Rencana Salur by Rencana Salur ID fetched successfully.",
      });
    } else {
      res.status(404).json({
        status: "error",
        message:
          "No Januari Log Rencana Salur found for the given Rencana Salur ID.",
      });
    }
  } catch (error) {
    console.error(
      "Error fetching Januari Log Rencana Salur by Rencana Salur ID:",
      error
    );
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

// Mengambil log berdasarkan ID User
export const getJanuariLogRencanaSalurByIdUser = async (req, res) => {
  const { id_user } = req.params;

  try {
    const logRencanaSalur =
      await JanuariLogRencanaSalur.getJanuariLogRencanaSalurByIdUser(id_user);

    if (logRencanaSalur.length > 0) {
      res.status(200).json({
        status: "success",
        data: logRencanaSalur,
        message: "Januari Log Rencana Salur by User ID fetched successfully.",
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "No Januari Log Rencana Salur found for the given User ID.",
      });
    }
  } catch (error) {
    console.error(
      "Error fetching Januari Log Rencana Salur by User ID:",
      error
    );
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

// Menambahkan log Januari Rencana Salur
export const addJanuariLogRencanaSalur = async (req, res) => {
  const { id_rencana_salur, id_user, tanggal_log, kategori } = req.body;

  try {
    const result = await JanuariLogRencanaSalur.addJanuariLogRencanaSalur({
      id_rencana_salur,
      id_user,
      tanggal_log,
      kategori,
    });

    res.status(201).json({
      status: "success",
      data: result,
      message: "Januari Log Rencana Salur added successfully.",
    });
  } catch (error) {
    console.error("Error adding Januari Log Rencana Salur:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

// Memperbarui log Januari Rencana Salur
export const updateJanuariLogRencanaSalur = async (req, res) => {
  const { id_log_rencana_salur } = req.params;
  const { id_rencana_salur, id_user, tanggal_log, kategori } = req.body;

  try {
    const result = await JanuariLogRencanaSalur.updateJanuariLogRencanaSalur(
      id_log_rencana_salur,
      { id_rencana_salur, id_user, tanggal_log, kategori }
    );

    if (result.affectedRows > 0) {
      res.status(200).json({
        status: "success",
        data: result,
        message: "Januari Log Rencana Salur updated successfully.",
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "No Januari Log Rencana Salur found with the given ID.",
      });
    }
  } catch (error) {
    console.error("Error updating Januari Log Rencana Salur:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};
