const {validationResult} = require("express-validator");
const bcrypt = require('bcryptjs')
const db = require('../schemas/index')
const crypto = require("crypto");
const Business = db.business
const Order = db.order
const Shop = db.shop

const Response = require('./services/ResponseController')


class businessController {
    async create (req, res) {
        try{
            const {title} = req.body
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(403).json({
                    info:{
                        message: 'Ошибка при создании компании',
                        type: 'validation_error',
                        errors,
                        success: false
                    }

                })
            }
            await Business.create({title: title, owner_id: req.user.id, image_url: 'none'});
            return Response["200"](res, 'Компания создана', 'createBusiness', null)

        } catch (e){
            res.status(403).json({message: 'Ошибка', e})
            console.log(e);
        }   
    }
    async add_shop(req, res){
        try{
            const {company_id, url, title} = req.body
            const {id} = req.user
            const company = await Business.findOne({}, {where: {company_id: company_id}})
            if(!company){
                return res.status(403).json({
                    info:{
                        message: 'Ошибка при добавлении магазина. Не найдена компания',
                        type: 'notfound_business',
                        success: false
                    }

                })
            }
            const api_key = crypto.randomUUID();
            await Shop.create({title: title, owner_id: id, company_id: company_id, url: url, api_key: api_key});
            return  res.status(200).json({
                info:{
                    code:3,
                    message: 'Магазин был добавлен',
                    success: true
                }

            })
        }
        catch (e) {
            res.status(403).json({message: 'Ошибка', e})
            console.log(e);
        }
    }
    async get_orders(req, res){
        try{
            const {company_id} = req.body
            const owner_id = req.user.id

            if(!errors.isEmpty()){
                return res.status(403).json({
                    info:{
                        message: 'Ошибка при получении всех заявок',
                        type: 'validation_error',
                        errors,
                        success: false
                    }

                })
            }


            const business = await Business.findOne({}, {where: { id: company_id, owner_id: owner_id }})
            if(!business){
                return res.status(403).json({
                    info:{
                        message: 'Компания не найдена либо не принадлежит  вам',
                        type: 'notfound_business',
                        success: false
                    }

                })
            }

            const orders = await Order.findAll({where: {company_id: company_id},order: [['updatedAt', 'DESC']]})

            const orders_list = []
            Array.prototype.push(orders, orders_list)

            return  res.status(200).json({
                info:{
                    code:3,
                    message: 'Заявки получены',
                    success: true,
                    list: orders_list
                }

            })



        } catch (e){
            res.status(403).json({message: 'Ошибка', e})
            console.log(e);
        }
    }
}


module.exports = new businessController()