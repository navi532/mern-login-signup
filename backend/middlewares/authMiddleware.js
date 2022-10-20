const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');


const protect = asyncHandler( async (req,res,next) => {

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){

        try {
            const db = req.app.get('db');
            //Extract token from header
            let token = req.headers.authorization.split(' ')[1];

            //Verify token
            const decoded  = jwt.verify(token,process.env.JWT_SECRET);
            //Get User from token and add it to request object 
            const sql = `SELECT * FROM users WHERE id='${decoded.id}'`;
            const [[user],metaData] = await db.promise().query(sql);
            

            delete user.password;
            delete user.created_at;
            delete user.updated_at;
            req.user = user;

            next();
        }
        catch (err){
            res.status(401);
            throw new Error('Not authorized ' + err.message);
        }
    }
    else{
        res.status(401);
        throw new Error('Not Authorized,No token available');
    }
});

module.exports = {protect};