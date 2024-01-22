const {success, error} = require('../helpers/apiHelper')

const getProduct = async(req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).send(success("product retrieved successfully",products))
    } catch (e) {
        console.log(e.message)
        res.status(500).json(error(e.message))        
    }
}


module.exports = {
    getProduct
}