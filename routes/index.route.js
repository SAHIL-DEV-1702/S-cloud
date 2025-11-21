const express = require('express');
const router = express.Router();
const upload = require("../middleware/multer.middleware");
const auth = require('../middleware/auth.middleware');
const fileModel = require("../models/files.models");
const cloudinary = require("../config/cloudinary.config");


const fs = require('fs');
const { send } = require('process');

// showing page of uploading file and dashboard

router.get("/", auth, async (req, res) => {

    const userfile = await fileModel.find({ userId: req.user.userId }) // file model madhe userId find kar aani ji decode karun jwt madhun ale ti match kar 

    res.render('dashboard.ejs', { files: userfile });  // ithe match zali tar render kar dashboard anni tyasobat object pathav 

});


// uploading file on cloudinary and database 

router.post("/upload", auth, upload.single("file"), async (req, res) => {

    try {

        if (!req.file) {
            return res.status(400).send("No file uploaded");
        }

        const result = await cloudinary.uploader.upload(req.file.path, { resource_type: "raw" })

        const newfile = await fileModel.create({
            orignalname: req.file.originalname,
            filename: req.file.filename,
            userId: req.user.userId,
            path: req.file.path,
            cloudinaryPublicId: result.public_id,
            cloudinarySecureUrl: result.secure_url,
        });

        fs.unlinkSync(req.file.path)  // uploaded success then remove 
        res.redirect("/dashboard");
        console.log('file uploaded successfully')

    } catch (error) {
        console.log("Upload Error:", error);
        res.status(500).json({ message: 'file uploding failed' });
        fs.unlinkSync(req.file.path)
    }
});


router.post("/delete/:cloudinaryPublicId", auth, async (req, res) => {

    try {
        const deleteUser = await fileModel.findOneAndDelete({ cloudinaryPublicId: req.params.cloudinaryPublicId });

        if (!deleteUser) {
            console.log('"File not found in database')
            return res.redirect('/dashboard')
        }

        cloudinary.uploader.destroy(deleteUser.cloudinaryPublicId)


        console.log("deleted sucessfully");   // deleted from cloudinary

        res.redirect('/dashboard')

    } catch (error) {
        res.status(401).send(error)
    }

})

router.get('/view/:cloudinaryPublicId', auth, async (req, res) => {

    try {
        const user = await fileModel.findOne({ cloudinaryPublicId: req.params.cloudinaryPublicId })

        const userUrl = user.cloudinarySecureUrl

        console.log("userUrl : ", userUrl)

        const response = await fetch(userUrl)

        const buffer = await response.arrayBuffer()

        res.setHeader("Content-Type", "application/pdf");

        res.setHeader("Content-Disposition", "inline");

        res.send(Buffer.from(buffer));

    } catch (error) {
        res.status(401).send('error to view', error)
    }

})

router.get('/download/:cloudinaryPublicId', auth, async (req, res) => {
    try {

        const user = await fileModel.findOne({ cloudinaryPublicId: req.params.cloudinaryPublicId })

        const url = user.cloudinarySecureUrl

        const response = await fetch(url);

        const buffer = await response.arrayBuffer()

        res.setHeader("Content-Type", "application/pdf")
        res.setHeader("Content-Disposition", `attachment ; filename= ${user.filename}`)

        res.send(Buffer.from(buffer));


    } catch (error) {
        res.status(401).send("downloading error ", error)
    }
})

router.post('/logout', auth, (req, res) => {

    res.clearCookie('token')
    res.redirect('/login')
})


module.exports = router;






