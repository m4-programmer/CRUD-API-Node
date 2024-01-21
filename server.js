const express = require('express')
const mongoose = require('mongoose')
const mongodbPassword = require('./password')
const Product = require('./models/productModels')
const app = express()


//middleware
app.use(express.json())

const success = (message='', data = [], status =200) => {
    return {
        message,
        data,
        status
    }
}

const error = (message, error=[], status =500) =>{
    return {
        message,
        error,
        status
    }
}

app.get('/', (req, res)=>{
    res.send(success("Hello Working"))
})
//routes
app.post('/post', async(req, res)=>{
    try {
        const product = await Product.create(req.body)
        res.status(200).send(success("product created successfully",product))

    } catch (error) {   
        console.log(error.message)
        res.status(500).json(error(error.message))
    }
})

mongoose.connect("mongodb+srv://sloovi:"+ mongodbPassword.MongoPassword+"@template.t6v0y.mongodb.net/Node-API?retryWrites=true&w=majority")
.then(()=>{
    app.listen(3000, () => console.log('listening on port 3000'))
    console.log('Connected to MongoDB')
})
.catch((e)=>{
    console.log(e)
})
