import ISSUES from '../models/issue.js'

export const issueController = {
    getIssues : async(req,res) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Methods', '*');
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
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
            console.log(error.message)
            return res.status(500).json({msg:error.message})
        }

    }
}