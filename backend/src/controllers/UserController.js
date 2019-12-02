const sequelize = require("../server")
const user = sequelize.import('../models/User');
const profilePicture = sequelize.import('../models/ProfilePicture');
const Sequelize = require('sequelize');


class UserController{
    async getUser(req,res){
        try{
            const userData  = await user.findOne({ where: { id: req.userId }});
            if(!userData){
                res.status(400).json({error : "User not found" })
            }
            res.status(200).json(userData);
        }catch(e){
            res.status(400).json({error : `${e}`});
        }
    }
    async setUser(req,res){
        try {
            const { name, password, email } = req.body;
            if(!req.body.name || req.body.name.trim() == ''){
                res.status(400).json({error : "Please type your name"});
            }else if(!req.body.password || req.body.password.trim() == ''){
                res.status(400).json({error : "Please type your password"});
            }else if(req.body.password.trim()<6){
                res.status(400).json({error : "Please enter a password longer than 6 characters"});
            }
            else if(!req.body.email || req.body.email.trim() == ''){
                res.status(400).json({error : "Please type your email"});
            }else if(await user.findOne({ where: {email: email, id: {[Sequelize.Op.ne]: req.userId}}})){
                res.status(400).json({error : "User already exist"});
            }else{
                const response = await user.update( { name: name, password : password, email: email }, { where: { id: req.userId } });
                if(response > 0){
                    res.status(200).json("Perfil editado com sucesso!");
                }
            }
        } catch (error) {
            res.status(500).json({error : `${e}`});
        }
    }
    async setUserProfilePicture(req,res){
        try{
            const { originalname: name, filename: key, size } = req.file;
            const picture = await profilePicture.findOne({ where: { UserId: 1 }});
            if(!picture){
                const response = await profilePicture.create({
                    name,
                    key,
                    size,
                    url:"",
                    UserId: 1
                });
                res.json(response)
            }else{
                const response = await profilePicture.update({ name, key, size, url:""}, { where: { UserId: 1 } });
                res.json(response)
            }
        }catch(e){
            res.status(400).json({error : `${e}`});
        }

    }

}
module.exports = new UserController();