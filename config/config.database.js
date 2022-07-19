module.exports = {
    HOST: 'localhost',
    USER: 'root',
    PASSWORD: '1233214512',
    DB: 'crm',
    dialect: 'mysql',

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}
