const express = require('express');
const app = express();
app.use(express.json());
const dotenv = require('dotenv');
const cookieParser = require("cookie-parser")

dotenv.config({path:'./config/config.env'});
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser()); 
require('./storage')();


const router = require('./routers/index');
const isAuthenticated = require('./middleware/auth');
app.use('/api', router.auth);
app.use("/api", require("./middleware/auth").isAuthenticated)
app.use("/api", router.user)
app.use("/api", router.buyer)

app.listen(3000,() => console.log(`Server is listening at 3000`))