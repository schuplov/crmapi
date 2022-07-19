const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')
const { secret } = require('../config/config.server')

const db = require('../schemas/index')
const Response = require("./services/ResponseController");
const User = db.user



// generate jwt token
const generateAccessToken = (id, roles) => {
    const payload = {
        id, 
        roles
    }
    return jwt.sign(payload, secret, {expiresIn:'36h'})
}

class authController {
    async registration (req, res) {
        try{
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(200).json({
                    info:{
                        message: 'Ошибка при регистрации', 
                        type: 'validation_error',
                        errors, 
                        success: false
                    }
                   
                })
            }
            const {email, password, firstname, lastname} = req.body
            const candidate         =       await User.findOne(  {}, { where: {email: email} });
            if(candidate){
                return res.status(200).json(
                    {
                        info:{
                            message: 'Такой email уже используется',
                            type: 'email is existed',
                            code: 1,
                            success: false
                        }
                        
                })
            }

            //creating user
            const hashPassword = bcrypt.hashSync(password, 10)
            await User.create({email: email, firstname: firstname, lastname: lastname, password: hashPassword});
            return Response["200"](res, 'Пользователь успешно создан', 'createUser', null)

        } catch (e){
            console.log(e);
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
        }    
    }

    async login (req, res) {
        try{
            const {email, password} = req.body
            const user = await User.findOne({attributes: ['id','email', 'password', 'status', 'admin', 'firstname', 'lastname'], where: {email: email}})
            if (!user){
                return res.status(200).json({
                    info: {
                        code: 1,
                        message: 'Пользователь не найден', 
                        type: 'error_login',
                        success: false
                    }
                    
                })
            }
            
            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword){
                return res.status(200).json({
                    info:{
                        code: 2,
                        message: 'Пароль неверный', 
                        type: 'error_password',
                        success: false
                    }
                   
                })
            }
            
            const tokenuser = generateAccessToken(user.id, user.firstname, user.lastname, user.email)
            return res.status(200).json({
                info:{
                    code: 3,
                    user_id: user.id,
                    user_email: user.email,
                    user_firstname: user.firstname,
                    user_lastname: user.lastname,
                    token: tokenuser,
                    success: true
                }
               
            })
        } catch (e){
            console.log(e); 
        } 
    } 

}

module.exports = new authController()