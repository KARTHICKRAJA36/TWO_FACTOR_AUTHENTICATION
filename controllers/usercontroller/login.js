const Users = require("../../models/user")
const Otp = require("../../models/otp")
const bcyrpt = require("bcrypt")
const otpgenerate = require("otp-generator")
const sendEmail = require("../../middleware/sendEmail")
const userlogin = async (req, res) => {
    try {
        let { email, password } = req.body
        const user = await Users.findOne({ where: { email } })
        if (!user) {
            return res.status(400).send("user not found..")
        }
        const isvalidpassword = await bcyrpt.compare(password, user.password);
        if (!isvalidpassword) {
            return res.status(402).send("invalid password..")
        }
        const otp = otpgenerate.generate(6, { digits: true, lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false })
        const otpexpiration =new Date(Date.now() + 2*60*1000);
        
        await Otp.create({
            Userid: user.id,
            otp: otp,
            expiration:otpexpiration
        })

        const emailText = `
        <h1>ONE TIME PASSWORD</h1>
        <p>Hello ${user.username} ,</p>
        <p>We received a request to login by user email.we generate a OTP for login </p>
        <h2>YOUR OTP IS ${otp}</h2>
        <p>If you did not initiate this request, please ignore this email.</p>
        <p>Thank you,</p>
        `;

        await sendEmail(user.email, 'Password Reset Request', emailText);

        return res.json({
            status: "success",
            statuscode: 200,
            message: "OTP has been generated..please check your registered email..",
            data: {username:user.username,email:user.email},
        });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send(error.message)

    }
}



module.exports =  userlogin