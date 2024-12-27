import sequelize from "../config/config.js";

const Alokasi = {
  getAllAlokasi: async () => {
    const [results] = await sequelize.query("SELECT * FROM alokasi");
    return results;
  }
};

export default Alokasi;
