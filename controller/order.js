"use_strict";

const MODEL = require("../models/order");
const PRODUCT_MODEL = require('../models/product')
const PRODUCT_CONTROLLER = require('../controller/product')
var crypto = require("crypto");
class Seller {

    async bookOrder(productList, sellerId, buyerId){
        try{

            const orderId = buyerId + crypto.randomBytes(5).toString("hex");

            const verifiedProducts = await PRODUCT_CONTROLLER.verifyProducts(productList,sellerId);

            const totalPrice = productList.reduce((acc, product)=> acc + Number(product.price) ,0);

            console.log(totalPrice,orderId);
            const productIds = productList.map(product => product.id);
            const info = {
                orderId:orderId,
                totalPrice:totalPrice,
                productIds:productIds,
                buyerId: buyerId,
                sellerId : sellerId
            }
            const result = await MODEL.bookOrder(info);
            
            return {orderId: orderId}

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