module.exports = {
    dialect: 'postgres',
    host: 'cookbook-db',
    port: 5432,
    username: 'postgres',
    password: 123456,
    database: 'cookbook',
    seederStorage: 'sequelize',
    define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true
    }
};