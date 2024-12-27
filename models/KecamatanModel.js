import sequelize from "../config/config.js";

const Kecamatan = {
  // Mendapatkan semua kecamatan dengan join tabel kabupaten_kota
  getAllKecamatan: async () => {
    const [results] = await sequelize.query(`
      SELECT 
        kecamatan.id_kecamatan, 
        kecamatan.id_kabupaten_kota,
        kecamatan.nama_kecamatan, 
        kabupaten_kota.nama_kabupaten_kota
      FROM 
        kecamatan
      LEFT JOIN 
        kabupaten_kota ON kecamatan.id_kabupaten_kota = kabupaten_kota.id_kabupaten_kota
    `);
    return results;
  },

  // Mendapatkan kecamatan berdasarkan ID kabupaten_kota dengan join tabel kabupaten_kota
  getKecamatanByIdKabupatenKota: async (id_kabupaten_kota) => {
    const [results] = await sequelize.query(
      `
      SELECT 
        kecamatan.id_kecamatan, 
        kecamatan.id_kabupaten_kota,
        kecamatan.nama_kecamatan, 
        kabupaten_kota.nama_kabupaten_kota
      FROM 
        kecamatan
      LEFT JOIN 
        kabupaten_kota ON kecamatan.id_kabupaten_kota = kabupaten_kota.id_kabupaten_kota
      WHERE 
        kecamatan.id_kabupaten_kota = ?
    `,
      {
        replacements: [id_kabupaten_kota],
      }
    );
    return results;
  },
};

export default Kecamatan;
