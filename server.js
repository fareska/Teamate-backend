const express = require('express')
const dotenv = require('dotenv').config()
const app = express()

const api = require('./server/routes/api')
const Sequelize = require('sequelize')

const sequelize = new Sequelize(process.env.SQL_DB_URI)


app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')

    next()
})

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    })

// sequelize.query(`SELECT * from sport`).then((res) => console.log(res[0]))


app.use('/', api)

const port = process.env.PORT || 3200
app.listen(port, () => {
    `server running on port ${port}`
})