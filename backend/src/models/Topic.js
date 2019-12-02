module.exports = (sequelize,Sequelize) => {
    const Topic = sequelize.define('Topic', {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            unique:true,
            validate: {
                notNull: { msg : "O campo nome não pode ser nulo." },
                notEmpty: { msg: "O campo nome não pode ser vazio." }
            }
        },
        conteudo: {
            type: Sequelize.TEXT,
            allowNull: true
        }
    });
    return Topic;
}