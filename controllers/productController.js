import PRODUCTS from '../models/product.js'

export const productController = {
    getProducts : async(req,res) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Methods', '*');
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        try {
            const products = await PRODUCTS.find();
            return res.status(200).json(products)
        } catch (error) {
            console.log(error.message)
            return res.status(500).json({msg:error.message})
        }
    }
}