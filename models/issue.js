import mongoose from 'mongoose'

const issueSchema = mongoose.Schema(
    {
        issue:{
            type:String
        },
        product:{
            type:String
        }
    },
    {
        timestamps:true
    }
)

const issues = mongoose.model('issues',issueSchema)

export default issues