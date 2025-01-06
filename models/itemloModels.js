import sequelize from "../config/config.js";

const ItemLO = {
  // Get all Item LOs
  getAllItemLO: async () => {
    const [results] = await sequelize.query(`
      SELECT 
        item_lo.id_item_lo,
        item_lo.id_lo,
        item_lo.titik_bongkar,
        item_lo.id_desa_kelurahan,
        item_lo.jenis_muatan,
        item_lo.jumlah_muatan_ayam,
        item_lo.jumlah_muatan_telur,
        lo.nomor_lo,
        lo.tanggal_lo,
        lo.titik_muat,
        lo.jenis_mobil,
        lo.nomol_mobil,
        lo.nama_driver,
        lo.telpon_driver,
        lo.file_lo
      FROM 
        item_lo
      LEFT JOIN 
        lo ON item_lo.id_lo = lo.id_lo
    `);
    return results;
  },

  // Get Item LO by ID LO
  getItemLOByIdLO: async (id_lo) => {
    const [results] = await sequelize.query(
      `
      SELECT 
        item_lo.id_item_lo,
        item_lo.id_lo,
        item_lo.titik_bongkar,
        item_lo.id_desa_kelurahan,
        item_lo.jenis_muatan,
        item_lo.jumlah_muatan_ayam,
        item_lo.jumlah_muatan_telur,
        lo.nomor_lo,
        lo.tanggal_lo,
        lo.titik_muat,
        lo.jenis_mobil,
        lo.nopol_mobil,
        lo.nama_driver,
        lo.telpon_driver,
        lo.file_lo
      FROM 
        item_lo
      LEFT JOIN 
        lo ON item_lo.id_lo = lo.id_lo
      WHERE 
        item_lo.id_lo = ?
    `,
      { replacements: [id_lo] }
    );
    return results;
  },

  // Get Item LO by ID Item LO
  getItemLOById: async (id_item_lo) => {
    const [results] = await sequelize.query(
      `
      SELECT 
        item_lo.id_item_lo,
        item_lo.id_lo,
        item_lo.titik_bongkar,
        item_lo.id_desa_kelurahan,
        item_lo.jenis_muatan,
        item_lo.jumlah_muatan_ayam,
        item_lo.jumlah_muatan_telur,
        lo.nomor_lo,
        lo.tanggal_lo,
        lo.titik_muat,
        lo.jenis_mobil,
        lo.nomol_mobil,
        lo.nama_driver,
        lo.telpon_driver,
        lo.file_lo
      FROM 
        item_lo
      LEFT JOIN 
        lo ON item_lo.id_lo = lo.id_lo
      WHERE 
        item_lo.id_item_lo = ?
    `,
      { replacements: [id_item_lo] }
    );
    return results[0]; // Return a single object
  },

  // Add Item LO
  addItemLO: async (itemLOData) => {
    const {
      id_lo,
      titik_bongkar,
      id_desa_kelurahan,
      jenis_muatan,
      jumlah_muatan_ayam,
      jumlah_muatan_telur,
    } = itemLOData;

    const [result] = await sequelize.query(
      `
      INSERT INTO item_lo (id_lo, titik_bongkar, id_desa_kelurahan, jenis_muatan, jumlah_muatan_ayam, jumlah_muatan_telur)
      VALUES (?, ?, ?, ?, ?, ?)
    `,
      {
        replacements: [
          id_lo,
          titik_bongkar,
          id_desa_kelurahan,
          jenis_muatan,
          jumlah_muatan_ayam,
          jumlah_muatan_telur,
        ],
      }
    );
    return { id_item_lo: result.insertId, ...itemLOData };
  },

  // Delete Item LO
  deleteItemLO: async (id_item_lo) => {
    const [result] = await sequelize.query(
      `
      DELETE FROM item_lo
      WHERE id_item_lo = ?
    `,
      { replacements: [id_item_lo] }
    );
    return result.affectedRows > 0;
  },
};

export default ItemLO;
