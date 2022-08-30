"use_strict";

const MODEL = require("../models/seller");
const PRODUCT_MODEL = require('../models/product')
class Seller {

    async getAllSellers(){
        try{
            const result = await MODEL.getAllSellers();
            return result;

        }
        catch(err){
            console.error(err);
            throw(err)
        }
    }

    async getCatalogOnSellerId(sellerId) {
        try{
            const result = await PRODUCT_MODEL.getAllProductsOnSellerId(sellerId);
            return result;
        }
        catch(err){
            console.log(err);
            throw err
        }
    }

     
}

module.exports = new Seller();