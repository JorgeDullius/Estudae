const bcrypt = require('bcrypt');
const sequelize = require('../server');
const ProfilePicture = sequelize.import('./ProfilePicture');
module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('User', {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "O campo nome não pode ser nulo."
                },
                notEmpty: {
                    msg: "O campo nome não pode ser vazio."
                }
            }
        },
        email:{
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notNull: {
                    msg: "O campo email não pode ser nulo."
                },
                isEmail:{
                    msg: "O email deve ser válido."
                },
                notEmpty: {
                    msg: "O campo email não pode ser vazio."
                },
                isTeacherEmail(email) {
                    if (email.indexOf(['@ifms.edu.br']) == -1){
                        throw new Error('Por favor, informe um email com a terminação "@ifms.edu.br"');
                    }
                }
            }
        },
        password:{
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Por favor, digite sua senha."
                },
                notEmpty: {
                    msg: "O campo senha não pode ser vazio."
                },
                isValidePassword(password){
                    if(password.trim().length < 6){
                        throw new Error('Please enter a password longer than 6 characters');
                    }
                }
            }
        },
        checked:{
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    });
    User.hasOne(ProfilePicture, {
        foreignKey: {
          allowNull: false
        },
        onDelete: 'CASCADE'
    });
    User.beforeCreate (async function(user){
        const hash = await bcrypt.hash(user.password, 12);
        user.password = hash;
    })
    return User;
}
