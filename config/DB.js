const mongoose = require("mongoose")

const connectDB = async () => {
    await mongoose.connect(
        'mongodb://localhost/moneyTracker' ,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    ).then( data => console.log( "connected to database" )).catch( err => console.log(err))
}


module.exports = connectDB
