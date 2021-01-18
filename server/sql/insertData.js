const Sequelize = require('sequelize')
const sequelize = new Sequelize('mysql://root:@localhost/sql_teamate')

const data = require('../../citiesData.json')

// {
//     "country": "Indonesia",
//     "geonameid": 1651112,
//     "name": "Astanajapura",
//     "subcountry": "West Java"
//     },

let countries = data.map(d => d.country)
// country = country.filter((elem, index, self) => index === self.indexOf(elem))

let city = data.map(d => d.city)
// city = city.filter((elem, index, self) => index === self.indexOf(elem))

const addValue = async function (table, name, type) {
    let check = await findByID(table, name, type)
    if(check === 'undefined'){
        let query =`INSERT INTO ${table} VALUES (null, '${type}')`
        let result = await sequelize.query(query)
        return result
    }
}
const findByID = async (table, name, value) => {
    let query = `SELECT id FROM ${table} WHERE ${name} = "${value}"`
    let results = await sequelize.query(query)
    if(!results[0][0]){      
        return 'undefined' 
    }
    return 'ok'
}

const addUser = async (client) => {
    // let emailType = client.emailType !== null ? await findByID('email_type', 'email_type', client.emailType) : null
    // let owner = await findByID('owner', 'owner', client.owner)
    // let country = await findByID('country', 'country', client.country)
    // let date = new Date (client.firstContact).toLocaleDateString()
    // let nameSplit = client.name.split(' ')

    // let query =`INSERT INTO client
    // VALUES (null, '${nameSplit[1]}', '${nameSplit[0]}', '${client.email}', ${client.sold}, '${date}', ${emailType}, ${owner}, ${country})`
    // let result = await sequelize.query(query)
    // return result[0]
}

// countries.forEach(c => addValue('koko', 'country', c))
// countries.forEach(c => console.log(c))
// countries[0]
// addValue('country', countries[0])


// console.log(countries);
// emailType.forEach(e => addValue('email_type', e))
// countries.forEach(c => addValue(console.log(c)))
// owner.forEach(o => addValue('owner', o))
// data.forEach(d => addClient(d))

