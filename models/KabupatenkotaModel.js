import sequelize from "../config/config.js";

const KabupatenKota = {
  // Mendapatkan semua kabupaten/kota dengan join tabel provinsi
  getAllKabupatenKota: async () => {
    const [results] = await sequelize.query(`
      SELECT 
        kabupaten_kota.id_kabupaten_kota, 
        kabupaten_kota.id_provinsi, 
        kabupaten_kota.kode_kabupaten_kota, 
        kabupaten_kota.nama_kabupaten_kota, 
        provinsi.nama_provinsi
      FROM 
        kabupaten_kota
      LEFT JOIN 
        provinsi ON kabupaten_kota.id_provinsi = provinsi.id_provinsi
    `);
    return results;
  },

  // Mendapatkan kabupaten/kota berdasarkan ID dengan join tabel provinsi
  getKabupatenKotaByIdProvinsi: async (id_provinsi) => {
    const [results] = await sequelize.query(
      `
      SELECT 
        kabupaten_kota.id_kabupaten_kota, 
        kabupaten_kota.id_provinsi, 
        kabupaten_kota.kode_kabupaten_kota, 
        kabupaten_kota.nama_kabupaten_kota, 
        provinsi.nama_provinsi
      FROM 
        kabupaten_kota
      LEFT JOIN 
        provinsi ON kabupaten_kota.id_provinsi = provinsi.id_provinsi
      WHERE 
        kabupaten_kota.id_provinsi = ?
    `,
      {
        replacements: [id_provinsi],
      }
    );
    return results;
  },
};

export default KabupatenKota;
