const router = require("express").Router()
const createuser = require("../controllers/usercontroller/create")
const userlogin = require("../controllers/usercontroller/login")
const verifyotp = require("../services/otpverification")


router.post('/create',createuser)
router.post('/login',userlogin)
router.post('/otpverify',verifyotp)

module.exports = router