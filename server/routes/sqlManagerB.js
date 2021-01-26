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
            check = await this.isExistS(table, cName, value)
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
        const remove = 0

        const hold = await this.sequelize.query(`INSERT INTO post 
        VALUES (null, ${date}, ${time}, ${people_num}, '${description}',
        ${active}, ${checkCity}, ${checkCountry}, ${checkFrequency},
        ${checkSport}, ${user_id}, '${address}', ${lat}, ${lon}, ${remove} )`)

        if (hold)
            return "Event has been created successfully!"
        else "Sorry something went wrong, try again later!"
    }
    
    async getEvent(id) {
        let eventQuery = `SELECT p.id, p.date, p.time, p.people_num, p.description, p.active, c.city, co.country, f.frequency, sp.sport,user_id, u.first, u.last, u.image, p.address, p.latitude, p.longitude
        FROM post AS p, country AS co, city AS c, frequency AS f, sport AS sp, user AS u
        WHERE p.country_id=co.id AND p.city_id=c.id AND p.frequency_id=f.id AND p.sport_id=sp.id AND p.id=${id} AND p.user_id = u.id `
        
        let partisQuery = `SELECT u.first, u.last, u.image, pa_id, po_id
        FROM post_parti, user AS u
        WHERE  po_id = ${id} AND pa_id = u.id`

        let eventRes = await this.sequelize.query(eventQuery)
        let partisRes = await this.sequelize.query(partisQuery)
        let commentsRes =  await this.getComments(id)
        console.log(eventRes); 
        eventRes[0][0].partis = partisRes[0] 
        eventRes[0][0].comments = commentsRes[0]

        if (eventRes[0][0])
            return eventRes[0][0]
        return false
    }

    async getEventsByUser(userId) {
        const hold = await this.sequelize.query(`
        SELECT country, city, frequency, sport, p.id, p.time, p.people_num, p.description, p.date, p.active
        FROM post AS p, country AS co, city AS c, frequency AS f, sport AS sp
        WHERE p.user_id=${userId} AND p.country_id=co.id AND p.city_id=c.id AND p.frequency_id=f.id AND p.sport_id=sp.id
        ORDER BY p.date DESC`)

        if (hold)
            return hold[0]
        return false
    }

    mergePartisToPosts(eventsArr, partisArr){
        console.log(eventsArr, partisArr);
        let newArr = []
        for (let e of eventsArr){
            e.partis = []

            for (let p of partisArr){
                p.po_id === e.id && e.partis.push(p) 
            }
            newArr.push(e)
        }
        return newArr
    }    

    async getEvents() {
        let eventsQuery = `SELECT p.id, p.date, p.time, p.people_num, p.description, p.active, c.city, co.country, f.frequency, sp.sport,user_id, u.first, u.last, u.image, p.address, p.latitude, p.longitude
        FROM post AS p, country AS co, city AS c, frequency AS f, sport AS sp, user AS u
        WHERE p.country_id=co.id AND p.city_id=c.id AND p.frequency_id=f.id AND p.sport_id=sp.id AND p.user_id = u.id
        ORDER BY p.date DESC `
        
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

    async deactivateEvent(id) {
        const hold = await this.sequelize.query(`
        UPDATE post
        SET active = 0
        WHERE id=${id};`)

        if (hold)
            return 'Deactivated!'
        else return 'Fail!'
    }

    async isUserMadeIt(eventId, userId) {
        let user_id = await this.sequelize.query(`SELECT user_id FROM post WHERE id= ${eventId}`)
        console.log(user_id[0][0].user_id);
        if(user_id[0][0].user_id === userId) { return true }
        else return false 
    }

    async deleteEvent(eventId, userId) {
        let check = await this.isUserMadeIt(eventId, userId)  
        if(check){
            await this.sequelize.query(`DELETE FROM post_parti WHERE po_id=${eventId}`) 
            const hold = await this.sequelize.query(`DELETE FROM post WHERE id=${eventId}`)
            if (hold)
                return 'POST DELETED!'
            else return 'DELETION Fail!'
        }
        else return 'You are not allowed to delete other users events'
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

    async checkReq(userId, postId){
        let eventData = await this.getEvent(postId)

        let valid 

        let peopleNum = eventData.people_num
        let partisNum = eventData.partis.length
        let eventMaker = eventData.user_id
      
        if(eventMaker !== userId){
            if(peopleNum !== partisNum){
                valid = true
            }else valid = 'Event is full'
        } else valid = `You can't join your own Event!`

        return valid
    }

    async cancelParticipation(userId, postId){
         console.log('cancelParticipation');
         console.log(userId, postId);
        let query = `DELETE FROM post_parti WHERE po_id = ${postId} AND pa_id = ${userId}`
        let result = await this.sequelize.query(query)
        return result
    }



    async userToEvent(userId, postId) {
        
        let validation =  await this.checkReq(userId, postId) 

        if (validation=== true){
            let query = `SELECT id FROM post_parti WHERE po_id = ${postId} AND pa_id =${userId}`
            let isNew = await this.sequelize.query(query)
            let response = isNew[0][0] ? isNew[0][0].id : 'newItem'
            
            if(response === 'newItem'){
                let hold = await this.sequelize.query(`INSERT INTO post_parti VALUES(null, ${postId}, ${userId})`) 
                if (hold)
                    return "You have joined the event successfully!"
                else "Sorry something went wrong, try again later!"
            }
            else return 'You already joined this Event'

        } else return validation //'the request is not valid, you either trying to join an event you published or you trying to join a full event '

    }

    async getComments(postId){
        let result = await this.sequelize.query(`SELECT * FROM comment WHERE p_id = ${postId} `)
        if(result[0]){ return result[0]}
        else return 'something went wrong'
    }

    async addComment(postId, userId, comment, first, last) {
        const hold = await this.sequelize.query(`INSERT INTO comment VALUES(null, ${userId}, ${postId}, '${comment}', '${first}', '${last}')`)
        if (hold)
            return "Comment has been saved to the event successfully!"
        else "Sorry something went wrong, try again later!"
    }

   
    async deleteComment(commentId, userId) {
        const hold = await this.sequelize.query(`DELETE FROM comment WHERE id= ${commentId} AND u_id=${userId} `)
        if (hold)
            return "Comment has been deleted successfully!"
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

