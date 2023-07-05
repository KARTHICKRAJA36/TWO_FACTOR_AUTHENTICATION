const Users = require("../models/user")
const Otp = require("../models/otp")

const jwt = require("jsonwebtoken")

const verifyotp = async (req, res) => {
    try {
        const { email, otp } = req.body

        const user = await Users.findOne({ where: { email } })
        if (!user) {
            return res.status(400).send("User not found.");
        }
        const otpRecord = await Otp.findOne({
            where: { Userid: user.id, otp },
            order: [['createdAt', 'DESC']]
        });
        if (!otpRecord || otpRecord.expiration < new Date()) {
            return res.status(400).send("Invalid OTP or expired OTP.");
        }
        await otpRecord.destroy();

        const token = jwt.sign({ Userid: user.id }, 'your-secret-key', {
            expiresIn: '1h'
        });

        return res.json({
            status: "success",
            statusCode: 200,
            message: "OTP validated. JWT token generated.",
            token: token,
        });

    }
    catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
}
module.exports = verifyotp 