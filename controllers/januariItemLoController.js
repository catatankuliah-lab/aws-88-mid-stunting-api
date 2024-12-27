import JanuariItemLo from "../models/JanuariItemLoModel.js";

export const getAllJanuariItemLo = async (req, res) => {
  try {
    const itemLo = await JanuariItemLo.getAllJanuariItemLo();
    res.status(200).json({
      status: "success",
      data: itemLo,
      message: "Januari Item LO fetched successfully.",
    });
  } catch (error) {
    console.error("Error fetching Januari Item LO:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

export const getJanuariItemLoByIdLo = async (req, res) => {
  const { id_lo } = req.params;

  try {
    const itemLo = await JanuariItemLo.getJanuariItemLoByIdLo(id_lo);
    if (itemLo.length > 0) {
      res.status(200).json({
        status: "success",
        data: itemLo,
        message: "Januari Item LO by LO ID fetched successfully.",
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "No Januari Item LO found for the given LO ID.",
      });
    }
  } catch (error) {
    console.error("Error fetching Januari Item LO by LO ID:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

export const addJanuariItemLo = async (req, res) => {
  const { id_lo, nomor_item_lo, id_desa_kelurahan, tonase } =
    req.body;

  try {
    const result = await JanuariItemLo.addJanuariItemLo({
      id_lo,
      nomor_item_lo,
      id_desa_kelurahan,
      tonase,
    });
    res.status(201).json({
      status: "success",
      data: result,
      message: "Januari Item LO added successfully.",
    });
  } catch (error) {
    console.error("Error adding Januari Item LO:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

export const updateJanuariItemLo = async (req, res) => {
  const { id_item_lo } = req.params;
  const { id_lo, nomor_item_lo, id_desa_kelurahan, tonase, jam_datang } =
    req.body;

  try {
    const result = await JanuariItemLo.updateJanuariItemLo(id_item_lo, {
      id_lo,
      nomor_item_lo,
      id_desa_kelurahan,
      tonase,
      jam_datang,
    });
    if (result.affectedRows > 0) {
      res.status(200).json({
        status: "success",
        message: "Januari Item LO updated successfully.",
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "Januari Item LO not found for the given ID.",
      });
    }
  } catch (error) {
    console.error("Error updating Januari Item LO:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

export const deleteJanuariItemLo = async (req, res) => {
  const { id_item_lo } = req.params;

  try {
    const result = await JanuariItemLo.deleteJanuariItemLo(id_item_lo);
    if (result.affectedRows > 0) {
      res.status(200).json({
        status: "success",
        message: "Januari Item LO deleted successfully.",
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "Januari Item LO not found for the given ID.",
      });
    }
  } catch (error) {
    console.error("Error deleting Januari Item LO:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};
