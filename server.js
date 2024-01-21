const express = require('express')
const mongoose = require('mongoose')
const mongodbPassword = require('./password')
const app = express()


//middleware
// app.use(express.json)


mongoose.connect("mongodb+srv://sloovi:"+ mongodbPassword.MongoPassword+"@template.t6v0y.mongodb.net/Node-API?retryWrites=true&w=majority")
.then(()=>{
    app.listen(3000, () => console.log('listening on port 3000'))
    console.log('Connected to MongoDB')
})
.catch((e)=>{
    console.log(e)
})
