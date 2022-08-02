const express = require("express")
const cors = require("cors")
const app = express()
const cookieParser = require("cookie-parser")
const connectDB = require("./config/DB")
const PORT = process.env.PORT || 5000
let userRoute = require("./routes/user")
let budgetRoute = require("./routes/budget")

app.listen( PORT , () => {
    console.log( `Server running at PORT ${PORT}`)
})

connectDB()

// for parsing JSON
app.use(express.json())
//for parsing cookies ( ery noice )
app.use(cookieParser())

// allows cross origin resource sharing
app.use(cors({
    origin : [ "http://localhost:3000" ] ,
    credentials : true 
}))


app.use("/user" , userRoute )

app.use("/budget" , budgetRoute )










