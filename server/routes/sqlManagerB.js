const dotenv = require('dotenv').config()
const Sequelize = require('sequelize')
class SQLManager {
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

    async isExistS(table, cName, value) {
        let query = `SELECT id FROM ${table} WHERE ${cName} = '${value}';`
        let results = await this.sequelize.query(query)
        const response = results[0][0] ? results[0][0].id : 'newItem'
        return response
    }

    async addValueS(table, cName, value) {
        let check = await this.isExistS(table, cName, value)

        if (check === 'newItem') {
            let query = `INSERT INTO ${table} VALUES (null, '${value}');`
            let result = await this.sequelize.query(query)
            return result
        }
        return check
    }

    async addEvent(event) {
        const { user_id, sport, frequency, date, time, people_num, city, country, description, lon, lat, address } = event

        const checkCity = await this.addValueS('city', 'city', city)
        const checkCountry = await this.addValueS('country', 'country', country)
        const checkFrequency = await this.addValueS('frequency', 'frequency', frequency)
        const checkSport = await this.addValueS('sport', 'sport', sport)
        const active = true

        const hold = await this.sequelize.query(`INSERT INTO post 
        VALUES (null, ${date}, ${time}, ${people_num}, '${description}',
        ${active}, ${checkCity}, ${checkCountry}, ${checkFrequency},
        ${checkSport}, ${user_id}, '${address}', ${lat}, ${lon} )`)

        if (hold)
            return "Event has been added successfully!"
        else "Sorry something went wrong, try again later!"
    }

    async getEvent(id) {
        const hold = await this.sequelize.query(`
        SELECT user_id, country, city, frequency, sport, p.id, p.time, p.people_num, p.description, p.date, p.active
        FROM post AS p, country AS co, city AS c, frequency AS f, sport AS sp
        WHERE p.id=${id} AND p.country_id=co.id AND p.city_id=c.id AND p.frequency_id=f.id AND p.sport_id=sp.id;`)

        if (hold)
            return hold[0][0]
        return false
    }

    async getEventsByUser(userId) {
        const hold = await this.sequelize.query(`
        SELECT country, city, frequency, sport, p.id, p.time, p.people_num, p.description, p.date, p.active
        FROM post AS p, country AS co, city AS c, frequency AS f, sport AS sp
        WHERE p.user_id=${userId} AND p.country_id=co.id AND p.city_id=c.id AND p.frequency_id=f.id AND p.sport_id=sp.id;`)

        if (hold)
            return hold[0]
        return false
    }

    mergePartisToPosts(eventsArr, partisArr){
        let newArr = []
        for (let e of eventsArr){
            e.partis = []

            for (let p of partisArr){
                p.pa_id === e.id && e.partis.push(p) 
            }
            newArr.push(e)
        }
        return newArr
    }    

    async getEvents() {
        let eventsQuery = `SELECT p.id, p.date, p.time, p.people_num, p.description, p.active, c.city, co.country, f.frequency, sp.sport,user_id, u.first, u.last, u.image, p.address, p.lat, p.lon
        FROM post AS p, country AS co, city AS c, frequency AS f, sport AS sp, user AS u
        WHERE p.country_id=co.id AND p.city_id=c.id AND p.frequency_id=f.id AND p.sport_id=sp.id AND p.user_id = u.id `
        
        let partisQuery = `SELECT pa_id, po_id, u.first, u.last, u.image
        FROM  post_parti AS pp,  user AS u, post as p
        WHERE p.id = pp.po_id AND pp.pa_id = u.id`

        const eventsRes = await this.sequelize.query(eventsQuery)
        const partisRes = await this.sequelize.query(partisQuery)

        const result = this.mergePartisToPosts(eventsRes[0], partisRes[0])

        if (result)
            return result
        return false
    }

    async deactiveEvent(id) {
        const hold = await this.sequelize.query(`
        UPDATE post
        SET active = 0
        WHERE id=${id};`)

        if (hold)
            return 'Deactivated!'
        else return 'Fail!'
    }

    async deleteEvent(id) {
        const hold = await this.sequelize.query(`
        DELETE FROM post
        WHERE id=${id};`)

        if (hold)
            return 'POST DELETED!'
        else return 'DELETION Fail!'
    }

    async updateEvent(newInfo) {
        const { id, sport, frequency, date, time, people_num, city, country, description, active } = newInfo

        const checkCity = await this.addValueS('city', 'city', city)
        const checkCountry = await this.addValueS('country', 'country', country)
        const checkFrequency = await this.addValueS('frequency', 'frequency', frequency)
        const checkSport = await this.addValueS('sport', 'sport', sport)

        const hold = this.sequelize.query(`
        UPDATE post
        SET date = ${date}, time = ${time}, people_num = ${people_num}, description = '${description}', active = ${active}, city_id = ${checkCity}, country_id = ${checkCountry}, frequency_id = ${checkFrequency}, sport_id = ${checkSport}
        WHERE id=${id};`)

        if (hold)
            return "Event has been updated successfully!"
        else "Sorry something went wrong, try again later!"

    }

    async userToEvent(userId, postId) {
        const hold = await this.sequelize.query(`INSERT INTO post_parti VALUES(null, ${userId}, ${postId})`)

        if (hold)
            return "Person has been added to the event successfully!"
        else "Sorry something went wrong, try again later!"
    }

}

module.exports = SQLManager

// const post = {
//     sport: "Football",
//     frequency: "weekly",
//     date: 1611001784558,
//     time: 1611001784558,
//     people_num: 3,
//     city: "Taybe",
//     country: "Israel",
//     description: "Tel-Aviv stadium",
//     active: true
// }

