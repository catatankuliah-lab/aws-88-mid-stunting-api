import JanuariDoModel from "../models/JanuariDoModel.js";

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
  const { id_alokasi, id_kantor, id_gudang, nomor_do, tanggal_do, status_do } =
    req.body;
  const file_do = req.file.filename;
  try {
    const result = await JanuariDoModel.addJanuariDo({
      id_alokasi,
      id_kantor,
      id_gudang,
      nomor_do,
      tanggal_do,
      file_do,
      status_do,
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
