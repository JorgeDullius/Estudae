const sequelize = require("../server")
const user = sequelize.import('../models/User');

class UserController{
    async getUser(req,res){
        try{
            const { dataValues } = await user.findOne({ where: { id: req.userId }});
            const userData = dataValues;
            console.log(userData);
            if(!userData){
                res.status(400).json({error : "User not found" })
            }
            res.status(200).json(userData);
        }catch(e){
            res.status(400).json({error : `${e}`});
        }
    }
    async setUser(req,res){
        /*todo*/
    }

}
module.exports = new UserController();