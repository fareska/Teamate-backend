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

    async isNew(email) {
        let results = await this.sequelize.query(`SELECT id FROM user WHERE email = '${email}'`)
        if (!results[0][0]) { return true }
        else return false
    }


    async isExistS(table, cName, value) {
        let query = `SELECT id FROM ${table} WHERE ${cName} = '${value}'`
        let results = await this.sequelize.query(query)
        const response = results[0][0] ? results[0][0].id : 'newItem'
        return response
    }

    async addValueS(table, cName, value) {
        let check = await this.isExistS(table, cName, value)

        if (check === 'newItem') {
            let query = `INSERT INTO ${table} VALUES (null, '${value}')`
            let result = await this.sequelize.query(query)
            return result //return id 
        }
        else return check
    }

    async addUser(last, first, email, password, mobile, image, gender, active, birthDate, date, city_id, country_id) {
        try {
            const [res, meta] = await this.sequelize.query(`INSERT INTO user VALUES 
            (null, '${last}', '${first}', '${email}', '${password}' , ${date}, '${mobile}',  ${image},
            ${gender}, ${active}, ${city_id},  ${country_id},${birthDate}, null)
            `)
            return res[0]
        } catch (err) {
            console.log(err)
            return err
        }
    }

    async addUserSports(email, sportsArr) {
        let userId = await this.isExistS('user', 'email', email)
        for (let s of sportsArr) {
            let sportId = await this.isExistS('sport', 'sport', s)
            await this.sequelize.query(`INSERT INTO user_sport VALUES(null, ${userId}, ${sportId})`)
        }
    }

    async getPassword(userId) {
        let results = await this.sequelize.query(`SELECT password FROM user WHERE id=${userId}`)
        const response = results[0][0] && results[0][0].password // null // 'doseNotMatch'
        return response
    }

    async getGeneralData(userId) {
        let query = `SELECT first, last, email, city, country, birthdate, mobile, image, gender, active, date
        FROM user AS u, city AS c, country AS co
        WHERE u.id = ${userId} AND u.city_id=c.id AND u.country_id=co.id `
        let [user] = await this.sequelize.query(query)
        return user[0]
    }

    async getUserSports(userId) {
        let query = `SELECT sport FROM user AS u, user_sport AS us, sport AS s
        WHERE u.id=${userId} AND u.id=us.u_id AND us.s_id = s.id`
        let arr = []
        let [sport] = await this.sequelize.query(query)
        sport.forEach(s => arr.push(s.sport))
        return arr
    }

    async getFollowReq(userId) {
        let query = `SELECT u.id, first, last, image
        FROM user AS u, user_user AS uu
        WHERE uu.mu_id = ${userId} AND uu.su_id = u.id`
        let arr = []
        let [follower] = await this.sequelize.query(query)
        follower.forEach(f => arr.push(f))
        return arr
    }

    async getFriendReq(userId) {
        let query = `SELECT u.id, first, last, image
        FROM user AS u, user_user AS uu
        WHERE uu.su_id = ${userId} AND uu.mu_id = u.id`
        let arr = []
        let [friend] = await this.sequelize.query(query)
        friend.forEach(f => arr.push(f))
        return arr
    }

    async getMatch(userId) {
        let obj = {} //all the keys are user's ids. //
        //if the value is 0, then the user(key) received a req from the main user 
        //if the value is 1, then the user(key) sent a req to the main user 
        //if the value is 2, then they are friends 
        let reqReceivedFromOtherUSer = await this.getFriendReq(userId)
        let reqSentToOtherUser = await this.getFollowReq(userId)
        for (let r of reqReceivedFromOtherUSer) {
            if (!obj[r.id]) {
                obj[r.id] = 'a req received from the keyNum but did not approved yet'
            }
        }
        for (let r of reqSentToOtherUser) {
            if (!obj[r.id]) {
                obj[r.id] = 'a req was sent to the keyNum but did not approved yet'
            } else obj[r.id] = 'friends'
        }
        let friends = []
        for (const [key, value] of Object.entries(obj)) {
            friends.push(`${key}: ${value}`);
        }
        return friends
    }

    async getUserEvents(userId) {
        let query = `SELECT p.id, date, time, people_num, description, active, address, latitude, longitude, c.city, co.country, f.frequency ,s.sport   
        FROM  post AS p, sport AS s, city AS c, country AS co, frequency AS f
        WHERE p.user_id = ${userId} AND p.sport_id = s.id AND c.id= p.city_id AND co.id=p.country_id AND f.id=p.frequency_id `
        let arr = []
        let [event] = await this.sequelize.query(query)
        event.forEach(e => arr.push(e))
        return arr
    }

    async getUserPartis(userId) {
        let query = `SELECT user_id, date, time, people_num, description, active, address, latitude, longitude, c.city, co.country, f.frequency ,s.sport   
        FROM  post_parti AS pp, post AS p, sport AS s, city AS c, country AS co, frequency AS f
        WHERE pp.pa_id = ${userId} AND pp.po_id= p.id AND p.sport_id = s.id AND c.id=p.city_id AND co.id=p.country_id AND f.id=p.frequency_id `
        let arr = []
        let [event] = await this.sequelize.query(query)
        event.forEach(e => arr.push(e))
        return arr
    }

    async getUserData(userId) {
        let res = {}
        res.user = await this.getGeneralData(userId)
        res.sport = await this.getUserSports(userId)
        res.match = await this.getMatch(userId)
        // res.followers = await this.getFollowReq(userId)
        // res.friends = await this.getFriendReq(userId)
        res.events = await this.getUserEvents(userId)
        res.Partis = await this.getUserPartis(userId)
        return res
    }

    async isNewReq(mainUserId, subUserId) {
        let query = `SELECT id FROM user_user WHERE mu_id = ${mainUserId} AND su_id =${subUserId} `
        let result = await this.sequelize.query(query)
        return result
    }

    async addFriend(mainUserId, subUserId) {
        let check = await this.isNewReq(mainUserId, subUserId)
        if (!check[0][0]) {
            let query = `INSERT INTO user_user VALUES(null, ${mainUserId}, ${subUserId})`
            let result = await this.sequelize.query(query)
            return result
        }
        else return 'already requested'
    }

    async deleteFriend(userId, friendId) {
        let query = `DELETE FROM user_user WHERE (mu_id = ${userId} AND su_id = ${friendId}) OR (su_id = ${userId} AND mu_id = ${friendId})`
        let result = await this.sequelize.query(query)
        return result
    }

    async deleteSport(userId, sport) {
        let sportId = await this.isExistS('sport', 'sport', sport)
        let query = `DELETE FROM user_sport WHERE u_id =${userId} AND s_id = ${sportId}`
        let result = await this.sequelize.query(query)
        return result
    }
    
    async addSport(userId, sport) {
        let sportId = await this.isExistS('sport', 'sport', sport)
        let query = `INSERT INTO user_sport VALUES(null, ${userId}, ${sportId})`
        let result = await this.sequelize.query(query)
        return result
    }

    async getAll(table) {
        let result = await this.sequelize.query(`SELECT * FROM ${table}`)
        return result[0]
    }

    async getAllColumn(table) {
        let result = await this.sequelize.query(`SELECT * FROM ${table}`)
        return result[0]
    }

    async updateUserGeneralData(userId, column, value) {
        if (column === 'email') {
            let checkEmail = await this.isNew(value)
            if (checkEmail) {
                let result = await this.sequelize.query(`UPDATE user  SET ${column} = '${value}'  WHERE id = ${userId} `)
                return result[0]
            } else return 'email dose exist'
        }
        let result = await this.sequelize.query(`UPDATE user  SET ${column} = '${value}'  WHERE id = ${userId} `)
        return result[0]
    }
}



module.exports = SqlManager



