module.exports = (sequelize, Sequelize) => {
    const Users = sequelize.define("users", {
        /*
        id_usr: {
            type: Sequelize.INTEGER,
            //autoIncrement: true,
            primaryKey: true
        },
        */
        name: {
            type: Sequelize.STRING,
            defaultValue:"Administrateur"
        },
        email: {
            type: Sequelize.STRING,
            defaultValue:"admin@groupo.com"
        },
        password: {
            type: Sequelize.STRING,
            defaultValue:"Admin&2Admin"
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
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        }
    });

    return Users;
};