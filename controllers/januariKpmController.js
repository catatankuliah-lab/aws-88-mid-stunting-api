import JanuariKpm from "../models/JanuariKpmModel.js";

export const getAllJanuariKpm = async (req, res) => {
  try {
    const kpmData = await JanuariKpm.getAllJanuariKpm();
    res.status(200).json({
      status: "success",
      data: kpmData,
      message: "Januari KPM fetched successfully.",
    });
  } catch (error) {
    console.error("Error fetching Januari KPM:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

export const getJanuariKpmByIdJanuariDtt = async (req, res) => {
  const { page = 1, limit = 10, } = req.query;
  const { id_dtt } = req.params;

  try {
    const { data, total } = await JanuariKpm.getJanuariKpmByIdJanuariDtt(
      parseInt(page),
      parseInt(limit),
      parseInt(id_dtt)
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


export const getJanuariKpmByIdKPM = async (req, res) => {
  const { id_kpm } = req.params;

  try {
    const result = await JanuariKpm.getJanuariKpmByIdKPM(
      id_kpm
    );
    if (result.length > 0) {
      res.status(200).json({
        status: "success",
        data: result,
        message: "KPM fetched successfully.",
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "No KPM found for the given Kabupaten/Kota ID.",
      });
    }
  } catch (error) {
    console.error("Error fetching KPM by ID:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

export const getJanuariKpmDownload = async (req, res) => {
  const { id_dtt } = req.params;

  try {
    const { data, total } = await JanuariKpm.getJanuariKpmDownload(
      parseInt(id_dtt)
    );

    res.json({
      data,
      total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
