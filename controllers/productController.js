import PRODUCTS from '../models/product.js'

export const productController = {
    getProducts : async(req,res) => {
        try {
            const products = await PRODUCTS.find();
            return res.status(200).json(products)
        } catch (error) {
            return res.status(500).json({msg:error.message})
        }
    }
}