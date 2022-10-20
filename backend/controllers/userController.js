const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const populateDB = require("../utility/populateDB");

const generateToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn : '30d'});
}

// @desc Logins User
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req,res) => {
    const db = req.app.get('db');
    const {email,password} = req.body;
    //Check fields
    if(!email || !password){
        res.status(400);
        throw new Error('Please add all the fields');
    }

    const sql = `SELECT * from users where email='${email}'`;
    const [[user],metaData] = await db.promise().query(sql);



    if(user && await bcrypt.compare(password,user.password)){
        res.status(201).json({message:"Login Successfull !",data : {
            name : user.fullname,
            email: user.email,
            id : user.id,
            token : generateToken(user.id),
        }});
    }
    else{
        res.status(400);
        throw new Error('Invalid Credentials!');
    }
    
});


// @desc Registers User
// @route POST /api/users/register
// @access Public
const registerUser = asyncHandler(async (req,res) => {
    const db = req.app.get('db');

    const {name,email,password} = req.body;

    //Check fields exists
    if(!name){
        res.status(400);
        throw new Error(`'name' field is missing`);
    }
    if(!email){
        res.status(400);
        throw new Error(`'email' field is missing`);
    }
    if(!password){
        res.status(400);
        throw new Error(`'password' field is missing`);
    }
    
    //Validation Checks[TODO]

    //Name should contain alphabets only


    //Valid Email address

    //Password length

    //Check If User already exists
    let sql = `SELECT * FROM users WHERE email = '${email}';`;
    const [userExists] = await db.promise().query(sql);

    if(userExists.length != 0){
        res.status(400);
        throw new Error('User with same email already exists');
    }

    //Hash password
    const hashedPassword = await bcrypt.hash(password,10);

    if(!hashedPassword){
        resp.status(400);
        throw new Error('Hash Service not available');
    }

    //Create user
    sql = `INSERT INTO users(fullname,email,password) VALUES ('${name}','${email}','${hashedPassword}');`
    const [data] = await db.promise().query(sql);
    
    if(data.affectedRows == 0){
        res.status(400);
        throw new Error('User creation unsuccessfull !');
    }

    //Populate Data for that user
    try{
        const populateData = await populateDB(req.app.get('db'),data.insertId);
    }
    catch(err){
        res.status(400);
        throw err;
    }
    

    res.status(201).json({message:"User created successfully !",data : {
        name : name,
        email: email,
        _id :  data.insertId,
        token : generateToken(data.insertId),
    }});
    
});


// @desc Current User
// @route POST /api/users/me
// @access Privcate
const meUser = asyncHandler(async (req,res) => {
    const db = req.app.get('db');

    const sql = `SELECT * from users where id = '${req.user.id}'`;
    const [[user],metaData] = await db.promise().query(sql);
    if(!user){
        res.status(401);
        throw new Error('Internal DB Error');

    }
    res.status(200).json({message:"User Data",data:{name:user.fullname,email:user.email,id:user.id}});
});


module.exports = {
    loginUser,
    registerUser,
    meUser
};