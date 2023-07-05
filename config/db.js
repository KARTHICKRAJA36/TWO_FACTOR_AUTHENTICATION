require("dotenv").config()
let db = process.env.DB

const Sequelize = require("sequelize")
const sequelize = new Sequelize(db, 'karthick', 'karthick', {
    server:"localhost",
    dialect: 'mssql',
    dialectOptions: {
        options: {
            encrypt: false,
            port: 1433,
        }
    }
  });
  
  

  module.exports = sequelize