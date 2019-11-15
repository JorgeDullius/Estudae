const sequelize = require("../server")
const user = sequelize.import('../models/User');

class UserController{
    async getUserByEmail(req,res){
        try{
            const userData = await user.findOne({ where: {email: req.params.email}});
            if(!userData){
                res.status(400).json({error : "User not found" })
            }
            res.json(userData);
        }catch(e){
            res.status(400).json({error : `${e}`});
        }
    }
}
module.exports = new UserController();