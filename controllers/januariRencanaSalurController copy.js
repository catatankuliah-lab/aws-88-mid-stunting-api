import JanuariRencanaSalur from "../models/JanuariRencanaSalurModel.js";

export const getAllJanuariRencanaSalur = async (req, res) => {
  const { page = 1, limit = 10, search = '' } = req.query;
  const offset = (page - 1) * limit;

  try {
    const data = await JanuariRencanaSalur.getAllJanuariRencanaSalur(
      parseInt(limit),
      offset
    );
    res.json({
      data: data,
      currentPage: parseInt(page),
      limit: parseInt(limit),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
