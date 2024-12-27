import Kantor from "../models/KantorModel.js";

export const getAllKantors = async (req, res) => {
  try {
    const kantors = await Kantor.getAllKantors();
    res.status(200).json({
      status: "success",
      data: kantors,
      message: "Kantors retrieved successfully.",
    });
  } catch (error) {
    console.error("Error fetching kantors:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};
