import REQUESTS from '../models/request.js'
import USERS from '../models/user.js';
import PRODUCTS from '../models/product.js'
import cloudinary from 'cloudinary'
const imageCloud = cloudinary.v2

export const requestController = {
    createRequest : async(req,res) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Methods', '*');
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        try {
            const file = req.files?.originalFile
            imageCloud.config({
                cloud_name: process.env.IMAGGE_CLOUD_NAME,
                api_key: process.env.IMAGGE_CLOUD_API_KEY,
                api_secret: process.env.IMAGGE_CLOUD_API_SECRET
            });
            if(file){
                const res = await imageCloud.uploader.upload(file.tempFilePath)
                req.body.fileUrl = res.url
                req.body.filePublicId=res.public_id
            }
            const newRequest = new REQUESTS({...req.body});
            const savedRequest = await newRequest.save();
            var user = await USERS.findById(req.user.id)
            await user.updateOne({$push:{requests:savedRequest._id.toString()}})
            
            return res.status(200).json({request:savedRequest});
        } catch (error) {
            console.log(error.message)
            return res.status(500).json({msg:error.message});
        }
    },
    getMyRequests: async(req,res) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Methods', '*');
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        try{
            const user = await USERS.findById(req.params.id)
            if(!user)
                return res.status(400).json({msg:'This user does not exist.'})
            const requests = await Promise.all(
                user.requests.map(item => {
                    return REQUESTS.findById(item)
                })
            )
            return res.status(200).json({requests:[...requests]})
        }
        catch(error){
            console.log(error.message)
            return res.status(500).json({msg:error.message})
        }
    },
    getInfo: async(req,res) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Methods', '*');
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        try{
            const request = await REQUESTS.findById(req.params.id)
            if(!request)
                return res.status(400).json({msg:'This request does not exist.'})
            const user = await USERS.findById(request.userId)
            const product = await PRODUCTS.findById(request.productType)
            return res.status(200).json({user,product})
        }
        catch(error){
            return res.status(500).json({msg:error.message})
        }
    },
    getInfoForAdmin : async(req,res) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Methods', '*');
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        try{
            const request = await REQUESTS.findById(req.params.id)
            if(!request)
                return res.status(400).json({msg:'This request does not exist.'})
            var user = {}
            if(request.supportPersonId === '')
                user = await USERS.findById(request.userId)
            else
                user = await USERS.findById(request.supportPersonId)
            const product = await PRODUCTS.findById(request.productType)
            return res.status(200).json({user,product})
        }
        catch(error){
            return res.status(500).json({msg:error.message})
        }
    },
    getEmployeeRequests: async(req,res) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Methods', '*');
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        try {
            const user = await USERS.findById(req.params.id)
            if(!user)
                return res.status(400).json({msg:'This user does not exist.'})
    
            const requests = await REQUESTS.find({supportPersonId:req.params.id})
            return res.status(200).json({requests})
        } catch (error) {
            console.log(error.message)
            return res.status(500).json({msg:error.message})
            
        }
    },
    getAllRequests: async(req,res) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Methods', '*');
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        try{
            var requests = await REQUESTS.find()
            if(!requests)
                return res.status(200).json({requests:[]})
            return res.status(200).json({requests:requests})
        }
        catch(error){
            console.log(error.message)
            return res.status(500).json({msg:error.message})
        }
    },
    updateRequest: async(req,res) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Methods', '*');
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        try {
            const oldRequest = await REQUESTS.findById(req.body._id)
            if(!oldRequest)
                return res.status(400).json({msg:'Request not found.'})
            await REQUESTS.findByIdAndUpdate(req.body._id,{...req.body})
            const updatedRequest = await REQUESTS.findById(req.body._id)
            return res.status(200).json(updatedRequest)
        } catch (error) {
            console.log(error.message)
            return res.status(500).json({msg:error.message})
        }
    }
}