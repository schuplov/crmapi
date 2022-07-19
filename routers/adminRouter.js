const Router = require('express')
const router = Router()
const controller = require('../controllers/adminController')
const roleMiddleware = require('../middlewaree/roleMiddleware')
const authMiddleware = require('../middlewaree/authMiddleware')


// cic
router.post('/create_cic', roleMiddleware(1), controller.create_cic)

//user


//homework
router.post('/add_homework', roleMiddleware('ADMIN'), controller.add_homework)
router.post('/add_comment', roleMiddleware('ADMIN'), controller.add_comments)







module.exports = router 