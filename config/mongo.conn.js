const mongoose = require('mongoose');

const mongodbconnection = () => {

    mongoose.connect(process.env.ATLAS_URI)
        .then(() => {
            console.log("database connected successfully")
        }).catch((error) => {
            console.log("error to connect database ", error.message)
        })
}
module.exports = mongodbconnection 