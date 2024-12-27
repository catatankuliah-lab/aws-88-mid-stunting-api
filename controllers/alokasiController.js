import Alokasi from "../models/AlokasiModel.js";

export const getAllAlokasi = async (req, res) => {
  try {
    const alokasi = await Alokasi.getAllAlokasi();
    res.status(200).json({
      status: "success",
      data: alokasi,
      message: "Alokasi retrieved successfully.",
    });
  } catch (error) {
    console.error("Error fetching alokasi:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};
