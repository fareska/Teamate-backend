const express = require('express')
const app = express()

const api = require('./server/routes/api')

const Sequelize = require('sequelize')

const sequelize = new Sequelize('mysql://root:@localhost/sql_crm')

app.use(express.json())
app.use(express.urlencoded({extended:false}))

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


app.use('/', api)

const PORT = 3200
app.listen(PORT, ()=>{
    `server running on port ${PORT}`
})