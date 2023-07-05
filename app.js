
const express = require("express")
const app = express();
const sequelize = require("./config/db")
const Users = require("./models/user")
const Otp = require("./models/otp");
require("dotenv").config();
const router = require("./router/router")


let port = 3300

sequelize.authenticate()
    .then(() => {
        console.log("database connected ....");
    })
    .catch((error) => {
        console.log(error);
    })

Users.sync().then(() => {
    console.log("Users table created successfully..");
}).catch((error) => {
    console.log(error.message);
})

Otp.sync().then(() => {
    console.log("Otp table created successfully..");
}).catch((error) => {
    console.log(error.message);
})

app.use(express.json());
app.use(router);



app.listen(port, () => {
    console.log(`port running at ${port}`);
})

