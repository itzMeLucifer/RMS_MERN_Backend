import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    username:{
        type:String,
        trim:true
    },
    password:{
        type:String,
        trim:true
    },
    requests:{
        type:Array
    },
    userType:{
        type:Number,
        default:0 //0:employee,1:cutomer
    }
},{
    timestamps:true
})

const users = mongoose.model('users',userSchema)

export default users