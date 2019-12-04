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
            allowNull: true, 
        }
    });
    ProfilePicture.beforeCreate(function(profile){
        if(!profile.url){
            profile.url = `http://localhost:3000/files/${profile.key}`;
        }
    })
    ProfilePicture.beforeBulkUpdate(({attributes})=>{
        attributes.url = `http://localhost:3000/files/${attributes.key}`;
    })
    return ProfilePicture;
}