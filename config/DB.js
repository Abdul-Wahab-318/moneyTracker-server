const mongoose = require("mongoose")

const URI = "mongodb+srv://wahabmaliq:steel321@cluster0.kwevt.mongodb.net/moneyTracker?retryWrites=true&w=majority"

const connectDB = async () => {
    await mongoose.connect(
        URI ,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    ).then( data => console.log( "connected to database" )).catch( err => console.log(err))
}


module.exports = connectDB
