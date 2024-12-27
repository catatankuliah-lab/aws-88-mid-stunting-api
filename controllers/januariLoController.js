import JanuariLo from "../models/JanuariLoModel.js";

// Mendapatkan semua data Januari LO
export const getAllJanuariLo = async (req, res) => {
  try {
    const januariLo = await JanuariLo.getAllJanuariLo();
    res.status(200).json({
      status: "success",
      data: januariLo,
      message: "Januari LO fetched successfully.",
    });
  } catch (error) {
    console.error("Error fetching Januari LO:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

// Mendapatkan data Januari LO berdasarkan ID alokasi
export const getJanuariLoByIdAlokasi = async (req, res) => {
  const { id_alokasi } = req.params;

  try {
    const januariLo = await JanuariLo.getJanuariLoByIdAlokasi(id_alokasi);
    if (januariLo.length > 0) {
      res.status(200).json({
        status: "success",
        data: januariLo,
        message: "Januari LO by Alokasi fetched successfully.",
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "No Januari LO found for the given Alokasi ID.",
      });
    }
  } catch (error) {
    console.error("Error fetching Januari LO by Alokasi ID:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

// Mendapatkan data Januari LO berdasarkan ID LO
export const getJanuariLoByIdLO = async (req, res) => {
  const { id_lo } = req.params;

  try {
    const januariLo = await JanuariLo.getJanuariLoByIdLO(id_lo);
    if (januariLo.length > 0) {
      res.status(200).json({
        status: "success",
        data: januariLo[0],
        message: "Januari LO by LO fetched successfully.",
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "No Januari LO found for the given LO ID.",
      });
    }
  } catch (error) {
    console.error("Error fetching Januari LO by LO ID:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

// Mendapatkan data Januari LO berdasarkan ID Gudang
export const getJanuariLoByIdGudang = async (req, res) => {
  const { id_gudang } = req.params;

  try {
    const januariLo = await JanuariLo.getJanuariLoByIdGudang(id_gudang);
    if (januariLo.length > 0) {
      res.status(200).json({
        status: "success",
        data: januariLo,
        message: "Januari LO by Gudang fetched successfully.",
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "No Januari LO found for the given Gudang ID.",
      });
    }
  } catch (error) {
    console.error("Error fetching Januari LO by Gudang ID:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

// Menambahkan data Januari LO baru
export const addJanuariLo = async (req, res) => {
  const {
    id_alokasi,
    id_do,
    id_gudang,
    nomor_lo,
    nomor_so,
    tanggal_lo,
    nama_driver,
    telpon_driver,
    nopol,
    pic,
    checker,
    file_lo,
    status_lo
  } = req.body;

  try {
    const result = await JanuariLo.addJanuariLo({
      id_alokasi,
      id_do,
      id_gudang,
      nomor_lo,
      nomor_so,
      tanggal_lo,
      nama_driver,
      telpon_driver,
      nopol,
      pic,
      checker,
      file_lo,
      status_lo
    });
    res.status(201).json({
      status: "success",
      data: result,
      message: "Januari LO added successfully.",
    });
  } catch (error) {
    console.error("Error adding Januari LO:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

// Memperbarui data Januari LO berdasarkan id_lo
export const updateJanuariLo = async (req, res) => {
  const { id_lo } = req.params;
  const {
    id_alokasi,
    id_do,
    nomor_lo,
    tanggal_lo,
    nama_driver,
    telpon_driver,
    nopol,
    pic,
    checker,
    file_lo,
    jam_berangkat,
    foto_berangkat,
    status_lo,
  } = req.body;

  try {
    const result = await JanuariLo.updateJanuariLo(id_lo, {
      id_alokasi,
      id_do,
      nomor_lo,
      tanggal_lo,
      nama_driver,
      telpon_driver,
      nopol,
      pic,
      checker,
      file_lo,
      jam_berangkat,
      foto_berangkat,
      status_lo,
    });

    if (result.affectedRows > 0) {
      res.status(200).json({
        status: "success",
        message: "Januari LO updated successfully.",
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "Januari LO not found for the given ID.",
      });
    }
  } catch (error) {
    console.error("Error updating Januari LO:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

export const countJanuariLOByGudang = async (req, res) => {
  const { id_gudang } = req.params;

  try {
    const totalLO = await JanuariLo.countJanuariLOByGudang(id_gudang);
    res.json({
      id_gudang: id_gudang,
      totalLO: totalLO,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPaginatedJanuariLOGudang = async (req, res) => {
  const { page = 1, limit = 10, } = req.query;
  const { id_gudang } = req.params;

  try {
    const { data, total } = await JanuariLo.getPaginatedJanuariLOGudang(
      parseInt(page),
      parseInt(limit),
      parseInt(id_gudang)
    );

    res.json({
      data,
      currentPage: parseInt(page),
      limit: parseInt(limit),
      totalData: total,
      totalPages: Math.ceil(total / parseInt(limit)),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
