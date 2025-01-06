import sequelize from "../config/config.js";

const ItemPO = {
  // Get all Item PO
  getAllItemPO: async () => {
    const [results] = await sequelize.query(`
      SELECT 
        item_po.id_item_po,
        item_po.id_po,
        item_po.jenis_mobil,
        item_po.nopol_mobil,
        item_po.nama_driver,
        item_po.telpon_driver,
        item_po.jenis_muatan,
        item_po.jumlah_muatan,
        po.tanggal_po,
        po.customer,
        po.titik_muat,
        po.titik_bongkar,
        po.jam_stand_by,
        po.status_po,
        po.nomor_po
      FROM 
        item_po
      LEFT JOIN 
        po ON item_po.id_po = po.id_po
    `);
    return results;
  },

  // Get Item PO by ID
  getItemPOById: async (id_item_po) => {
    const [results] = await sequelize.query(
      `
      SELECT 
        item_po.id_item_po,
        item_po.id_po,
        item_po.jenis_mobil,
        item_po.nopol_mobil,
        item_po.nama_driver,
        item_po.telpon_driver,
        item_po.jenis_muatan,
        item_po.jumlah_muatan,
        po.tanggal_po,
        po.customer,
        po.titik_muat,
        po.titik_bongkar,
        po.jam_stand_by,
        po.status_po
      FROM 
        item_po
      LEFT JOIN 
        po ON item_po.id_po = po.id_po
      WHERE 
        item_po.id_item_po = ?
    `,
      {
        replacements: [id_item_po],
      }
    );
    return results[0];
  },

  // Get Item PO by PO ID
  getItemPOByIdPO: async (id_po) => {
    const [results] = await sequelize.query(
      `
      SELECT 
        item_po.id_item_po,
        item_po.id_po,
        item_po.jenis_mobil,
        item_po.nopol_mobil,
        item_po.nama_driver,
        item_po.telpon_driver,
        item_po.jenis_muatan,
        item_po.jumlah_muatan,
        po.tanggal_po,
        po.customer,
        po.titik_muat,
        po.titik_bongkar,
        po.jam_stand_by,
        po.status_po,
        po.nomor_po,
        move.id_move,
        move.nomor_move,
        move.tanggal_move
      FROM 
        item_po
      LEFT JOIN
        move ON item_po.id_item_po = move.id_item_po
      LEFT JOIN 
        po ON item_po.id_po = po.id_po
      WHERE
        item_po.id_po = ?
    `,
      {
        replacements: [id_po],
      }
    );
    return results;
  },

  // Add Item PO
  addItemPO: async (itemPOData) => {
    const {
      id_po,
      jenis_mobil,
      nopol_mobil,
      nama_driver,
      telpon_driver,
      jenis_muatan,
      jumlah_muatan
    } = itemPOData;
    const [result] = await sequelize.query(
      `
      INSERT INTO item_po (id_po, jenis_mobil, nopol_mobil, nama_driver, telpon_driver, jenis_muatan, jumlah_muatan)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `,
      {
        replacements: [
          id_po,
          jenis_mobil,
          nopol_mobil,
          nama_driver,
          telpon_driver,
          jenis_muatan,
          jumlah_muatan
        ],
      }
    );
    return { id_item_po: result.insertId, ...itemPOData };
  },

  // Update Item PO
  updateItemPO: async (id_item_po, itemPOData) => {
    const {
      id_po,
      jenis_mobil,
      nopol_mobil,
      nama_driver,
      telpon_driver,
      jenis_muatan,
      jumlah_muatan
    } = itemPOData;
    const [result] = await sequelize.query(
      `
      UPDATE item_po
      SET 
        id_po = ?,
        jenis_mobil = ?,
        nopol_mobil = ?,
        nama_driver = ?,
        telpon_driver = ?,
        jenis_muatan = ?,
        jumlah_muatan = ?
      WHERE 
        id_item_po = ?
    `,
      {
        replacements: [
          id_po,
          jenis_mobil,
          nopol_mobil,
          nama_driver,
          telpon_driver,
          jenis_muatan,
          jumlah_muatan,
          id_item_po
        ],
      }
    );
    return result.affectedRows > 0;
  },

  // Delete Item PO
  deleteItemPO: async (id_item_po) => {
    const [result] = await sequelize.query(
      `
      DELETE FROM item_po
      WHERE id_item_po = ?
    `,
      {
        replacements: [id_item_po],
      }
    );
    return result.affectedRows > 0;
  },
};

export default ItemPO;
