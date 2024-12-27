import sequelize from "../config/config.js";

const Kantor = {
  // Mendapatkan semua data kantor
  getAllKantors: async () => {
    const [results] = await sequelize.query("SELECT * FROM kantor");
    return results;
  },

  // Mendapatkan kantor berdasarkan ID
  getKantorById: async (id_kantor) => {
    const [results] = await sequelize.query(
      "SELECT * FROM kantor WHERE id_kantor = ?",
      { replacements: [id_kantor] }
    );
    return results;
  },
};

export default Kantor;
