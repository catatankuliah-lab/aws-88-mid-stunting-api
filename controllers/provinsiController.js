import Provinsi from "../models/ProvinsiModel.js";

export const getAllProvinsi = async (req, res) => {
  try {
    const provinsi = await Provinsi.getAllProvinsi();
    res.status(200).json({
      status: "success",
      data: provinsi,
      message: "Provinsi retrieved successfully.",
    });
  } catch (error) {
    console.error("Error fetching provinsi:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};
