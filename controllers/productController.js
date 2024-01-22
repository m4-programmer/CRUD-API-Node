const {success, error} = require('../helpers/apiHelper')
const Product = require('../models/productModels')

const getProduct = async(req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).send(success("product retrieved successfully",products))
    } catch (e) {
        console.log(e.message)
        res.status(500).json(error(e.message))        
    }
}

const postProduct = async(req, res)=>{
    try {
        const product = await Product.create(req.body)
        res.status(200).send(success("product created successfully",product))

    } catch (err) {   
        console.log(err.message)
        res.status(500).json(error(err.message))
    }
};

const getSingleProduct = async(req, res)=>{
    try {
        const {id} = req.params
        const product = await Product.findById(id)
        res.send(success("product retrieved successfully", product))

    } catch (err) {   
        console.log(err.message)
        res.status(500).json(error(err.message))
    }
}

const updateProduct = async(req, res)=>{
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
}

const deleteProduct = async(req, res)=>{
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
}

module.exports = {
    getProduct,
    postProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct
}