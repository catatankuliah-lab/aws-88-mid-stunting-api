import Gudang from "../models/GudangModel.js";

// Mendapatkan semua gudang
export const getAllGudang = async (req, res) => {
  try {
    const gudang = await Gudang.getAllGudang();
    res.status(200).json({
      status: "success",
      data: gudang,
      message: "Gudang fetched successfully.",
    });
  } catch (error) {
    console.error("Error fetching gudang:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

// Mendapatkan gudang berdasarkan ID kantor
export const getGudangByIdKantor = async (req, res) => {
  const { id_kantor } = req.params;

  try {
    const gudang = await Gudang.getGudangByIdKantor(id_kantor);
    if (gudang.length > 0) {
      res.status(200).json({
        status: "success",
        data: gudang,
        message: "Gudang fetched successfully.",
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "No Gudang found for the given Kantor ID.",
      });
    }
  } catch (error) {
    console.error("Error fetching gudang by Kantor ID:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};
