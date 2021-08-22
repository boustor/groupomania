module.exports = (sequelize, Sequelize) => {
    const Messages = sequelize.define("messages", {
        id_usr: {
            type: Sequelize.INTEGER
        },
        nom : {
            type:Sequelize.STRING
        },
        objet: {
            type: Sequelize.STRING
        },
        message: {
            type: Sequelize.TEXT
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

    return Messages;
};