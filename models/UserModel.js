import sequelize from "../config/config.js";

const User = {
  // Mendapatkan semua user dengan join tabel role dan kantor
  getAllUsers: async () => {
    const [results] = await sequelize.query(`
            SELECT 
                user.id_user, 
                user.id_role, 
                user.id_kantor, 
                user.nama_user, 
                user.username, 
                user.password, 
                user.status_user,
                role.nama_role, 
                kantor.nama_kantor 
            FROM 
                user
            LEFT JOIN 
                role ON user.id_role = role.id_role
            LEFT JOIN 
                kantor ON user.id_kantor = kantor.id_kantor
        `);
    return results;
  },

  getUserById: async (id_user) => {
    const [results] = await sequelize.query(
      `
            SELECT 
                user.id_user, 
                user.id_role, 
                user.id_kantor, 
                user.nama_user, 
                user.username, 
                user.password, 
                user.status_user,
                role.nama_role, 
                kantor.nama_kantor 
            FROM 
                user
            LEFT JOIN 
                role ON user.id_role = role.id_role
            LEFT JOIN 
                kantor ON user.id_kantor = kantor.id_kantor
            WHERE 
                user.id_user = ?
        `,
      {
        replacements: [id_user],
      }
    );
    return results[0];
  },

  addUser: async (
    id_role,
    id_kantor,
    id_gudang,
    nama_user,
    username,
    password,
    status_user
  ) => {
    const result = await sequelize.query(
      `
      INSERT INTO user (
        id_role, id_kantor, id_gudang, nama_user, username, password, status_user
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `,
      {
        replacements: [
          id_role,
          id_kantor,
          id_gudang,
          nama_user,
          username,
          password,
          status_user,
        ],
      }
    );
    return result[0];
  },
};

export default User;
