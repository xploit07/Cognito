import jwt from 'jsonwebtoken';


const userAuth = async (req, res, next) => {
    const {token} = req.cookies;

    if (!token) {
        return res.json({success: false, message: "User not authenticated"});
    }
    try {
        const decodeToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        
        if(decodeToken.id){
            req.body.userId = decodeToken.id;
        }
        else{
            return res.json({success: false, message: "User not authenticated, login again"});
        }
        next();
    
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}

export default userAuth;