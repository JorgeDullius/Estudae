module.exports = (sequelize, Sequelize) => {
    const ProfilePicture = sequelize.define('ProfilePicture', {
        name: { 
            type: Sequelize.STRING, 
            allowNull: false, 
        },
        key:{
            type: Sequelize.STRING, 
            unique:true,
            allowNull: false, 
        },
        size:{
            type: Sequelize.INTEGER,
            allowNull: false, 
        },
        url:{
            type: Sequelize.STRING,
            allowNull: false, 
        }
    });
    return ProfilePicture;
}