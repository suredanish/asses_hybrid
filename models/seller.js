"use_strict";
class Seller {

    async registerSeller(info){
        try{
            const result = await writeDB.query(`
                INSERT INTO seller(user_id, name)
                VALUES(?, ?)
            `, info.user_id,info.name);

            return result
        }
        catch(err){
            console.error(err);
            throw(err)
        }
    }

    async getSellerById(id){
        try{
            const result = await readDB.query(`
                SELECT
                 *
                FROM 
                    seller 
                WHERE
                    id = ?
            `, id);

            return result
        }
        catch(err){
            console.error(err);
            throw(err)
        }
    }

    async getAllSellers(){
        try{
            const result = await readDB.query(`
                SELECT
                    name,
                    id as seller_id
                FROM
                    seller;
            `)
            return result;
        }
        catch(error){
            console.error(error)
            throw error;
        }
    }

   

}

module.exports = new Seller();