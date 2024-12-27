import JanuariLogDoModel from "../models/JanuariLogDoModel.js";

export const getAllJanuariLogDo = async (req, res) => {
  try {
    const logItems = await JanuariLogDoModel.getAllJanuariLogDo();
    res.status(200).json({
      status: "success",
      data: logItems,
      message: "Januari Log DO fetched successfully.",
    });
  } catch (error) {
    console.error("Error fetching Januari Log DO:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

export const getJanuariLogDoByIdDo = async (req, res) => {
  const { id_do } = req.params;

  try {
    const logItems = await JanuariLogDoModel.getJanuariLogDoByIdDo(id_do);
    if (logItems.length > 0) {
      res.status(200).json({
        status: "success",
        data: logItems,
        message: "Januari Log DO by ID fetched successfully.",
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "No Januari Log DO found for the given ID.",
      });
    }
  } catch (error) {
    console.error("Error fetching Januari Log DO by ID:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

export const getJanuariLogDoByIdUser = async (req, res) => {
  const { id_user } = req.params;

  try {
    const logItems = await JanuariLogDoModel.getJanuariLogDoByIdUser(id_user);
    if (logItems.length > 0) {
      res.status(200).json({
        status: "success",
        data: logItems,
        message: "Januari Log DO by User ID fetched successfully.",
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "No Januari Log DO found for the given User ID.",
      });
    }
  } catch (error) {
    console.error("Error fetching Januari Log DO by User ID:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

export const addJanuariLogDo = async (req, res) => {
  const { id_do, id_user, tanggal_perubahan, kategori } = req.body;

  try {
    const result = await JanuariLogDoModel.addJanuariLogDo({
      id_do,
      id_user,
      tanggal_perubahan,
      kategori,
    });
    res.status(201).json({
      status: "success",
      data: result,
      message: "Januari Log DO added successfully.",
    });
  } catch (error) {
    console.error("Error adding Januari Log DO:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};
