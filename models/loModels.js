import sequelize from "../config/config.js";

const LO = {
  // Get all LOs
  getAllLO: async () => {
    const [results] = await sequelize.query(`
      SELECT 
        lo.id_lo,
        lo.id_alokasi,
        lo.id_po,
        lo.id_kantor,
        lo.nomor_lo,
        lo.tanggal_lo,
        lo.titik_muat AS lo_titik_muat,
        lo.jenis_mobil,
        lo.nomol_mobil,
        lo.nama_driver,
        lo.telpon_driver,
        lo.file_lo,
        alokasi.keterangan_alokasi,
        po.tanggal_po,
        po.customer,
        po.titik_muat AS po_titik_muat,
        po.titik_bongkar,
        po.jam_stand_by,
        po.status_po,
        kantor.nama_kantor,
        kantor.alamat_kantor
      FROM 
        lo
      LEFT JOIN 
        alokasi ON lo.id_alokasi = alokasi.id_alokasi
      LEFT JOIN 
        po ON lo.id_po = po.id_po
      LEFT JOIN 
        kantor ON lo.id_kantor = kantor.id_kantor
    `);
    return results;
  },

  // Get LO by ID
  getLOById: async (id_lo) => {
    const [results] = await sequelize.query(
      `
      SELECT 
        lo.id_lo,
        lo.id_alokasi,
        lo.id_po,
        lo.id_kantor,
        lo.nomor_lo,
        lo.tanggal_lo,
        lo.titik_muat AS lo_titik_muat,
        lo.jenis_mobil,
        lo.nomol_mobil,
        lo.nama_driver,
        lo.telpon_driver,
        lo.file_lo,
        alokasi.keterangan_alokasi,
        po.tanggal_po,
        po.customer,
        po.titik_muat AS po_titik_muat,
        po.titik_bongkar,
        po.jam_stand_by,
        po.status_po,
        kantor.nama_kantor,
        kantor.alamat_kantor
      FROM 
        lo
      LEFT JOIN 
        alokasi ON lo.id_alokasi = alokasi.id_alokasi
      LEFT JOIN 
        po ON lo.id_po = po.id_po
      LEFT JOIN 
        kantor ON lo.id_kantor = kantor.id_kantor
      WHERE 
        lo.id_lo = ?
    `,
      { replacements: [id_lo] }
    );
    return results[0]; // Return a single object
  },

  // Get LO by ID PO
  getLOByIdPO: async (id_po) => {
    const [results] = await sequelize.query(
      `
      SELECT 
        lo.*,
        alokasi.keterangan_alokasi,
        kantor.nama_kantor,
        kantor.alamat_kantor
      FROM 
        lo
      LEFT JOIN 
        alokasi ON lo.id_alokasi = alokasi.id_alokasi
      LEFT JOIN 
        kantor ON lo.id_kantor = kantor.id_kantor
      WHERE 
        lo.id_po = ?
    `,
      { replacements: [id_po] }
    );
    return results;
  },

  // Get LO by ID Kantor
  getLOByIdKantor: async (id_kantor) => {
    const [results] = await sequelize.query(
      `
      SELECT 
        lo.*,
        alokasi.keterangan_alokasi,
        po.tanggal_po,
        po.customer,
        po.titik_muat,
        po.titik_bongkar,
        po.jam_stand_by,
        po.status_po
      FROM 
        lo
      LEFT JOIN 
        alokasi ON lo.id_alokasi = alokasi.id_alokasi
      LEFT JOIN 
        po ON lo.id_po = po.id_po
      WHERE 
        lo.id_kantor = ?
    `,
      { replacements: [id_kantor] }
    );
    return results;
  },

  // Add LO
  addLO: async (loData) => {
    const {
      id_alokasi,
      id_po,
      id_kantor,
      nomor_lo,
      tanggal_lo,
      titik_muat,
      jenis_mobil,
      nomol_mobil,
      nama_driver,
      telpon_driver,
      file_lo,
    } = loData;
    const [result] = await sequelize.query(
      `
      INSERT INTO lo (
        id_alokasi, id_po, id_kantor, nomor_lo, tanggal_lo, titik_muat,
        jenis_mobil, nomol_mobil, nama_driver, telpon_driver, file_lo
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
      {
        replacements: [
          id_alokasi,
          id_po,
          id_kantor,
          nomor_lo,
          tanggal_lo,
          titik_muat,
          jenis_mobil,
          nomol_mobil,
          nama_driver,
          telpon_driver,
          file_lo,
        ],
      }
    );
    return { id_lo: result.insertId, ...loData };
  },

  // Update LO
  updateLO: async (id_lo, loData) => {
    const {
      id_alokasi,
      id_po,
      id_kantor,
      nomor_lo,
      tanggal_lo,
      titik_muat,
      jenis_mobil,
      nomol_mobil,
      nama_driver,
      telpon_driver,
      file_lo,
    } = loData;
    const [result] = await sequelize.query(
      `
      UPDATE lo
      SET 
        id_alokasi = ?, id_po = ?, id_kantor = ?, nomor_lo = ?, tanggal_lo = ?, titik_muat = ?,
        jenis_mobil = ?, nomol_mobil = ?, nama_driver = ?, telpon_driver = ?, file_lo = ?
      WHERE 
        id_lo = ?
    `,
      {
        replacements: [
          id_alokasi,
          id_po,
          id_kantor,
          nomor_lo,
          tanggal_lo,
          titik_muat,
          jenis_mobil,
          nomol_mobil,
          nama_driver,
          telpon_driver,
          file_lo,
          id_lo,
        ],
      }
    );
    return result.affectedRows > 0;
  },

  // Delete LO
  deleteLO: async (id_lo) => {
    const [result] = await sequelize.query(
      `
      DELETE FROM lo
      WHERE id_lo = ?
    `,
      { replacements: [id_lo] }
    );
    return result.affectedRows > 0;
  },
};

export default LO;
