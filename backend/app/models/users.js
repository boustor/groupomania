module.exports = (sequelize, Sequelize) => {
  const Users = sequelize.define("users", {
    id_usr: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    admin: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    createdAt: {
      type: 'TIMESTAMP',
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: false
    },
    updatedAt: {
      type: 'TIMESTAMP',
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      allowNull: false
    }
  });

  return Users;
};