const ROUTER = require('express').Router();

const USER_CONTROLLER = require('../controller/user')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//Creating register route
ROUTER.post("/register", async (req, res) => {

    try {
        const { name, email, password ,type} = req.body;
        //Check emptyness of the incoming data
        if (!name || !email || !password || !type) {
            return res.json({ message: 'Please enter all the details' })
        }
        console.log(123);
        //Check if the user already exist or not
        const userExist = await USER_CONTROLLER.doesUserExist(email);
        if (userExist) {
            return res.json({ message: 'User already exist with the given emailId' })
        }
        
        //Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashPassword;
        const user = await USER_CONTROLLER.registerUser(req.body)
        console.log("user.id", user.id)
        const token = await jwt.sign({ id: user.id, type: user.type }, process.env.SECRET_KEY, {
            expiresIn: process.env.JWT_EXPIRE,
        });
        return res.header("Authorization", "Bearer " + token).json({ success: true, message: 'User registered successfully', data: user })
        
    } catch (error) {
        return res.json({ error: error });
    }

})
//Creating login routes
ROUTER.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        //Check emptyness of the incoming data
        if (!email || !password) {
            return res.json({ message: 'Please enter all the details' })
        }
        //Check if the user already exist or not
        const userExist = await USER_CONTROLLER.doesUserExist(email);
        if(!userExist){
            return res.json({message:'Wrong credentials'})
        }
        //Check password match
        console.log("user",userExist);
        const isPasswordMatched = await bcrypt.compare(password,userExist.hashed_password);
        if(!isPasswordMatched){
            return res.json({message:'Wrong credentials pass'});
        }
        const token = await jwt.sign({ id: userExist.id }, process.env.SECRET_KEY, {
            expiresIn: process.env.JWT_EXPIRE,
        });
        return res.header("auth", token).json({success:true,message:'LoggedIn Successfully'})
    } catch (error) {
        return res.json({ error: error });
    }

})



module.exports = ROUTER;
