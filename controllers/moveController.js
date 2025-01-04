import Move from "../models/moveModels.js";

// Get all Moves
export const getAllMoves = async (req, res) => {
  try {
    const moves = await Move.getAllMoves();
    res.status(200).json({
      status: "success",
      data: moves,
      message: "Moves fetched successfully."
    });
  } catch (error) {
    console.error("Error fetching moves:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error"
    });
  }
};

// Get Move by ID
export const getMoveById = async (req, res) => {
  const { id_move } = req.params;

  try {
    const move = await Move.getMoveById(id_move);
    if (move) {
      res.status(200).json({
        status: "success",
        data: move,
        message: "Move fetched successfully."
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "Move not found."
      });
    }
  } catch (error) {
    console.error("Error fetching move by ID:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error"
    });
  }
};

// Get Move by Item ID
export const getMoveByItemId = async (req, res) => {
  const { id_item_po } = req.params;

  try {
    const moves = await Move.getMoveByItemId(id_item_po);
    if (moves.length > 0) {
      res.status(200).json({
        status: "success",
        data: moves,
        message: "Moves fetched successfully by Item ID."
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "No moves found for the given Item ID."
      });
    }
  } catch (error) {
    console.error("Error fetching moves by Item ID:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error"
    });
  }
};

// Add a new Move
export const addMove = async (req, res) => {
  const moveData = req.body;

  try {
    const newMove = await Move.addMove(moveData);
    res.status(201).json({
      status: "success",
      data: newMove,
      message: "Move created successfully."
    });
  } catch (error) {
    console.error("Error creating move:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error"
    });
  }
};

// Update Move
export const updateMove = async (req, res) => {
  const { id_move } = req.params;
  const moveData = req.body;

  try {
    const updatedMove = await Move.updateMove(id_move, moveData);
    if (updatedMove) {
      res.status(200).json({
        status: "success",
        data: updatedMove,
        message: "Move updated successfully."
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "Move not found."
      });
    }
  } catch (error) {
    console.error("Error updating move:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error"
    });
  }
};

// Delete Move
export const deleteMove = async (req, res) => {
  const { id_move } = req.params;

  try {
    const deleted = await Move.deleteMove(id_move);
    if (deleted) {
      res.status(200).json({
        status: "success",
        message: "Move deleted successfully."
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "Move not found."
      });
    }
  } catch (error) {
    console.error("Error deleting move:", error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error"
    });
  }
};

export const getFilteredMove = async (req, res) => {
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
      filters.tanggal_move = {
        $gte: new Date(tanggal_awal),
        $lte: new Date(tanggal_akhir),
      };
    }

    const movelist = await Move.getFilteredMove(filters);

    if (movelist) {
      res.status(200).json({
        status: "success",
        data: movelist,
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
