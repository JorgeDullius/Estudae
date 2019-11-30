const sequelize = require("../server")
const user = sequelize.import('../models/User');
const Sequelize = require('sequelize');


class UserController{
    async getUser(req,res){
        try{
            const { dataValues } = await user.findOne({ where: { id: req.userId }});
            const userData = dataValues;
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
            if(await user.findOne({ where: {email: email, id: {[Sequelize.Op.ne]: req.userId}}})){
                res.status(400).json(['This email is already in use']);
            }
            const response = await user.update( { name: name, password : password, email: email }, { where: { id: req.userId } });
            res.status(200).json(response);
        } catch (error) {
            error = error.errors.map((element) => {
                return element.message
            })
            res.status(400).json(error);
        }
    }

}
module.exports = new UserController();