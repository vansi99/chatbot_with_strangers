const db = require('../db');
const sequelize = require('sequelize');
const users = require('./users');

const partners_users = db.define('partners_users', {
    user_id: {
        type: sequelize.INTEGER,
        allowNull: false,
        unique: true
    },
    partner_psid: {
        type: sequelize.STRING,
        allowNull: false
    }
}, {
    timestamps: false,
});

partners_users.hasOne(users, {foreignKey: "id"});

module.exports = partners_users;

