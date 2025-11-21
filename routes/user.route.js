const express = require('express');
const userModel = require('../models/user.model');
const router = express.Router()
const bcrypt = require('bcrypt')
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');


router.get('/', (req, res) => {
    res.render('register.ejs')
})

router.post("/register",
    body('email').trim().isEmail(),
    body('password').trim().isLength({ min: 8 }),
    body('username').trim().isLength({ min: 5 }),


    async (req, res) => {

        const errors = validationResult(req);

        let { email, username, password } = req.body
        if (!errors.isEmpty()) {
            return res.send("invlid values password must be 8 charater and username must be 5 char")
        }
        const user = await userModel.findOne({ email })

        if (!user) {
            const hash = await bcrypt.hash(password, 10)

            const userC = await userModel.create(
                {
                    email,
                    username,
                    password: hash
                }
            )
            res.redirect('/login')
        }
        console.log("user already exist ")
        res.send("you are already registered pls login ")
    })

router.get('/login', (req, res) => {
    res.render('login.ejs')
})

router.post("/login",

    body('email').trim(),
    body("password").trim().isLength({ min: 8 }),


    async (req, res) => {

        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400)
                .json({
                    message: "invalid data",
                    error: errors.array()
                })
        }

        const { email, password } = req.body

        let user = await userModel.findOne({ email });

        if (!user) {
            console.log("you are not registerd register first")
            res.send('please register first')
        }

        const isMatch = bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({ message: "INVALID EMAIL OR PASSWORD" })

        }

        const token = jwt.sign({
            userId: user._id,
            email: user.email,
            username: user.username
        }, process.env.JWT_SECRET)

        if (!token) {
            console.log('token does not exist')
        }

        res.cookie("token", token)

        console.log("LOGIN SUCCESSFULLY ")
        res.redirect('/dashboard');


    })


module.exports = router