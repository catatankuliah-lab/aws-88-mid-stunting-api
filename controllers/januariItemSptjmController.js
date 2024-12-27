import JanuariItemSptjm from "../models/JanuariItemSptjmModel.js";

// Mendapatkan semua data Januari Item SPTJM
export const getAllJanuariItemSptjm = async (req, res) => {
  try {
    const januariItemSptjm = await JanuariItemSptjm.getAllJanuariItemSptjm();
    res.status(200).json({
      status: "success",
      data: januariItemSptjm,
      message: "Januari Item SPTJM fetched successfully.",
    });
  } catch (error) {
    console.error("Error fetching Januari Item SPTJM:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

export const getJanuariItemSptjmByIdItemSptjm = async (req, res) => {
  const { id_item_sptjm } = req.params;

  try {
    const januariItemSptjm =
      await JanuariItemSptjm.getJanuariItemSptjmByIdItemSptjm(id_item_sptjm);
    if (januariItemSptjm.length > 0) {
      res.status(200).json({
        status: "success",
        data: januariItemSptjm,
        message: "Januari Item SPTJM by ID fetched successfully.",
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "No Januari Item SPTJM found for the given  ID.",
      });
    }
  } catch (error) {
    console.error("Error fetching Januari Item SPTJM by  ID:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

// Mendapatkan data Januari Item SPTJM berdasarkan ID KPM
export const getJanuariItemSptjmByIdKpm = async (req, res) => {
  const { id_kpm } = req.params;

  try {
    const januariItemSptjm = await JanuariItemSptjm.getJanuariItemSptjmByIdKpm(
      id_kpm
    );
    if (januariItemSptjm.length > 0) {
      res.status(200).json({
        status: "success",
        data: januariItemSptjm,
        message: "Januari Item SPTJM by KPM ID fetched successfully.",
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "No Januari Item SPTJM found for the given KPM ID.",
      });
    }
  } catch (error) {
    console.error("Error fetching Januari Item SPTJM by KPM ID:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

// Mendapatkan data Januari Item SPTJM berdasarkan ID Desa/Kelurahan
// export const getJanuariItemSptjmByIdDesaKelurahan = async (req, res) => {
//   const { id_desa_kelurahan } = req.params;

//   try {
//     const januariItemSptjm =
//       await JanuariItemSptjm.getJanuariItemSptjmByIdDesaKelurahan(
//         id_desa_kelurahan
//       );
//     if (januariItemSptjm.length > 0) {
//       res.status(200).json({
//         status: "success",
//         data: januariItemSptjm,
//         message:
//           "Januari Item SPTJM by Desa/Kelurahan ID fetched successfully.",
//       });
//     } else {
//       res.status(404).json({
//         status: "error",
//         message: "No Januari Item SPTJM found for the given Desa/Kelurahan ID.",
//       });
//     }
//   } catch (error) {
//     console.error(
//       "Error fetching Januari Item SPTJM by Desa/Kelurahan ID:",
//       error
//     );
//     res.status(500).json({
//       status: "error",
//       message: "Internal Server Error",
//     });
//   }
// };

// Menambahkan data Januari Item SPTJM baru
export const addJanuariItemSptjm = async (req, res) => {
  const { id_sptjm, id_kpm, nik_pengganti, nama_pengganti, alamat_pengganti } =
    req.body;

  try {
    const result = await JanuariItemSptjm.addJanuariItemSptjm({
      id_sptjm,
      id_kpm,
      nik_pengganti,
      nama_pengganti,
      alamat_pengganti,
    });
    res.status(201).json({
      status: "success",
      data: result,
      message: "Januari Item SPTJM added successfully.",
    });
  } catch (error) {
    console.error("Error adding Januari Item SPTJM:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

// Memperbarui data Januari Item SPTJM berdasarkan ID Item SPTJM
export const updateJanuariItemSptjm = async (req, res) => {
  const { id_item_sptjm } = req.params;
  const { id_sptjm, id_kpm, nik_pengganti, nama_pengganti, alamat_pengganti } =
    req.body;

  try {
    const result = await JanuariItemSptjm.updateJanuariItemSptjm(
      id_item_sptjm,
      {
        id_sptjm,
        id_kpm,
        nik_pengganti,
        nama_pengganti,
        alamat_pengganti,
      }
    );

    if (result.affectedRows > 0) {
      res.status(200).json({
        status: "success",
        message: "Januari Item SPTJM updated successfully.",
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "Januari Item SPTJM not found for the given ID.",
      });
    }
  } catch (error) {
    console.error("Error updating Januari Item SPTJM:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};
