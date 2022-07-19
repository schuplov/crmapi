const Router = require('express')
const router = Router()
const controller = require('../controllers/authController')
const { check } = require('express-validator')
const roleMiddleware = require('../middlewaree/roleMiddleware')
const authMiddleware = require('../middlewaree/authMiddleware')



// auth
router.post('/registration',[
    check('email', 'Неверный формат').matches('(?:[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])'),
    check('firstname', 'Поле имя пользователя не может быть пустым').notEmpty(),
    check('lastname', 'Поле имя пользователя не может быть пустым').notEmpty(),
    check('password', 'Пароль должен быть больше 4 и меньше 16 символов').isLength({min: 4, max: 16})
], controller.registration)
router.post('/login', controller.login)
// cabinet


module.exports = router 