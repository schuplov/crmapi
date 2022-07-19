module.exports = (sequelize, DataTypes) => {

    const Order = sequelize.define("order", {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        shop_id: {
            type: DataTypes.INTEGER,
        },
        company_id: {
            type: DataTypes.INTEGER,
        },
        status:{
            type: DataTypes.STRING,
        },
        product: {
            type: DataTypes.STRING,
        },
        contact_name: {
            type: DataTypes.STRING,
        },
        contact_phone: {
            type: DataTypes.STRING,
        },
        contact_email: {
            type: DataTypes.STRING,
        },
        text_area: {
            type: DataTypes.STRING
        }
    })

    return Order

}
