"use_strict";
class Product {

    async getProductsOnProductIdsAndSellerId(productIds, sellerId){
        try{
            const result = await readDB.query(`
                SELECT 
                    *
                FROM
                    product
                WHERE
                    seller_id = ${sellerId} AND 
                    id IN (${productIds.join(', ')});
            `, sellerId, productIds);

            return result
        }
        catch(err){
            console.error(err);
            throw(err)
        }
    }

    async getAllProductsOnSellerId(sellerId){
        try{
            const result = await readDB.query(`
                SELECT 
                    *
                FROM 
                    product 
                WHERE
                    seller_id = ?
            `, sellerId)

            return result;
        }

        catch(err){
            console.log(err);
            throw err;
        }
    }

   

}

module.exports = new Product();