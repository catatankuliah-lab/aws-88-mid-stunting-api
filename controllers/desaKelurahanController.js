import DesaKelurahan from "../models/DesaKelurahanModel.js";

export const getAllDesaKelurahan = async (req, res) => {
  try {
    const desaKelurahan = await DesaKelurahan.getAllDesaKelurahan();
    res.status(200).json({
      status: "success",
      data: desaKelurahan,
      message: "Desa/Kelurahan fetched successfully.",
    });
  } catch (error) {
    console.error("Error fetching desa/kelurahan:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

export const getDesaKelurahanByIdKecamatan = async (req, res) => {
  const { id_kecamatan } = req.params;

  try {
    const desaKelurahan = await DesaKelurahan.getDesaKelurahanByIdKecamatan(
      id_kecamatan
    );
    if (desaKelurahan.length > 0) {
      res.status(200).json({
        status: "success",
        data: desaKelurahan,
        message: "Desa/Kelurahan fetched successfully.",
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "No Desa/Kelurahan found for the given Kecamatan ID.",
      });
    }
  } catch (error) {
    console.error("Error fetching desa/kelurahan by Kecamatan ID:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};
