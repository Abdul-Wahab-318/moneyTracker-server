const jwt = require("jsonwebtoken")


let auth = ( req , res , next ) => {

    let { token } = req.cookies
    console.log("INSIDE AUTH MIDDLEWARE")
    if ( !token )
    {
        res.status(403).json({ message : " Please login first " , ok : false })
        return
    }

    try{
        let decoded = jwt.verify( token  , "bingChungus123*%#&" )
        req.userID = decoded._id
        
    }catch( err )
    {
        console.log( "AUTHENTICATION ERROR : " , err.message)
        res.status(403).json({ ok : false , message : "authentication error"})
        return 
    }
    

    next()
}

module.exports = auth