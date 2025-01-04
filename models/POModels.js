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

  getFilteredPO: async (filters) => {
    try {
      let query = `SELECT 
      kantor.id_kantor,
        kantor.nama_kantor,
        po.id_po,
        po.nomor_po,
        po.tanggal_po,
        po.customer,
        po.titik_muat,
        po.titik_bongkar,
        po.jam_stand_by,
        po.status_po,
        JSON_OBJECT(
          'ayam', SUM(CASE WHEN item_po.jenis_muatan = 'ayam' THEN item_po.jumlah_muatan ELSE 0 END),
          'telur', SUM(CASE WHEN item_po.jenis_muatan = 'telur' THEN item_po.jumlah_muatan ELSE 0 END)
        ) AS jenis_muatan_json
      FROM
      po
      JOIN 
    item_po ON po.id_po = item_po.id_po
      JOIN 
    kantor ON po.id_kantor = kantor.id_kantor WHERE 1 = 1`;
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

      if (filters.tanggal_po.$gte != "Invalid Date" || filters.tanggal_po.$lte != "Invalid Date") {
        if (filters.tanggal_po.$gte && filters.tanggal_po.$lte) {
          query += " AND po.tanggal_po BETWEEN ? AND ?";
          params.push(filters.tanggal_po.$gte);
          params.push(filters.tanggal_po.$lte);
        } else if (filters.tanggal_po.$gte) {
          query += " AND po.tanggal_po >= ?";
          params.push(filters.tanggal_po.$gte);
        } else if (filters.tanggal_po.$lte) {
          query += " AND po.tanggal_po <= ?";
          params.push(filters.tanggal_po.$lte);
        }
      }

      query += `GROUP BY 
    kantor.id_kantor, kantor.nama_kantor, po.id_po, po.nomor_po, po.tanggal_po, 
    po.customer, po.titik_muat, po.titik_bongkar, po.jam_stand_by, po.status_po;
`;

      // Menjalankan query menggunakan sequelize.query
      const [poList] = await sequelize.query(query, {
        replacements: params, // Pastikan parameter menggantikan tanda tanya dalam query
        type: sequelize.QueryTypes.SELECT, // Menentukan jenis query yang dijalankan
      });
      return poList;
    } catch (error) {
      console.error("Error fetching filtered purchase orders:", error);
      throw error;
    }
  }
};

export default PO;