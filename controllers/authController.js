import USERS from "../models/user.js";
import {authHelper} from '../helpers/authHelper.js'

export const authController = {
    defaultPath: async(req,res) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Methods', '*');
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        try{
            return res.status(200).json({msg:'Working'})
        }catch(error){
            console.log(error.message)
            return res.status(500).json({msg:error.message})
        }
    },
    logIn: async(req,res) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Methods', '*');
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        try {
            const {username,password,userType} = req.body
            if(!username || !password || userType === null){
                return res.status(400).json({msg:'Please provide all credentials.'})
            }
            var user = await USERS.findOne({username:username})
            if(!user)
            return res.status(400).json({msg: "This user does not exist."})

            const isMatch = user.password === password
            if(!isMatch) return res.status(400).json({msg: "Password is incorrect."})

            const isEmployee = user.userType === userType
            if(!isEmployee) return res.status(400).json({msg: userType === 0 ?"You are not an employee.":"You are not an customer."})

            const access_token = authHelper.createAccessToken({id: user._id})

            res.json({msg: "Login success!",token:access_token,user:{username:user.username,id:user._id}})
        } catch (err) {
            console.log(err.message)
            return res.status(500).json({msg:'Something went wrong please try again later.'})
        }
    }
}