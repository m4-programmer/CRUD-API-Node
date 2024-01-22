const express = require('express')
const mongoose = require('mongoose')
const mongodbPassword = require('./password')
const Product = require('./models/productModels')
const {getProduct, } = require('./controllers/productController')
const app = express()


//middleware
app.use(express.json())
// 65ae2bebe3af0438551651cd


app.get('/', (req, res)=>{
    res.send(success("Hello Working"))
})
//routes
app.get('/product', getProduct)

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

app.put('/product/:id', async(req, res)=>{
    try {
        const {id} = req.params
        const product = await Product.findByIdAndUpdate(id, req.body);
        if (!product) {
            res.status(404).json(error("product not found", [], 404))
        }
        const updatedProduct = await Product.findById(id)
        res.send(success("product updated successfully", updatedProduct))

    } catch (err) {   
        console.log(err.message)
        res.status(500).json(error(err.message))
    }
})

app.delete('/product/:id', async(req, res)=>{
    try {
        const {id} = req.params
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            res.status(404).json(error("product not found", [], 404))
        }
        // const updatedProduct = await Product.findById(id)
        res.send(success("product deleted successfully"))

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
