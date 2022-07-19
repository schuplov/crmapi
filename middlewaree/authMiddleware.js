const jwt = require('jsonwebtoken')
const {secret} = require('../config/config.server')

const Response = require('../controllers/services/ResponseController')

module.exports = function(req, res, next) {
    if(req.method === 'OPTIONS'){
        next()
    }
    try{
        const token = req.headers.authorization.split(' ')[1]
        if (!token){
            return Response['401'](res, 'Пользователь не авторизован', 'unauthorized')
        }
        const decodedData = jwt.verify(token, secret)
        req.user = decodedData
        next()
    } catch (e){
        return Response['401'](res, 'Пользователь не авторизован', 'unauthorized')
    }

};