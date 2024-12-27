import JanuariRencanaSalur from "../models/JanuariRencanaSalurModel.js";

export const getAllJanuariRencanaSalur = async (req, res) => {
  
};

export const countJanuariRencanaSalurByKantor = async (req, res) => {
  const { id_kantor } = req.params;

  try {
    const totalRencanaSalur = await JanuariRencanaSalur.countJanuariRencanaSalurByKantor(id_kantor);
    res.json({
      id_kantor: id_kantor,
      totalRencanaSalur: totalRencanaSalur,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const insertRencanaSalurWithLog = async (req, res) => {
  const { id_alokasi, id_kantor, kode_rencana_salur, status_rencana_salur } = req.body.rencanaSalur;
  const { id_user, kategori } = req.body.logData;

  try {
    const result = await JanuariRencanaSalur.insertRencanaSalurWithLog(
      {
        id_alokasi,
        id_kantor,
        kode_rencana_salur,
        status_rencana_salur,
      },
      {
        id_user,
        kategori,
      }
    );

    res.status(201).json({
      message: "Rencana Salur and Log successfully inserted",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPaginatedJanuariRencanaSalur = async (req, res) => {
  const { page = 1, limit = 10, } = req.query;

  try {
    const { data, total } = await JanuariRencanaSalur.getPaginatedJanuariRencanaSalur(
      parseInt(page),
      parseInt(limit),
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

export const getPaginatedJanuariRencanaSalurKantor = async (req, res) => {
  const { page = 1, limit = 10, } = req.query;
  const { id_kantor } = req.params;

  try {
    const { data, total } = await JanuariRencanaSalur.getPaginatedJanuariRencanaSalurKantor(
      parseInt(page),
      parseInt(limit),
      parseInt(id_kantor)
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
