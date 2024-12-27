import ItemPO from "../models/itempoModels.js";

// Get all Item POs
export const getAllItemPO = async (req, res) => {
  try {
    const itemPOs = await ItemPO.getAllItemPO();
    res.status(200).json({
      status: "success",
      data: itemPOs,
      message: "Item POs fetched successfully."
    });
  } catch (error) {
    console.error("Error fetching item POs:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error"
    });
  }
};

// Get Item PO by ID
export const getItemPOById = async (req, res) => {
  const { id_item_po } = req.params;

  try {
    const itemPO = await ItemPO.getItemPOById(id_item_po);
    if (itemPO) {
      res.status(200).json({
        status: "success",
        data: itemPO,
        message: "Item PO fetched successfully."
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "Item PO not found."
      });
    }
  } catch (error) {
    console.error("Error fetching item PO by ID:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error"
    });
  }
};

// Get Item POs by PO ID
export const getItemPOByIdPO = async (req, res) => {
  const { id_po } = req.params;

  try {
    const itemPOs = await ItemPO.getItemPOByIdPO(id_po);
    if (itemPOs.length > 0) {
      res.status(200).json({
        status: "success",
        data: itemPOs,
        message: "Item POs fetched successfully by PO ID."
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "No Item POs found for the given PO ID."
      });
    }
  } catch (error) {
    console.error("Error fetching item POs by PO ID:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error"
    });
  }
};

// Add a new Item PO
export const addItemPO = async (req, res) => {
  const itemPOData = req.body;

  try {
    const newItemPO = await ItemPO.addItemPO(itemPOData);
    res.status(201).json({
      status: "success",
      data: newItemPO,
      message: "Item PO created successfully."
    });
  } catch (error) {
    console.error("Error creating item PO:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error"
    });
  }
};

// Update Item PO
export const updateItemPO = async (req, res) => {
  const { id_item_po } = req.params;
  const itemPOData = req.body;

  try {
    const updatedItemPO = await ItemPO.updateItemPO(id_item_po, itemPOData);
    if (updatedItemPO) {
      res.status(200).json({
        status: "success",
        data: updatedItemPO,
        message: "Item PO updated successfully."
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "Item PO not found."
      });
    }
  } catch (error) {
    console.error("Error updating item PO:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error"
    });
  }
};

// Delete Item PO
export const deleteItemPO = async (req, res) => {
  const { id_item_po } = req.params;

  try {
    const deleted = await ItemPO.deleteItemPO(id_item_po);
    if (deleted) {
      res.status(200).json({
        status: "success",
        message: "Item PO deleted successfully."
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "Item PO not found."
      });
    }
  } catch (error) {
    console.error("Error deleting item PO:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error"
    });
  }
};
