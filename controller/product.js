"use_strict";

const MODEL = require("../models/order");
const PRODUCT_MODEL = require('../models/product')
const PRODUCT_CONTROLLER = require('../controller/product')
var crypto = require("crypto");
class Product {

 

    async verifyProducts(productsList, sellerId) {
        try{
            
            const productIds = productsList.map (product => product.id);

           

            const dbProductList = await PRODUCT_MODEL.getProductsOnProductIdsAndSellerId(productIds, sellerId);

            // Cross checking product in request with db
            let result = true;
            let map ={};
            productsList.forEach(product => {
                map[product.id] = product.price;
            });

            for(let i = 0; i < dbProductList.length; i++) {
                result &= map[dbProductList[i].id] == dbProductList[i].price;
            }
            console.log(productsList);
            console.log(dbProductList);
            result &= productsList.length == dbProductList.length;

            return result;

        }
        catch(err){
            console.log(err);
            throw err
        }
    }

     
}

module.exports = new Product();