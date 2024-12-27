import sequelize from "../config/config.js";

const PO = {
  // Get all PO
  getAllPO: async () => {
    const [results] = await sequelize.query(`
      SELECT 
        po.id_po,
        po.id_alokasi,
        po.id_kantor,
        po.tanggal_po,
        po.customer,
        po.titik_muat,
        po.titik_bongkar,
        po.jam_stand_by,
        po.status_po,
        alokasi.keterangan_alokasi,
        kantor.nama_kantor,
        kantor.alamat_kantor
      FROM 
        po
      LEFT JOIN 
        alokasi ON po.id_alokasi = alokasi.id_alokasi
      LEFT JOIN 
        kantor ON po.id_kantor = kantor.id_kantor
    `);
    return results;
  },

  // Get PO by ID
  getPOById: async (id_po) => {
    const [results] = await sequelize.query(
      `
      SELECT 
        po.id_po,
        po.id_alokasi,
        po.id_kantor,
        po.tanggal_po,
        po.customer,
        po.titik_muat,
        po.titik_bongkar,
        po.jam_stand_by,
        po.status_po,
        alokasi.keterangan_alokasi,
        kantor.nama_kantor,
        kantor.alamat_kantor
      FROM 
        po
      LEFT JOIN 
        alokasi ON po.id_alokasi = alokasi.id_alokasi
      LEFT JOIN 
        kantor ON po.id_kantor = kantor.id_kantor
      WHERE 
        po.id_po = ?
    `,
      {
        replacements: [id_po],
      }
    );
    return results[0]; // Return a single object
  },

  // Get PO by Kantor ID
  getPOByIdKantor: async (id_kantor) => {
    const [results] = await sequelize.query(
      `
      SELECT 
        po.id_po,
        po.id_alokasi,
        po.id_kantor,
        po.tanggal_po,
        po.customer,
        po.titik_muat,
        po.titik_bongkar,
        po.jam_stand_by,
        po.status_po,
        alokasi.keterangan_alokasi,
        kantor.nama_kantor,
        kantor.alamat_kantor
      FROM 
        po
      LEFT JOIN 
        alokasi ON po.id_alokasi = alokasi.id_alokasi
      LEFT JOIN 
        kantor ON po.id_kantor = kantor.id_kantor
      WHERE 
        po.id_kantor = ?
    `,
      {
        replacements: [id_kantor],
      }
    );
    return results;
  },

  // Add PO
  addPO: async (poData) => {
    const { id_alokasi, id_kantor, tanggal_po, customer, titik_muat, titik_bongkar, jam_stand_by, status_po } = poData;
    const [result] = await sequelize.query(
      `
      INSERT INTO po (id_alokasi, id_kantor, tanggal_po, customer, titik_muat, titik_bongkar, jam_stand_by, status_po)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `,
      {
        replacements: [id_alokasi, id_kantor, tanggal_po, customer, titik_muat, titik_bongkar, jam_stand_by, status_po],
      }
    );
    return { id_po: result.insertId, ...poData };
  },

  // Update PO
  updatePO: async (id_po, poData) => {
    const { id_alokasi, id_kantor, tanggal_po, customer, titik_muat, titik_bongkar, jam_stand_by, status_po } = poData;
    const [result] = await sequelize.query(
      `
      UPDATE po
      SET 
        id_alokasi = ?,
        id_kantor = ?,
        tanggal_po = ?,
        customer = ?,
        titik_muat = ?,
        titik_bongkar = ?,
        jam_stand_by = ?,
        status_po = ?
      WHERE 
        id_po = ?
    `,
      {
        replacements: [
          id_alokasi,
          id_kantor,
          tanggal_po,
          customer,
          titik_muat,
          titik_bongkar,
          jam_stand_by,
          status_po,
          id_po,
        ],
      }
    );
    return result.affectedRows > 0;
  },

  // Delete PO
  deletePO: async (id_po) => {
    const [result] = await sequelize.query(
      `
      DELETE FROM po
      WHERE id_po = ?
    `,
      {
        replacements: [id_po],
      }
    );
    return result.affectedRows > 0;
  },
};

export default PO;
