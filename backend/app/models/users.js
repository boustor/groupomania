module.exports = (sequelize, Sequelize) => {
    const Users = sequelize.define("users", {
      id_usr: {
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      }
    });
  
    return Users;
  };