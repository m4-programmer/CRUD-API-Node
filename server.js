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
app.get('/product', async(req, res)=>{
    try {
        const products = await Product.find({});
        res.status(200).send(success("product retrieved successfully",products))
    } catch (e) {
        console.log(e.message)
        res.status(500).json(error(e.message))        
    }
})

app.post('/product', async(req, res)=>{
    try {
        const product = await Product.create(req.body)
        res.status(200).send(success("product created successfully",product))

    } catch (err) {   
        console.log(err.message)
        res.status(500).json(error(err.message))
    }
})

app.get('/product/:id', async(req, res)=>{
    try {
        const {id} = req.params
        const product = await Product.findById(id)
        res.send(success("product retrieved successfully", product))

    } catch (err) {   
        console.log(err.message)
        res.status(500).json(error(err.message))
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
