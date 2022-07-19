const {validationResult} = require("express-validator");
const db = require('../schemas/index')

const Shop = db.shop
const Order = db.order


class businessController {
    async order(req, res) {
        try{
            const {api_key, product, contact_name, contact_phone, contact_email,  text_area} = req.body
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(403).json({
                    info:{
                        message: 'Ошибка при регистрации заявки',
                        type: 'validation_error',
                        errors,
                        success: false
                    }

                })
            }

            const shop = await Shop.findOne({}, {where: {api_key: api_key}})
            if(!shop){
                return res.status(403).json({
                    info:{
                        message: 'Ошибка при отправке заявки',
                        type: 'apikey_notfound',
                        success: false
                    }

                })
            }
            await Order.create({
                shop_id: shop.id,
                company_id: shop.company_id,
                status: 'create',
                product: product,
                contact_name: contact_name,
                contact_phone: contact_phone,
                contact_email: contact_email,
                text_area: text_area
            })
            return  res.status(200).json({
                info:{
                    code:3,
                    message: 'Заявка была создана',
                    success: true
                }

            })
        } catch (e){
            res.status(403).json({message: 'Ошибка', e})
            console.log(e);
        }   
    }
}


module.exports = new businessController()