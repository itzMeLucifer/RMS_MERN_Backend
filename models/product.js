import mongoose from "mongoose";

const productSchema = mongoose.Schema(
    {
        product:{
            type:String
        },
        issueId:{
            type:Array
        }
    },
    {
        timestamps:true
    }
)

const products = mongoose.model('products',productSchema)

export default products