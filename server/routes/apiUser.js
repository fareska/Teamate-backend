
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

router.post('/user/emailPass',async function(req,res){
    const {email, password} = req.body
    
    let userId = await sqlManager.isExistS('user', 'email', email)
    if(userId !== 'newItem'){
        let userPassword = await sqlManager.getPassword(userId) 
        let check = userPassword == password ? true : res.send('Password dose not match')
        res.send(check)
    }
    else{
        res.send('Email dose not exist')
    }
    //receives object with user id, email, passwords  
})

router.put('/user/friends', function(req, res){
    //receives object of friends and update accordingly
})

router.put('/user/profileData', function(req,res){
    
    //receives object with user id, property to update and new value
    // first/last/city/country/birthdate/bio
})


router.put('/user/friends', function(req,res){
    //receives object with user id and sports  
})


router.get('/insert/sports', function(req, res){
})

module.exports = router
