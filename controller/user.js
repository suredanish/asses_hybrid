"use_strict";
const SELLER_MODEL = require("../models/seller")
const BUYER_MODEL = require("../models/buyer")
const MODEL = require("../models/user");
class User {

    async doesUserExist(email){
        try{
            const result = await MODEL.getUser(email);

            return result[0] || false;

        }
        catch(err){
            console.error(err);
            throw(err)
        }
    }
    async registerUser(info){
        try{
            const result = await MODEL.registerUser(info);
            info.user_id = result?.insertId ;
            
            const result2 = info.type == "seller" ? await SELLER_MODEL.registerSeller(info) : "buyer" ? await BUYER_MODEL.registerBuyer(info):0;
            return {id:result.insertId, type : info.type};
    
        }
        catch(err){
            console.error(err);
            throw(err)
        }
    }

    async getUserById(id){
        try{
            const result = await MODEL.getUserById(id);

            return result[0];
        }
        catch(err){
            console.error(err);
            throw(err)
        }
    }
}

module.exports = new User();