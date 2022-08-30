"use_strict";
class User {


    async registerBuyer(info){
        try{
            const result = await writeDB.query(`
                INSERT INTO buyer(user_id,name)
                VALUES(?, ?)
            `, info.user_id,info.name);

            return result
        }
        catch(err){
            console.error(err);
            throw(err)
        }
    }

    


}

module.exports = new User();