const Sequelize = require('sequelize')
const SqlManager  = require('../routes/sqlManager')
const sqlManager = new SqlManager() 

const dotenv = require('dotenv').config()
const sequelize = new Sequelize(process.env.SQL_DB_URI)


// let query = `INSERT INTO useer VALUES 
// (null, 'bert', 'shoo', 'shoo@bert.com', 'shoobert', '0987654321',  null, 1, 1, 080990, 6578765443, 2, 1)`
// let query = `INSERT INTO useer VALUES 
// (null, '${last}', '${first}', '${email}', '${password}', '${mobile}',  '${image}', ${gender}, ${active}, ${birthDate}, ${date}, ${city_id}, ${country_id})`

//sequelize.query(query).then((res)=>console.log(res))


///////////-------------->>>>>>>>> insert sports to sport table <<<<<<<<<<<<--------------\\\\\\\\\\\
const sports = ['Boxing', 'Surfing', 'Krav Magaa', 'Basketball', 'Running', 'Swimming', 'Football', 'Tennis', 'Climbing',
'Scootering', 'jiu jitsu', 'Hiking', 'Muay Thai', 'Diving']

const insertSports =async sports => {    
    for (let s of sports){
        let sportQuery = `INSERT INTO sport VALUES(null, '${s}')`
        //  await sequelize.query(sportQuery)
        let result = await sequelize.query(sportQuery)
        // return result[0]
        console.log(result)
    }
}
//testing
// sequelize.query(`SELECT * FROM sport`).then((res) => console.log(res[0]))
// sequelize.query(`DELETE FROM sport WHERE id = 8 AND id>15 `).then((res)=> console.log(res[0]))
////////////////////////////////////////////////////////////////////////////////////////////////

///////////-------------->>>>>>>>>test new user insert <<<<<<<<<<<<--------------\\\\\\\\\\\



const testUser =async function () {
    await sqlManager.addValueS('city', 'city', 'Haifa')
    let first = 'shoo'
    let last = 'bert'
    let mobile = 9808966767
    let country_id = await sqlManager.isExistS('country', 'country', 'Israel')
    let city_id = await sqlManager.isExistS('city', 'city', 'Haifa')
    let email = 'shoo@bert.com'
    let password = 'shooshoo'
    let birthDate = 190990
    let date = 768954676
    let image = null
    let gender = 1
    let active = 1
    let sports = ['Boxing', 'Swimming']
    
    sqlManager.addUser(last, first, email, password, mobile, image, gender, active, birthDate, date, city_id, country_id)
}

// testUser()

// sequelize.query(`SHOW COLUMNS FROM user`).then((res)=>console.log(res[0]))
// sequelize.query(`SELECT * FROM user`).then((res)=>console.log(res[0]))
// sequelize.query(`ALTER TABLE user ADD birthdate BIGINT`).then((res)=>console.log(res[0]))

// sequelize.query(`SELECT sport 
// FROM user AS u, user_sport AS us, sport AS s
// WHERE u.id= us.u_id AND us.s_id=s.id`
// ).then((res)=>console.log(res[0]))

// sequelize.query(`CREATE TABLE user_sport(
//     id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
//     u_id INT,
//     s_id INT,
//     FOREIGN KEY (u_id) REFERENCES user(id),
//     FOREIGN KEY (s_id) REFERENCES sport(id)
// )`).then((res)=> console.log(res))
