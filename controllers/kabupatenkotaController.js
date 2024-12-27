import KabupatenKota from "../models/KabupatenkotaModel.js";

export const getAllKabupatenKota = async (req, res) => {
  try {
    const kabupatenKota = await KabupatenKota.getAllKabupatenKota();
    res.status(200).json({
      status: "success",
      data: kabupatenKota,
      message: "Kabupaten/Kota fetched successfully.",
    });
  } catch (error) {
    console.error("Error fetching kabupaten/kota:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

export const getKabupatenKotaByIdProvinsi = async (req, res) => {
  const { id_provinsi } = req.params;

  try {
    const kabupatenKota = await KabupatenKota.getKabupatenKotaByIdProvinsi(
      id_provinsi
    );
    if (kabupatenKota) {
      res.status(200).json({
        status: "success",
        data: kabupatenKota,
        message: "Kabupaten/Kota fetched successfully.",
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "Kabupaten/Kota not found.",
      });
    }
  } catch (error) {
    console.error("Error fetching kabupaten/kota by ID:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};
