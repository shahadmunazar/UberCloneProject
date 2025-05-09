const dotenv = require('dotenv')
dotenv.config();
const cors = require('cors');
const express = require("express")
const app = express();
const connectToDb = require("./db/db")
connectToDb();
app.use(cors());
app.use(express.urlencoded({extended:true}))
app.use(express.json());

const UserRoutes = require("./routes/user.routes");
const { json } = require('body-parser');

app.get("/", (req,res)=>{
    res.send("Hello World");
})

app.use('/user', UserRoutes)
module.exports = app