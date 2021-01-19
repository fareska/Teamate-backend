const Sequelize = require('sequelize')
const sequelize = new Sequelize('mysql://root:@localhost/sql_teamate')




// let query = `INSERT INTO useer VALUES 
// (null, 'bert', 'shoo', 'shoo@bert.com', 'shoobert', '0987654321',  null, 1, 1, 080990, 6578765443, 2, 1)`
// let query = `INSERT INTO useer VALUES 
// (null, '${last}', '${first}', '${email}', '${password}', '${mobile}',  '${image}', ${gender}, ${active}, ${birthDate}, ${date}, ${city_id}, ${country_id})`

//sequelize.query(query).then((res)=>console.log(res))
