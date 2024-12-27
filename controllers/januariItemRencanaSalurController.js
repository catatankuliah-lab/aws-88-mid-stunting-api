import JanuariItemRencanaSalur from "../models/JanuariItemRencanaSalurModel.js";

export const getAllJanuariItemRencanaSalur = async (req, res) => {
  try {
    const itemRencanaSalur =
      await JanuariItemRencanaSalur.getAllJanuariItemRencanaSalur();
    res.status(200).json({
      status: "success",
      data: itemRencanaSalur,
      message: "Januari Item Rencana Salur fetched successfully.",
    });
  } catch (error) {
    console.error("Error fetching Januari Item Rencana Salur:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

export const getJanuariItemRencanaSalurByIdRencanaSalur = async (req, res) => {
  const { id_rencana_salur } = req.params;

  try {
    const itemRencanaSalur =
      await JanuariItemRencanaSalur.getJanuariItemRencanaSalurByIdRencanaSalur(
        id_rencana_salur
      );
    if (itemRencanaSalur.length > 0) {
      res.status(200).json({
        status: "success",
        data: itemRencanaSalur,
        message:
          "Januari Item Rencana Salur by Rencana Salur fetched successfully.",
      });
    } else {
      res.status(404).json({
        status: "error",
        message:
          "No Januari Item Rencana Salur found for the given Rencana Salur ID.",
      });
    }
  } catch (error) {
    console.error(
      "Error fetching Januari Item Rencana Salur by Rencana Salur ID:",
      error
    );
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

export const insertItemRencanaSalurWithLog = async (req, res) => {
  const { id_rencana_salur, id_alokasi, id_gudang, id_dtt, tanggal_rencana_salur, kategori} = req.body.rencanaSalur;
  const { id_user, kategori_item } = req.body.logData;

  try {
    const result = await JanuariItemRencanaSalur.insertItemRencanaSalurWithLog(
      {
        id_rencana_salur,
        id_alokasi,
        id_gudang,
        id_dtt,
        tanggal_rencana_salur,
        kategori
      },
      {
        id_user,
        kategori_item,
      }
    );

    res.status(201).json({
      message: "Item Rencana Salur and Log successfully inserted",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteItemRencanaSalurWithLog = async (req, res) => {
  const { id_item_rencana_salur, kategori} = req.body.rencanaSalur;
  const { id_item_rencana_salur_log, id_user, kategori_item } = req.body.logData;

  try {
    const result = await JanuariItemRencanaSalur.deleteItemRencanaSalurWithLog(
      {
        id_item_rencana_salur,
        kategori
      },
      {
        id_item_rencana_salur_log,
        id_user,
        kategori_item,
      }
    );
    res.status(200).json({
      message: "Item Rencana Salur and Log successfully inserted",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
