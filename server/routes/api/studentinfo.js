const express = require('express');
const authenticate = require('../../middleware/authenticate');
const router = express.Router();
const student = require('../../models/student');
const config=require('config')
const CryptoJS=require('crypto-js')

router.get('/columns/:columnid', authenticate, async (req, res) => {
    const studentProfile = await student.find({ _id: req.user.id }).select(req.params.columnid)
    // find returns an array of documents matching the query even if it is only one document, whereas findone return the plan document
    console.log(`The data fetched from studentINfo is given by `,studentProfile)
    return res.send(studentProfile[0])
})
router.put('/', authenticate, async (req, res) => {
    console.log(req,res)
    const FullstudentProfile = await student.findOne({ _id: req.user.id })
    const {purpose,time,deviceId}=req.body
    const bytes = CryptoJS.AES.decrypt(deviceId, config.get('SecretPass'));
    const data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    if (data!=FullstudentProfile.devices) {console.log("Non-encry",data); return res.status(500).send("Device Not recognized, Qr Invalid")}
    // find returns an array of documents matching the query even if it is only one document, whereas findone return the plan docum ent
    try {
        if (FullstudentProfile.access) {
            const outinginfoLength=Object.values(FullstudentProfile.outinginfo).length
            FullstudentProfile.outinginfo[outinginfoLength-1].entry=time ;
            FullstudentProfile.access = false;
            await new student(FullstudentProfile).save();
            return res.status(200)
            // new student saves the data helps to save in a new format


        }
        else {
            if(purpose){
            FullstudentProfile.outinginfo.push({ date: time, entry: "", exit:time, purpose: purpose })
            FullstudentProfile.access=true
            await new student(FullstudentProfile).save();
            return res.status(200)
            }
        }
    }
    catch (err) {
        console.log(err)
        return res.status(500)
    }
})
module.exports = router
