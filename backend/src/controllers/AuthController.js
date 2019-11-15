const sequelize = require("../server")
const user = sequelize.import('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

function generateToken(userId = {}){
    const token = jwt.sign(userId, authConfig.secret,{
        expiresIn: 86400,
    });
    return token;
}
class AuthController{
    async register(req,res){
        try{
            if(!req.body.name || req.body.name.trim() == ''){
                res.status(400).json({error : "Please type your name"});
            }
            if(!req.body.password || req.body.password.trim() == ''){
                res.status(400).json({error : "Please type your password"});
            }
            if(!req.body.email || req.body.email.trim() == ''){
                res.status(400).json({error : "Please type your email"});
            }
            if(await user.findOne({ where: {email: req.body.email}})){
                res.status(400).json({error : "User already exist"});
            }
            const userData = await user.create(req.body);

            userData.password = undefined;
            const token = generateToken({id: userData.id});
            res.send({userData, token});
        }catch(e){
            res.status(500).json({error : `${e}`});
        }
    }
    async authenticate (req,res){
        try{
            const { email, password} = req.body;

            const userData = await user.findOne({ where: {email: email}});
            if(!userData){
                res.status(400).json({error : "User not found" })
            }
            if(!await bcrypt.compare(password, userData.password)){
                res.status(400).send({error : 'Invalid password'});
            }
            userData.password = undefined;
            const token = generateToken({id: userData.id});
            res.send(token);
        }catch(e){
            console.log(e);
            res.status(500).json({error : `${e}`});
        }
    }
}

module.exports = new AuthController();