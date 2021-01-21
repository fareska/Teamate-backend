const express = require('express')
const dotenv = require('dotenv').config()
const app = express()
const cors = require('cors')

const api = require('./server/routes/api')
const apiUser = require('./server/routes/apiUser')
const Sequelize = require('sequelize')

const sequelize = new Sequelize(process.env.SQL_DB_URI)


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
// app.use(function (req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*')
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')

//     next()
// })

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    })

// sequelize.query(`
// ALTER TABLE post ADD user_id INT, ADD CONSTRAINT FOREIGN KEY (user_id) REFERENCES user(id);`).then((res) => console.log(res[0]))
// sequelize.query(`
// SHOW COLUMNS FROM post;`).then((res) => console.log(res[0]))


app.use('/', api)
app.use('/user', apiUser)

const port = process.env.PORT || 3200
app.listen(port, () => {
    `server running on port ${port}`
})