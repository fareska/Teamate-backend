
const express = require('express')
const router = express.Router()
const Sequelize = require('sequelize')

const dotenv = require('dotenv').config()
const sequelize = new Sequelize(process.env.SQL_DB_URI)

const SqlManager  = require('../routes/sqlManager')
const sqlManager = new SqlManager() 


router.post('/user', async function (req, res) {
    const {first, last, mobile, email,password, birthDate, date , gender, sports } = req.body
    let isNewEmail = await sqlManager.isNew(email)
    if(isNewEmail){
        await sqlManager.addValueS('city', 'city', req.body.city)
        let country_id = await sqlManager.isExistS('country', 'country', req.body.country)
        let city_id = await sqlManager.isExistS('city', 'city', req.body.city)
        let image = null
        let active = 1
        let addUserResult = await sqlManager.addUser(last, first, email, password, mobile, image, gender, active, birthDate, date, city_id, country_id)
        let sportsResult = await sqlManager.addUserSports(email, sports)
        res.send(addUserResult)
    }
    else res.send('Email dose exist')
})

router.get('/user/:id',async function(req, res){
    let userId = req.params.id
    let userData = await sqlManager.getUserData(userId) 
    res.send(userData)
})

module.exports = router
