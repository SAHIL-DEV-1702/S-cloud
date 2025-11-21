const dotenv = require('dotenv')
dotenv.config();
const express = require('express');
const app = express();
const mongoConn = require('./config/mongo.conn.js');
const userModel = require('./models/user.model.js');
const registeruser = require('./routes/user.route.js')
const indexRouter = require('./routes/index.route.js')

const cookieParser = require('cookie-parser');
const multer = require('multer');

const upload = multer({ storage: multer.memoryStorage() });

app.use(cookieParser())

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.set("view engine", "ejs")

mongoConn()

app.use('/', registeruser)
app.use("/dashboard", indexRouter)



app.listen(8000, () => {
    console.log("server listening on port 8000")
})