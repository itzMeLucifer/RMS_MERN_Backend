import jwt from 'jsonwebtoken'

export const auth = (req, res, next) => {
    try {
        const token = req.header("Authorization")
        if(!token) return res.status(401).json({msg: "Invalid Authentication."})

        jwt.verify(token, process.env.ACCESS_KEY, (err, user) => {
            if(err) return res.status(401).json({msg: "Invalid Authenticatiodn."})

            req.user = user
            next()
        })
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}
