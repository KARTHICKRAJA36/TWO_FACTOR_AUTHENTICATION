const sequelize = require("../config/db")
const DataTypes = require("sequelize")

const Users = sequelize.define('Users', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    mobileno: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    freezeTableName:true,
    timestamps:false

})

module.exports = Users
