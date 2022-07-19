const Router = require('express')
const router = Router()
const controller = require('../controllers/businessController')
const roleMiddleware = require('../middlewaree/roleMiddleware')
const authMiddleware = require('../middlewaree/authMiddleware')

const { check } = require('express-validator')

/*
    need to do

    create business (title, image)
    add langing and take key
    all requests
    redaction
    delete
    comment

 */

router.post('/create', [check('title', 'Поле не может быть пустым').notEmpty()],authMiddleware, controller.create)
router.post('/add_shop', [check('company_id', 'Поле не может быть пустым').notEmpty(), check('url', 'Поле не может быть пустым').notEmpty()], authMiddleware, controller.add_shop)
router.get('/get_orders', [
    check('company_id', 'Идентификатор компании не может быть пустым').notEmpty()], authMiddleware, controller.get_orders)

module.exports = router 