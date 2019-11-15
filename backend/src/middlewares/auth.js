const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

module.exports = (req, res, next) =>{
    const authHeader = req.headers.authorization;

    //Confere se o token foi informado
    if(!authHeader){
        return res.status(401).send({ error : 'No token provided' });
    }

    //Um token é formado por duas partes, uma com a palavra Barer e a outra com um hash
    //Confere se as duas partes foram enviadas

    const parts = authHeader.split(' ');    
    if(!parts.length === 2){
        return res.status(401).send({ error: 'Token malformatted' })
    }

    const [ scheme, token] = parts;

    //Confere se contém a palavra Bearer
    if(!/^Bearer$/i.test(scheme)){
        return res.status(401).send({ error: 'Token malformatted' });
    }
      
    //Confere se o token é válido
    jwt.verify(token, authConfig.secret, (err,decoded) => {
        if(err){
            return res.status(401).send({ error:' Token invalid' });
        }

        req.userId = decoded.id;
        return next();
    });
}
