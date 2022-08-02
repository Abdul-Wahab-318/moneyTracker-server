const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
let budgetSchema = require("./budgetSchema")


let commonString = ( name ) => {
    return {
        type : String ,
        required : [ true , `${name} is required`] ,
        minLength : 2 ,
        maxLength : 40 
    }
}

let userSchema = new mongoose.Schema({

    firstName : commonString("first name") ,

    lastName : commonString("last name") ,

    email : {
        ...commonString("email is required") ,
        unique : true 
    } ,

    password : commonString("password") ,

    DOB :{
        type : Date ,
        required : [ true , "Date of birth is required" ] , 
        validate : {
            validator : date => {
                if( date.getTime() > new Date().getTime() )
                return false
            } , 
            message : props =>  " invalid date of birth"
        }
    } , 

    budget : {
        type : budgetSchema ,
        required : true 
    }

})

userSchema.pre("save" , async function() {
    if ( this.isModified("password"))
    this.password = await bcrypt.hash(this.password , 10)
})

userSchema.methods.getJWT = function () {
    return jwt.sign( { _id : this._id , email : this.email } , "bingChungus123*%#&")
}

userSchema.methods.checkPassword = async function ( enteredPassword ) {
    return await bcrypt.compare( enteredPassword , this.password )
}

module.exports = mongoose.model("user" , userSchema)




















