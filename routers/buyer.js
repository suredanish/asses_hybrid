const ROUTER = require('express').Router();
const SELLER_CONTROLLER = require("../controller/seller")
const ORDER_CONTROLLER = require("../controller/order")

//Creating user routes to fetch users data
ROUTER.get('/buyer/listofsellers', async (req, res) => {
    try {
        const listOfSellers = await SELLER_CONTROLLER.getAllSellers();
        
        return res.json({ sellers: listOfSellers })
    } catch (error) {
        return res.json({ error: error });
    }
})

ROUTER.get ('/buyer/seller-catalog/:seller_id', async(req,res) => {
    try{
        const sellerId = req.params.seller_id;
        const result = await SELLER_CONTROLLER.getCatalogOnSellerId(sellerId)

        return res.send({data: result})
    }
    catch(error){
        console.error(error);
        throw error;
    }
})

ROUTER.post ('/buyer/create-order/:seller_id', async (req,res) => {
    try{
        const sellerId = req.params.seller_id;
        console.log(sellerId);
        productList = req.body.product_list;
        const result = await ORDER_CONTROLLER.bookOrder(productList, sellerId, req.user.id);


        return res.send(result)
    }
    catch(error){
        console.error(error);
        throw error;
    }
})



module.exports = ROUTER;
