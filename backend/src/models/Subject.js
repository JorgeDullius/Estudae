const sequelize = require('../server');
const Topic = sequelize.import('./Topic');
module.exports = (sequelize, Sequelize) => {
    const Subject = sequelize.define('Subject', {
        name: { 
            type: Sequelize.STRING, 
            allowNull: false, 
            unique: true,
            validate: { 
                notNull: { msg: "O campo nome não pode ser nulo." },
                notEmpty: { msg: "O campo nome não pode ser vazio." }
            }
        }
    });
    Subject.hasMany(Topic, {
        foreignKey: {
          allowNull: false
        },
        onDelete: 'CASCADE'
    });
    return Subject;
}