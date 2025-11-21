const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {

    const token = req.cookies.token

    if (!token) {
        console.log("unothorized user")
        return res.send("you are not login ")
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        return next();

    } catch (error) {
        console.log("unothorized user")
        return res.redirect("/login")
    }

}

module.exports = auth;