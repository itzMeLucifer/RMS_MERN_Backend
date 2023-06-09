import mongoose from 'mongoose'

const requestSchema  = mongoose.Schema({
    userId:{
        type:String
    },
    productType:{
        type:String,
    },
    issueType:{
        type:Array
    },
    fileUrl:{
        type:String,
        default:''
    },
    filePublicId:{
        type:String,
        default:''
    },
    desc:{
        type:String
    },
    file:{
        type:String
    },
    status:{
        type:String,
        default:'Created'
    },
    supportPersonId:{
        type:String,
        default:''
    }
},{
    timestamps: true
})

const requests = mongoose.model('requests',requestSchema)

export default requests
