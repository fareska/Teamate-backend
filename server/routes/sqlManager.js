const express = require('express')
const router = express.Router()

const Sequelize = require('sequelize')
const sequelize = new Sequelize('mysql://root:@localhost/sql_crm')




const isExistS = async function (table, cName, value) {
    let query = `SELECT id FROM ${table} WHERE ${cName} = '${value}'`
    let results = await sequelize.query(query)
    console.log('isExist');
    const response = results[0][0] ? results[0][0].id : 'newItem'
    return response
}//return num or 'newItem'

const addValueS = async function (table, cName, value) {
    console.log(table)
    let check = await isExistS(table, cName, value)
    console.log('addValue');
    if (check === 'newItem') {
        let query = `INSERT INTO ${table} VALUES (null, '${value}')`
        let result = await sequelize.query(query)
        return result //return id 
    }
    else return check
}



router.post('/user', async function (req, res) {
    await addValueS('ciity', 'city', req.body.city)
    let first = req.body.first
    let last = req.body.last
    let mobile = req.body.mobile
    let country_id = await isExistS('country', 'country', req.body.country)
    let city_id = await isExistS('ciity', 'city', req.body.city)
    let email = req.body.email
    let password = req.body.password
    let birthDate = req.body.birthDate
    let date = req.body.date
    let image = null
    let gender = req.body.gender
    let active = req.body.active
    let sports = req.body.sports

    let query = `INSERT INTO useer VALUES 
    (null, '${last}', '${first}', '${email}', '${password}', '${mobile}',  ${image}, ${gender}, ${active}, ${birthDate}, ${date}, ${city_id}, ${country_id})`
    //---!!!!-->change useer to user
    let result = await sequelize.query(query)
    res.send(result[0])
    
    
})


// module.exports = router