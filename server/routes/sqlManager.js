const express = require('express')
const router = express.Router()
const dotenv = require('dotenv').config()

const Sequelize = require('sequelize')


class SqlManager {
    constructor() {
        this.sequelize = new Sequelize(process.env.SQL_DB_URI)
        this.sequelize
            .authenticate()
            .then(() => {
                console.log('Connection has been established successfully.');
            })
            .catch(err => {
                console.error('Unable to connect to the database:', err);
            })
    }

    async isNew (email){
        let results = await this.sequelize.query(`SELECT id FROM user WHERE email = '${email}'`)
        if(!results[0][0]){ return true } 
        else return false   
    }

    
    async isExistS  (table, cName, value) {
        let query = `SELECT id FROM ${table} WHERE ${cName} = '${value}'`
        let results = await this.sequelize.query(query)
        const response = results[0][0] ? results[0][0].id : 'newItem'
        return response
    }

    async addValueS (table, cName, value)  {
        let check = await this.isExistS(table, cName, value)
        
        if (check === 'newItem') {
            let query = `INSERT INTO ${table} VALUES (null, '${value}')`
            let result = await this.sequelize.query(query)
            return result //return id 
        }
        else return check
    }
    
    async addUser (last, first, email, password, mobile, image, gender, active, birthDate, date, city_id, country_id)  {
        try {
            const [res, meta] = await this.sequelize.query(`INSERT INTO user VALUES 
            (null, '${last}', '${first}', '${email}', '${password}' , ${date}, '${mobile}',  ${image},
            ${gender}, ${active}, ${city_id},  ${country_id},${birthDate})
            `) 
            return res[0]
        } catch (err) {
            console.log(err)
            return err
        }
    }

    async addUserSports (email, sportsArr){
        let userId = await this.isExistS('user', 'email', email)
        for (let s of sportsArr){
            let sportId = await this.isExistS('sport', 'sport', s)
            await this.sequelize.query(`INSERT INTO user_sport VALUES(null, ${userId}, ${sportId})`)
        }
    }

    async getUserData(userId){
        let userQuery = `SELECT first, last, email, city, country, birthdate, mobile, image, gender, active, date
        FROM user AS u, city AS c, country AS co
        WHERE u.id = ${userId} AND u.city_id=c.id AND u.country_id=co.id `

        let sportQuery = `SELECT sport FROM user AS u, user_sport AS us, sport AS s
        WHERE u.id=${userId} AND u.id=us.u_id AND us.s_id = s.id`
        let [user] = await this.sequelize.query(userQuery)
        let [sport] = await this.sequelize.query(sportQuery)
        let res = {
            user:user[0],
            sport: []
        }
        sport.forEach(s => res.sport.push(s.sport))
        return res
    }
}



// module.exports = router
module.exports = SqlManager



// router.post('/user', async function (req, res) {
//     await sqlManager.addValueS('city', 'city', req.body.city)
//     let first = req.body.first
//     let last = req.body.last
//     let mobile = req.body.mobile
//     let country_id = await sqlManager.isExistS('country', 'country', req.body.country)
//     let city_id = await sqlManager.isExistS('city', 'city', req.body.city)
//     let email = req.body.email
//     let password = req.body.password
//     let birthDate = req.body.birthDate
//     let date = req.body.date
//     let image = null
//     let gender = req.body.gender
//     let active = req.body.active
//     let sports = req.body.sports

//     let query = `INSERT INTO user VALUES 
//     (null, '${last}', '${first}', '${email}', '${password}', '${mobile}',  ${image}, ${gender}, ${active}, ${birthDate}, ${date}, ${city_id}, ${country_id})`
//     //---!!!!-->change useer to user
//     let result = await sequelize.query(query)
//     res.send(result[0])
// })

// const isExistS = async function (table, cName, value) {
//     let query = `SELECT id FROM ${table} WHERE ${cName} = '${value}'`
//     let results = await sequelize.query(query)
//     console.log('isExist');
//     const response = results[0][0] ? results[0][0].id : 'newItem'
//     return response
// }//return num or 'newItem'

// const addValueS = async function (table, cName, value) {
//     console.log(table)
//     let check = await isExistS(table, cName, value)
//     console.log('addValue');
//     if (check === 'newItem') {
//         let query = `INSERT INTO ${table} VALUES (null, '${value}')`
//         let result = await sequelize.query(query)
//         return result //return id 
//     }
//     else return check
// }