module.exports = (sequelize, DataTypes) => {

    const Business = sequelize.define("business", {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        owner_id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
        },
        image_url: {
            type: DataTypes.STRING
        }
    })

    return Business

}
