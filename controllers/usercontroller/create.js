const Users = require("../../models/user")
const bcrypt = require("bcrypt")

const createuser = async (req, res) => {
    try {
        let { username, password, mobileno, email } = req.body
        let hashedpassword = await bcrypt.hash(password, 10)
        const user = await Users.create({
            username,
            password: hashedpassword,
            mobileno,
            email
        })
        return res.json({
            status: "success",
            statuscode: 200,
            message: "user created successfully",
            data: user
        })
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send(error.message)

    }
}
module.exports = createuser