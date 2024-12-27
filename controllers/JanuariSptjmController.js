import JanuariSptjm from "../models/JanuariSptjmModel.js";

// Mendapatkan semua data Januari SPTJM
export const getAllJanuariSptjm = async (req, res) => {
  try {
    const januariSptjm = await JanuariSptjm.getAllJanuariSptjm();
    res.status(200).json({
      status: "success",
      data: januariSptjm,
      message: "Januari SPTJM fetched successfully.",
    });
  } catch (error) {
    console.error("Error fetching Januari SPTJM:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

// Mendapatkan data Januari SPTJM berdasarkan ID SPTJM
export const getJanuariSptjmByIdSptjm = async (req, res) => {
  const { id_sptjm } = req.params;

  try {
    const januariSptjm = await JanuariSptjm.getJanuariSptjmById(id_sptjm);
    if (januariSptjm.length > 0) {
      res.status(200).json({
        status: "success",
        data: januariSptjm,
        message: "Januari SPTJM by SPTJM ID fetched successfully.",
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "No Januari SPTJM found for the given SPTJM ID.",
      });
    }
  } catch (error) {
    console.error("Error fetching Januari SPTJM by SPTJM ID:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

// Mendapatkan data Januari SPTJM berdasarkan ID Kantor
export const getJanuariSptjmByIdKantor = async (req, res) => {
  const { id_kantor } = req.params;

  try {
    const januariSptjm = await JanuariSptjm.getJanuariSptjmByIdKantor(
      id_kantor
    );
    if (januariSptjm.length > 0) {
      res.status(200).json({
        status: "success",
        data: januariSptjm,
        message: "Januari SPTJM by Kantor ID fetched successfully.",
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "No Januari SPTJM found for the given Kantor ID.",
      });
    }
  } catch (error) {
    console.error("Error fetching Januari SPTJM by Kantor ID:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

// Mendapatkan data Januari SPTJM berdasarkan ID Desa/Kelurahan
export const getJanuariSptjmByIdDesakelurahan = async (req, res) => {
  const { id_desa_kelurahan } = req.params;

  try {
    const januariSptjm = await JanuariSptjm.getJanuariSptjmByIdDesakelurahan(
      id_desa_kelurahan
    );
    if (januariSptjm.length > 0) {
      res.status(200).json({
        status: "success",
        data: januariSptjm,
        message: "Januari SPTJM by Desa/Kelurahan ID fetched successfully.",
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "No Januari SPTJM found for the given Desa/Kelurahan ID.",
      });
    }
  } catch (error) {
    console.error("Error fetching Januari SPTJM by Desa/Kelurahan ID:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

// Menambahkan data Januari SPTJM baru
export const addJanuariSptjm = async (req, res) => {
  const { id_penyaluran, kode_sptjm } = req.body;

  try {
    const result = await JanuariSptjm.addJanuariSptjm({
      id_penyaluran,
      kode_sptjm
    });
    res.status(201).json({
      status: "success",
      data: result,
      message: "Januari SPTJM added successfully.",
    });
  } catch (error) {
    console.error("Error adding Januari SPTJM:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

// Memperbarui data Januari SPTJM berdasarkan ID
export const updateJanuariSptjm = async (req, res) => {
  const { id_sptjm } = req.params;
  const { id_penyaluran, kode_sptjm } = req.body;

  try {
    const result = await JanuariSptjm.updateJanuariSptjm(id_sptjm, {
      id_penyaluran,
      id_alokasi,
      kode_sptjm,
      file_sptjm,
      status_sptjm,
    });

    if (result.affectedRows > 0) {
      res.status(200).json({
        status: "success",
        message: "Januari SPTJM updated successfully.",
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "Januari SPTJM not found for the given ID.",
      });
    }
  } catch (error) {
    console.error("Error updating Januari SPTJM:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};
