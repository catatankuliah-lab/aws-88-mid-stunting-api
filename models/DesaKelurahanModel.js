import sequelize from "../config/config.js";

const DesaKelurahan = {
  getAllDesaKelurahan: async () => {
    const [results] = await sequelize.query(`
      SELECT 
        desa_kelurahan.id_desa_kelurahan, 
        desa_kelurahan.id_kecamatan, 
        desa_kelurahan.kode_desa_kelurahan, 
        desa_kelurahan.nama_desa_kelurahan, 
        kecamatan.nama_kecamatan
      FROM 
        desa_kelurahan
      LEFT JOIN 
        kecamatan ON desa_kelurahan.id_kecamatan = kecamatan.id_kecamatan
    `);
    return results;
  },

  getDesaKelurahanByIdKecamatan: async (id_kecamatan) => {
    const [results] = await sequelize.query(
      `
      SELECT 
        desa_kelurahan.id_desa_kelurahan, 
        desa_kelurahan.id_kecamatan, 
        desa_kelurahan.kode_desa_kelurahan, 
        desa_kelurahan.nama_desa_kelurahan, 
        kecamatan.nama_kecamatan
      FROM 
        desa_kelurahan
      LEFT JOIN 
        kecamatan ON desa_kelurahan.id_kecamatan = kecamatan.id_kecamatan
      WHERE 
        desa_kelurahan.id_kecamatan = ?
    `,
      {
        replacements: [id_kecamatan],
      }
    );
    return results;
  },
};

export default DesaKelurahan;
