module.exports = (sequelize, DataTypes) => {

    const Shop = sequelize.define("shop", {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING
        },
        owner_id:{
            type: DataTypes.INTEGER,
        },
        company_id: {
            type: DataTypes.INTEGER,
        },
        url: {
            type: DataTypes.STRING
        },
        api_key: {
            type: DataTypes.STRING
        }
    })

    return Shop

}
