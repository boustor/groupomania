module.exports = (sequelize, Sequelize) => {
    const Messages = sequelize.define("messages", {
        id_usr: {
            type: Sequelize.INTEGER
        },
        objet: {
            type: Sequelize.STRING
        },
        message: {
            type: Sequelize.BLOB
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