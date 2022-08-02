const mongoose = require("mongoose")


let subCategorySchema = new mongoose.Schema({

    title : {
        type : String ,
        trim : true ,
        required : true ,
        minLength : 3 ,
        maxLength : 50 
    } ,

    amount : {
        type : Number ,
        required : true ,
        min : 0 
    } ,

    note : {
        type : String ,
        minLength : 0 ,
        maxLength : [ 40 , " Note cannot be greater than 40 characters"]
    }

})

let categorySchema = new mongoose.Schema({

    title : {
        type : String ,
        trim : true ,
        required : true
    } ,

    amount : {
        type : Number ,
        required : true ,
        min : 0 
    } ,

    subCategory : [ subCategorySchema ]

})

let budgetSchema = new mongoose.Schema({

    category : [ categorySchema ],
    incomeTags : [ { type : String , trim : true  }] , 
    expenseTags : [ { type : String , trim : true }] ,
    categoryTags : [ { type : String , trim : true }] , 
    subCategoryTags : [ {

        subCategory : {
            type : String , 
            trim : true ,
            required : true
        } ,
        mainCategory : {
            type : String , 
            trim : true ,
            required : true
        }

    } ] ,
     
    monthlyIncome : [ { type : Number , required : true } ] ,
    monthlyExpense : [ { type : Number , required : true} ] ,

    transactions : [

        {
            id : {
                type : String , 
                required : true , 
                length : 8
            } ,
            type : {
                type : String ,
                required : true , 
                enum : ["income" , "expense" , "transfer"]
            } ,
            to : {
                type : String ,
                required : true 
            } ,
            from : {
                type : String , 
                required : true
            } ,
            amount : {
                type : Number ,
                min : 0 ,
                required : true 
            } , 

            date : { type : Date , required : true}
        }

    ]

})

module.exports =  budgetSchema













