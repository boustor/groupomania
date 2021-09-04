const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    port: dbConfig.PORT,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./Users.js")(sequelize, Sequelize);
db.messages = require("./Messages.js")(sequelize, Sequelize);
db.commentaires = require("./Commentaires.js")(sequelize, Sequelize);

module.exports = db;