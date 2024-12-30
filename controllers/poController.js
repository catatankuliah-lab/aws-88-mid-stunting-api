import PO from "../models/POModels.js";

// Get all PO
export const getAllPO = async (req, res) => {
  try {
    const poList = await PO.getAllPO();
    res.status(200).json({
      status: "success",
      data: poList,
      message: "Purchase orders fetched successfully.",
    });
  } catch (error) {
    console.error("Error fetching purchase orders:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

// Get PO by ID
export const getPOById = async (req, res) => {
  const { id_po } = req.params;

  try {
    const po = await PO.getPOById(id_po);
    if (po) {
      res.status(200).json({
        status: "success",
        data: po,
        message: "Purchase order fetched successfully.",
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "Purchase order not found.",
      });
    }
  } catch (error) {
    console.error("Error fetching purchase order by ID:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

// Get PO by Kantor ID
export const getPOByIdKantor = async (req, res) => {
  const { id_kantor } = req.params;

  try {
    const poList = await PO.getPOByIdKantor(id_kantor);
    if (poList.length > 0) {
      res.status(200).json({
        status: "success",
        data: poList,
        message: "Purchase orders fetched successfully by Kantor ID.",
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "No purchase orders found for the given Kantor ID.",
      });
    }
  } catch (error) {
    console.error("Error fetching purchase orders by Kantor ID:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

// Add a new PO
export const addPO = async (req, res) => {
  const poData = req.body;

  try {
    const newPO = await PO.addPO(poData);
    res.status(201).json({
      status: "success",
      data: newPO,
      message: "Purchase order created successfully.",
    });
  } catch (error) {
    console.error("Error creating purchase order:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

// Update PO
export const updatePO = async (req, res) => {
  const { id_po } = req.params;
  const poData = req.body;

  try {
    const updatedPO = await PO.updatePO(id_po, poData);
    if (updatedPO) {
      res.status(200).json({
        status: "success",
        data: updatedPO,
        message: "Purchase order updated successfully.",
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "Purchase order not found.",
      });
    }
  } catch (error) {
    console.error("Error updating purchase order:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

// Delete PO
export const deletePO = async (req, res) => {
  const { id_po } = req.params;

  try {
    const deleted = await PO.deletePO(id_po);
    if (deleted) {
      res.status(200).json({
        status: "success",
        message: "Purchase order deleted successfully.",
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "Purchase order not found.",
      });
    }
  } catch (error) {
    console.error("Error deleting purchase order:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

// Filter PO by Alokasi, Kantor, and Date Range
export const getFilteredPO = async (req, res) => {
  const { id_alokasi, id_kantor, tanggal_awal, tanggal_akhir } = req.query;

  try {
    const filters = {};

    if (id_alokasi) {
      filters.id_alokasi = id_alokasi;
    }

    if (id_kantor) {
      filters.id_kantor = id_kantor;
    }

    if (tanggal_awal && tanggal_akhir) {
      filters.tanggal_po = {
        $gte: new Date(tanggal_awal),
        $lte: new Date(tanggal_akhir),
      };
    }

    const poList = await PO.getFilteredPO(filters);

    if (poList) {
      res.status(200).json({
        status: "success",
        data: poList,
        message: "Filtered purchase orders fetched successfully.",
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "No purchase orders found for the given filters.",
      });
    }
  } catch (error) {
    console.error("Error fetching filtered purchase orders:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};
