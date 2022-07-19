const Router = require('express')
const router = Router()
const controller = require('../controllers/apiController')
const roleMiddleware = require('../middlewaree/roleMiddleware')
const authMiddleware = require('../middlewaree/authMiddleware')

const { check } = require('express-validator')


router.post('/order', [
    check('api_key', 'Поле не может быть пустым').notEmpty(),
    check('product', 'Поле не может быть пустым').notEmpty()
], controller.order)


module.exports = router 