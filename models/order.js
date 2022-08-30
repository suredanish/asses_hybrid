"use_strict";
class Order {


    async bookOrder(info){
        console.log(info);
        try{

            console.log(info.totalPrice);
            const result = await writeDB.query("INSERT INTO `order` (`id`, `buyer_id`, `seller_id`, `products`, `total_price`) VALUES (?, ?, ?, ?, ?);", info.orderId, info.buyerId, info.sellerId, info.productIds.join(", "),info.totalPrice);
 

            return result
        }
        catch(err){
            console.error(err);
            throw(err)
        }
    }

    


}

module.exports = new Order();