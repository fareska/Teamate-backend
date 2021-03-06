
const express = require('express')
const router = express.Router()
const Sequelize = require('sequelize')

const dotenv = require('dotenv').config()
const sequelize = new Sequelize(process.env.SQL_DB_URI)

const SqlManager = require('../routes/sqlManager')
const sqlManager = new SqlManager()


router.post('/user', async function (req, res) {
    const { first, last, mobile, email, password, birthDate, date, gender, sports } = req.body
    let isNewEmail = await sqlManager.isNew(email)
    if (isNewEmail) {
        await sqlManager.addValueS('city', 'city', req.body.city)
        let country_id = await sqlManager.isExistS('country', 'country', req.body.country)
        let city_id = await sqlManager.isExistS('city', 'city', req.body.city)
        let image = null
        let active = 1
        let addUserResult = await sqlManager.addUser(last, first, email, password, mobile, image, gender, active, birthDate, date, city_id, country_id)
        let sportsResult = await sqlManager.addUserSports(email, sports)
        res.send(addUserResult)
    }
    else res.send('Email already exists')
})

router.get('/user/:id', async function (req, res) {
    let userData = await sqlManager.getUserData(req.params.id)
    // userData.user.date=`${userData.user.date}`
    // userData.user.birthdate=`${userData.user.birthdate}`
    if(userData.user)  res.send(userData) 
    else  res.send('Something went wrong')
    
})

router.post('/user/emailPass', async function (req, res) {
    const { email, password } = req.body

    let userId = await sqlManager.isExistS('user', 'email', email)
    if (userId !== 'newItem') {
        let userPassword = await sqlManager.getPassword(userId)
        let check = userPassword == password ? true : res.send('Wrong Password!')
        let result = check && await sqlManager.getUserData(userId)
        result.user.id = userId
        // result.user.date=`${result.user.date}`
        // result.user.birthdate=`${result.user.birthdate}`
        res.send(result)
    }
    else {
        res.send('Email does not exist!')
    }
})

router.get('/user/all/table/:table', async function (req, res) {
    console.log('get all route', req.params.table);
    let result = await sqlManager.getAll(req.params.table)
    console.log(result);
    res.send(result)
})

router.get('/user/all/column/:column', async function (req, res) {
    let column = req.params.column
    let result = await sqlManager.getAllColumn(column)
    let fixed = result.map(r=> r[column] )
    res.send(fixed)
})

router.post('/user/addFriend', async function (req, res) {
    const { mainUserId, subUserId } = req.body
    let result = await sqlManager.addFriend(mainUserId, subUserId)
    res.send(result)
    // the object from the front-end should look as follow:
    // { 
    //     "mainUserId": 7,
    //     "subUserId": 21
    // }
})

router.put('/user/generalData', async function (req, res) {
    //receives object with user id, property to update (first/last/email/password) and new value  /// this (city/country) dose not work in the update for the meanwhile 
    const { userId, column, value } = req.body //if the column is email, then an email check will run and returns 'email dose exist' if it's exist in DB 
    let result = await sqlManager.updateUserGeneralData(userId, column, value)
    res.send(result)
})


router.delete('/user/friends',async function (req, res) {
    const { userId, friendId } = req.body
    let result = await sqlManager.deleteFriend(userId, friendId)
    res.send(result)
})

router.delete('/user/delete/sport',async function (req, res) {
    const { userId, sport } = req.body
    let result = await sqlManager.deleteSport(userId, sport)
    res.send(result)
})

router.post('/user/add/sport',async function (req, res) {
    const { userId, sport } = req.body
    let result = await sqlManager.addSport(userId, sport)
    res.send(result)
})


router.get('/insert/sports', function (req, res) {
})

module.exports = router
