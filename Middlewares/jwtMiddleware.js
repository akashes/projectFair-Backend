const jwt= require('jsonwebtoken')

const jwtMiddleware=(req,res,next)=>{

    console.log('inside jwt middleware');
    //token verification
    //get token from reqheader
    const token = req.headers['authorization']?.slice(7)
    console.log(token);
    //verifying token
    try{
        const tokenVerification = jwt.verify(token,"superKey2024")
        console.log(tokenVerification);
        req.payload = tokenVerification.userId
        next()


    }catch(err){
        res.status(401).json("Authorization failed... Please login again")
    }

}

module.exports=jwtMiddleware