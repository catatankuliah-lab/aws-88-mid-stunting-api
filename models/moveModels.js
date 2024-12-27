import sequelize from "../config/config.js";

const Move = {
  // Get all Moves
  getAllMoves: async () => {
    const [results] = await sequelize.query(`
      SELECT 
        move.id_move,
        move.id_item_po,
        move.tanggal_move,
        move.foto_move,
        move.status_move,
        item_po.jenis_mobil,
        item_po.nopol_mobil,
        item_po.nama_driver,
        item_po.telpon_driver,
        item_po.jenis_muatan,
        item_po.jumlah_muatan,
        po.customer,
        po.titik_muat,
        po.titik_bongkar,
        po.tanggal_po
      FROM 
        move
      LEFT JOIN 
        item_po ON move.id_item_po = item_po.id_item_po
      LEFT JOIN 
        po ON item_po.id_po = po.id_po
    `);
    return results;
  },

  // Get Move by ID
  getMoveById: async (id_move) => {
    const [results] = await sequelize.query(
      `
      SELECT 
        move.id_move,
        move.id_item_po,
        move.tanggal_move,
        move.foto_move,
        move.status_move,
        item_po.jenis_mobil,
        item_po.nopol_mobil,
        item_po.nama_driver,
        item_po.telpon_driver,
        item_po.jenis_muatan,
        item_po.jumlah_muatan,
        po.customer,
        po.titik_muat,
        po.titik_bongkar,
        po.tanggal_po
      FROM 
        move
      LEFT JOIN 
        item_po ON move.id_item_po = item_po.id_item_po
      LEFT JOIN 
        po ON item_po.id_po = po.id_po
      WHERE 
        move.id_move = ?
    `,
      {
        replacements: [id_move],
      }
    );
    return results[0]; // Return a single object
  },

  // Get Move by Item ID
  getMoveByItemId: async (id_item_po) => {
    const [results] = await sequelize.query(
      `
      SELECT 
        move.id_move,
        move.id_item_po,
        move.tanggal_move,
        move.foto_move,
        move.status_move,
        item_po.jenis_mobil,
        item_po.nopol_mobil,
        item_po.nama_driver,
        item_po.telpon_driver,
        item_po.jenis_muatan,
        item_po.jumlah_muatan,
        po.customer,
        po.titik_muat,
        po.titik_bongkar,
        po.tanggal_po
      FROM 
        move
      LEFT JOIN 
        item_po ON move.id_item_po = item_po.id_item_po
      LEFT JOIN 
        po ON item_po.id_po = po.id_po
      WHERE 
        move.id_item_po = ?
    `,
      {
        replacements: [id_item_po],
      }
    );
    return results;
  },

  // Add Move
  addMove: async (moveData) => {
    const { id_item_po, tanggal_move, foto_move, status_move } = moveData;
    const [result] = await sequelize.query(
      `
      INSERT INTO move (id_item_po, tanggal_move, foto_move, status_move)
      VALUES (?, ?, ?, ?)
    `,
      {
        replacements: [id_item_po, tanggal_move, foto_move, status_move],
      }
    );
    return { id_move: result.insertId, ...moveData };
  },

  // Update Move
  updateMove: async (id_move, moveData) => {
    const { id_item_po, tanggal_move, foto_move, status_move } = moveData;
    const [result] = await sequelize.query(
      `
      UPDATE move
      SET 
        id_item_po = ?,
        tanggal_move = ?,
        foto_move = ?,
        status_move = ?
      WHERE 
        id_move = ?
    `,
      {
        replacements: [
          id_item_po,
          tanggal_move,
          foto_move,
          status_move,
          id_move,
        ],
      }
    );
    return result.affectedRows > 0;
  },

  // Delete Move
  deleteMove: async (id_move) => {
    const [result] = await sequelize.query(
      `
      DELETE FROM move
      WHERE id_move = ?
    `,
      {
        replacements: [id_move],
      }
    );
    return result.affectedRows > 0;
  },
};

export default Move;
