const sequelize = require("../config/db")
const DataTypes = require("sequelize")

const Otp = sequelize.define('Otp',{
    Userid:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    otp:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    expiration:{
        type:DataTypes.DATE,
        allowNull:true
    }
},{
    freezeTableName:true,
})

module.exports = Otp