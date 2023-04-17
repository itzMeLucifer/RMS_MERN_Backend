import ISSUES from '../models/issue.js'

export const issueController = {
    getIssues : async(req,res) => {
        try {
            const issues = await ISSUES.find({productId:req.params.id});
            if(!issues)
                return res.status(400).json({msg:'No Issues found for this product.'})
            const result = []
            for (let i = 0; i < issues.length; i++) {
                result.push(issues[i].issue)
            }
            return res.status(200).json({issues:result}) 
        } catch (error) {
            return res.status(500).json({msg:error.message})
        }

    }
}