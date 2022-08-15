const express = require("express")
let router = express.Router()
const mongoose = require("mongoose")
const userSchema = require("../schema/userSchema")
let auth = require("../middleware/auth")

router.put("/updateBudget" , auth ,  async (req , res) => {

    try{

        delete req.body._id
        let newBudget = await userSchema.findByIdAndUpdate( req.userID , { budget : req.body} )
        res.json({ message : "Budget updated" , ok : true })

    }catch( err )
    {
        console.log( err )
        res.json({ message : err.message , ok : false })
    }

})


module.exports = router








