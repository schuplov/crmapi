module.exports = (sequelize, DataTypes) => {

    const User = sequelize.define("user", {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        email: {
            type: DataTypes.STRING,
            unique: true
        },
        password: {
            type: DataTypes.STRING
        },
        firstname: {
            type: DataTypes.STRING
        },
        lastname: {
            type: DataTypes.STRING
        },
        status: {
            type: DataTypes.STRING
        },
        admin: {
            type: DataTypes.INTEGER
        }
    })

    return User

}
