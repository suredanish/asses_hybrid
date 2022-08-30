"use_strict";
class User {
    async getUser(email){
        try{
            const result = await readDB.query(`
                SELECT 
                    *
                FROM
                    user 
                WHERE 
                    email = ?
            `, email);

            return result
        }
        catch(err){
            console.error(err);
            throw(err)
        }
    }

    async registerUser(info){
        try{
            const result = await writeDB.query(`
                INSERT INTO user(email,hashed_password)
                VALUES(?, ?)
            `, info.email,info.password);

            return result
        }
        catch(err){
            console.error(err);
            throw(err)
        }
    }

    async getUserById(id){
        try{
            const result = await readDB.query(`
                SELECT
                 *
                FROM 
                    user 
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
}

module.exports = new User();