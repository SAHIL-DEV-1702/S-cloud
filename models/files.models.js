const mongoose = require('mongoose');

const fileschema = new mongoose.Schema({

    filename: {
        type: String,
        require: true
    },
    path: {
        type: String,
        require: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    cloudinaryPublicId: {
        type: String
    },
    cloudinarySecureUrl: {
        type: String
    },
    orignalname: {
        type: String
    }

}, { timestamps: true })

const fileModel = mongoose.model("file", fileschema)

module.exports = fileModel