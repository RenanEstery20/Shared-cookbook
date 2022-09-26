'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('users', 'avatar_id', {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'attachments',
                key: 'id'
            },
            onUpdated: 'SET NULL',
            onDeleted: 'SET NULL'
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn('users', 'avatar_id');
    }
};