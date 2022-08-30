const USER_CONTROLLER = require('../controller/user')
const jwt = require('jsonwebtoken');


const isAuthenticated = async (req,res,next)=>{
    try {
        let token = req.header('Authorization');
        token = token.split(" ")[1]
        console.log("token", token);
        if(!token){
            return next('Please login to access the data');
        }
        const verify = await jwt.verify(token,process.env.SECRET_KEY);
        req.user = await USER_CONTROLLER.getUserById(verify.id);
        next();
    } catch (error) {
       res.json({error:error})
    }
}

module.exports = {isAuthenticated};