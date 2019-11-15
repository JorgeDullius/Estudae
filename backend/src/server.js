require('dotenv').config();
const express = require('express');
const app = express();
const Sequelize = require('sequelize');
const cors = require('cors');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT
});

async function connectionTest(){
    try{
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    }catch(err){
        console.error('Unable to connect to the database:', err.name);
    }
}
connectionTest();

module.exports = sequelize;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())
app.use(require('./routes'));

sequelize.sync(/*{force: true}*/);

app.listen(3001);