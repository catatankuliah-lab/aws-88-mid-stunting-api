import Kecamatan from "../models/KecamatanModel.js";

export const getAllKecamatan = async (req, res) => {
  try {
    const kecamatan = await Kecamatan.getAllKecamatan();
    res.status(200).json({
      status: "success",
      data: kecamatan,
      message: "Kecamatan fetched successfully.",
    });
  } catch (error) {
    console.error("Error fetching kecamatan:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

export const getKecamatanByIdKabupatenKota = async (req, res) => {
  const { id_kabupaten_kota } = req.params;

  try {
    const kecamatan = await Kecamatan.getKecamatanByIdKabupatenKota(
      id_kabupaten_kota
    );
    if (kecamatan.length > 0) {
      res.status(200).json({
        status: "success",
        data: kecamatan,
        message: "Kecamatan fetched successfully.",
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "No Kecamatan found for the given Kabupaten/Kota ID.",
      });
    }
  } catch (error) {
    console.error("Error fetching kecamatan by Kabupaten/Kota ID:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};
