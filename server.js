const express = require('express')
const mongoose = require('mongoose')
const mongodbPassword = require('./password')
const {getProduct, deleteProduct, updateProduct, getSingleProduct, postProduct, } = require('./controllers/productController')
const app = express()


//middleware
app.use(express.json())



app.get('/', (req, res)=>{
    res.send(success("Hello Working"))
})
//routes
app.get('/product', getProduct)

app.post('/product', postProduct)

app.get('/product/:id', getSingleProduct)

app.put('/product/:id', updateProduct)

app.delete('/product/:id', deleteProduct)



mongoose.connect("mongodb+srv://sloovi:"+ mongodbPassword.MongoPassword+"@template.t6v0y.mongodb.net/Node-API?retryWrites=true&w=majority")
.then(()=>{
    app.listen(3000, () => console.log('listening on port 3000'))
    console.log('Connected to MongoDB')
})
.catch((e)=>{
    console.log(e)
})
