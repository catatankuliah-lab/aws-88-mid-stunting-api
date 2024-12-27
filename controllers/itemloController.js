import ItemLO from "../models/itemloModels.js";

// Get all Item LOs
export const getAllItemLO = async (req, res) => {
  try {
    const itemLOs = await ItemLO.getAllItemLO();
    res.status(200).json({
      status: "success",
      data: itemLOs,
      message: "Item LOs fetched successfully."
    });
  } catch (error) {
    console.error("Error fetching item LOs:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error"
    });
  }
};

// Get Item LO by ID LO
export const getItemLOByIdLO = async (req, res) => {
  const { id_lo } = req.params;

  try {
    const itemLOs = await ItemLO.getItemLOByIdLO(id_lo);
    if (itemLOs.length > 0) {
      res.status(200).json({
        status: "success",
        data: itemLOs,
        message: "Item LOs fetched successfully by ID LO."
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "No Item LOs found for the given ID LO."
      });
    }
  } catch (error) {
    console.error("Error fetching item LOs by ID LO:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error"
    });
  }
};

// Get Item LO by ID Item LO
export const getItemLOById = async (req, res) => {
  const { id_item_lo } = req.params;

  try {
    const itemLO = await ItemLO.getItemLOById(id_item_lo);
    if (itemLO) {
      res.status(200).json({
        status: "success",
        data: itemLO,
        message: "Item LO fetched successfully by ID Item LO."
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "Item LO not found."
      });
    }
  } catch (error) {
    console.error("Error fetching item LO by ID Item LO:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error"
    });
  }
};

// Add a new Item LO
export const addItemLO = async (req, res) => {
  const itemLOData = req.body;

  try {
    const newItemLO = await ItemLO.addItemLO(itemLOData);
    res.status(201).json({
      status: "success",
      data: newItemLO,
      message: "Item LO created successfully."
    });
  } catch (error) {
    console.error("Error creating item LO:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error"
    });
  }
};

// Delete Item LO
export const deleteItemLO = async (req, res) => {
  const { id_item_lo } = req.params;

  try {
    const deleted = await ItemLO.deleteItemLO(id_item_lo);
    if (deleted) {
      res.status(200).json({
        status: "success",
        message: "Item LO deleted successfully."
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "Item LO not found."
      });
    }
  } catch (error) {
    console.error("Error deleting item LO:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error"
    });
  }
};
