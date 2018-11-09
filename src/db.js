const Sequelize = require('sequelize');

const db = new Sequelize ("comrang", "root", "1234", {
    host: 3306,
    dialect: 'mysql',
    operatorsAliases: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
    logging: true
});

db.sync();

module.exports = db;