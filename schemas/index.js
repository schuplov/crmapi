const {Sequelize, DataTypes} = require('sequelize');
const dbConfig = require('../config/config.database');

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,

        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle

        }
    }
)

sequelize.authenticate()
.then(() => {
    console.log('DB / Status: Connection')
})
.catch(err => {
    console.log('DB / Error'+ err)
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize


//  Importing sсhemas
db.user = require('./userModel')(sequelize, DataTypes) // userModel
db.business = require('./businessModel')(sequelize, DataTypes) // businessModel
db.shop = require('./shopModel')(sequelize, DataTypes) // shopModel
db.order = require('./orderModel')(sequelize, DataTypes) // orderModel

db.sequelize.sync({ force: false })
.then(() => {
    console.log('DB / Models SYNC')
})



// 1 to Many Relation






module.exports = db
