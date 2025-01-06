import sequelize from "../config/config.js";
import { getFilteredMove } from "../controllers/moveController.js";

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
        move.nomor_move,
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
        po.tanggal_po,
        po.jam_stand_by
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
        move.nomor_move,
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
        po.jam_stand_by,
        po.tanggal_po
      FROM 
        move
      LEFT JOIN 
        item_po ON move.id_item_po = item_po.id_item_po
      LEFT JOIN 
        po ON item_po.id_po = po.id_po
      WHERE 
        move.id_item_po = ?`,
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

  getFilteredMove: async (filters) => {
    try {
      let query = `SELECT 
    po.tanggal_po,
    kantor.nama_kantor,
    po.customer,
    po.titik_muat,
    po.titik_bongkar,
    po.jam_stand_by,
    item_po.id_item_po,
    item_po.jenis_muatan,
    item_po.jumlah_muatan,
    move.id_move,
    move.status_move,
    move.tanggal_move,
    move.nomor_move,
    JSON_OBJECT(
        'AYAM', SUM(CASE WHEN item_po.jenis_muatan = 'AYAM' THEN item_po.jumlah_muatan ELSE 0 END),
        'TELUR', SUM(CASE WHEN item_po.jenis_muatan = 'TELUR' THEN item_po.jumlah_muatan ELSE 0 END)
    ) AS jenis_muatan_json
FROM 
    move
JOIN 
    item_po ON move.id_item_po = item_po.id_item_po
JOIN 
    po ON item_po.id_po = po.id_po
JOIN 
    kantor ON po.id_kantor = kantor.id_kantor`;
      ;
      const params = [];

      // Filter berdasarkan id_alokasi jika ada
      if (filters.id_alokasi) {
        query += " AND po.id_alokasi = ?";
        params.push(filters.id_alokasi);
      }

      // Filter berdasarkan id_kantor jika ada dan valid
      if (filters.id_kantor && filters.id_kantor !== null && filters.id_kantor !== 'null') {
        query += " AND po.id_kantor = ?";
        params.push(filters.id_kantor);
      }

      if (filters.tanggal_move.$gte != "Invalid Date" || filters.tanggal_move.$lte != "Invalid Date") {
        if (filters.tanggal_move.$gte && filters.tanggal_move.$lte) {
          query += " AND move.tanggal_move BETWEEN ? AND ?";
          params.push(filters.tanggal_move.$gte);
          params.push(filters.tanggal_move.$lte);
        } else if (filters.tanggal_move.$gte) {
          query += " AND move.tanggal_move >= ?";
          params.push(filters.tanggal_move.$gte);
        } else if (filters.tanggal_move.$lte) {
          query += " AND move.tanggal_move <= ?";
          params.push(filters.tanggal_move.$lte);
        }
      }

      query += `GROUP BY 
    po.tanggal_po,
    kantor.nama_kantor,
    po.customer,
    po.titik_muat,
    po.titik_bongkar,
    po.jam_stand_by,
    item_po.id_item_po,
    item_po.jenis_muatan,
    item_po.jumlah_muatan,
    move.id_move,
    move.status_move,
    move.tanggal_move,
    move.nomor_move;`;

      // Menjalankan query menggunakan sequelize.query
      const [movelist] = await sequelize.query(query, {
        replacements: params, // Pastikan parameter menggantikan tanda tanya dalam query
        type: sequelize.QueryTypes.SELECT, // Menentukan jenis query yang dijalankan
      });
      return movelist;
    } catch (error) {
      console.error("Error fetching filtered purchase orders:", error);
      throw error;
    }
  }
};

export default Move;
