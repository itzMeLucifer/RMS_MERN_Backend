
import jwt from 'jsonwebtoken'

export const authHelper = {
    createAccessToken: (payload) => {
        return jwt.sign(payload,process.env.ACCESS_KEY,{expiresIn:'10d'});
    },
}