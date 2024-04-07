const express = require('express')
const mongoose = require('mongoose')
const asyncHandler = require('express-async-handler')
const PORT = process.env.PORT || 1000
const connectDB = require('./config/db')
const donenv = require('dotenv').config()


const app = express()

connectDB()



app.listen(PORT, () => {
    console.log(`Server is listening at port ${PORT}`)
})