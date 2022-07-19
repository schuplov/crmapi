const jwt = require('jsonwebtoken')
const {secret} = require('../config/config.server')
const Response = require("../controllers/services/ResponseController");

module.exports = function(roles) {
    return function(req,res,next){
        if(req.method === 'OPTIONS'){
            next()
        }        
        try {
            
            const token = req.headers.authorization.split(' ')[1]
            if (!token){
                return Response['401'](res, 'Пользователь не авторизован', 'unauthorized')
            }
            const DecodedDate = jwt.verify(token, secret)
            let hasRole = false
            if(DecodedDate.admin === roles){
                hasRole = true
            }
            if (!hasRole){
                return Response['403'](res, 'Недостаточно прав', 'doesnt_permissions')
            }
            req.user = DecodedDate
            next()
        } catch (e){
            return Response['403'](res, 'Недостаточно прав', 'doesnt_permissions')
        }
    }
}