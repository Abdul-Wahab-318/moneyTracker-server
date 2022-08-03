const express = require("express")
let mongoose = require("mongoose")
let router = express.Router()
let jwt = require("jsonwebtoken")
let userSchema = require("./../schema/userSchema")
let auth = require("../middleware/auth")

router.post("/login" , async ( req , res) => {

    try
    {
        let { email , password } = req.body 

        if ( !email || !password ) // if email or password is missing
        {
            res.status(400).json({ message : "Password or Email is missing", ok : false })
        }

        let user = await userSchema.findOne({ email })

        if( !user )
        {
            res.status(404).json({ message : "User not found" , ok : false })
        }

        let comparePassword = await user.checkPassword(password)

        if ( !comparePassword )
        {
            res.status(401).json({ message : " Invalid credentials ", ok : false })
        }

        let token = user.getJWT()
        req.user = user 
        
        //cookie expires after 30 days
        res.status(200)
        .cookie( 'token' , token , { httpOnly : true , sameSite : 'none' , secure : true , expires : new Date(Date.now() + 2600000000) })
        .json({ ok : true , user})

    }catch( err )
    {
        console.log(err)
        res.status(400).json({ ok : false , message : "logged in failed" })
    }
})

router.post("/register" , async ( req , res ) => {

    try{
        let user = await userSchema.create( req.body )
        let token = user.getJWT()
        req.user = user 
        //change secure to true to let browser store cookie but then it wont work for postman
        res.status(200).cookie( 'token' , token , { httpOnly : true , sameSite : 'none' , secure : true , maxAge : 2600000000})
        .json( { user , ok : true  , message : "user registered"} )
    }
    catch( err )
    {
        if ( err instanceof mongoose.Error.ValidationError )
        console.log("!!! Maara ye to validation error hai")
        console.log(err.message)
        res.status(400).json({ message : err.message , ok : false , code : err.code })
    }

     
})

router.get("/userProfile"  , auth , async ( req , res ) => {

    if ( !req.userID )
    res.status(403).json({ ok : false , message : "authentication error" }) 
    
    let user = await userSchema.findById( req.userID )

    if ( !user )
    res.status(404).json({ ok : false , message : "user not found" })

    res.status(200).json({ ok : true , user })

})

router.post( "/logout" , auth , async ( req , res ) => {

    req.user = null 
    req.userID = null 
    console.log("logged out : " , req.cookies)
    res.clearCookie("token" , { domain : "money-tracker-app-server.herokuapp.com" , path : "/"})
    res.status(200).json({ message : "logged out" , ok : true } )

} )


router.get("/hello" , async ( req ,res) => {
    res.end("hello mate")
})

module.exports = router