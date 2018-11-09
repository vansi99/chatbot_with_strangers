const db = require('../db.js');
const sequelize = require('sequelize');

const users = db.define('users', {
    psid: {
        type: sequelize.STRING,
        allowNull: false
    },
    matched: {
        type: sequelize.INTEGER,
        defaultValue: 0
    }
}, {
    timestamps: false,
});

module.exports = users;