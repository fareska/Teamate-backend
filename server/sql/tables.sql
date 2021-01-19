USE sql_teamate;

CREATE TABLE user_sport(
    u_id INT,
    s_id INT,

    FOREIGN KEY (u_id) REFERENCES user(id),
    FOREIGN KEY (s_id) REFERENCES sport(id)
);



-- ALTER TABLE city
-- MODIFY COLUMN country_id;

--  CREATE TABLE useer(
--       id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
--       last VARCHAR(100),
--       first VARCHAR(100),
--       email VARCHAR(100),
--       password VARCHAR(10),
--       mobile VARCHAR(20),
--       image VARCHAR(10000),
--       gender BOOLEAN,
--       active BOOLEAN,
--       birthdate INT,
--       date INT,
--       city_id INT,
--       country_id INT,
--       FOREIGN KEY(city_id) REFERENCES city(id),
--       FOREIGN KEY(country_id) REFERENCES country(id)
--   );



-- // // CREATE TABLE post(
-- // //     id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
-- // //     date VARCHAR(30),
-- // //     time VARCHAR(30),
-- // //     people_num INT,
-- // //     description VARCHAR(1000),
-- // //     active BOOLEAN,
-- // //     city_id INT,
-- // //     country_id INT,
-- // //     frequency_id INT,
-- // //     sport_id INT,

-- // //     FOREIGN KEY(city_id) REFERENCES city(id),
-- // //     FOREIGN KEY(country_id) REFERENCES country(id),
-- // //     FOREIGN KEY(frequency_id) REFERENCES frequency(id),
-- // //     FOREIGN KEY(sport_id) REFERENCES sport(id)
-- // // );


-- // // CREATE TABLE sport(
-- // //     id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
-- // //     sport VARCHAR(30)
-- // // );

-- // // CREATE TABLE country(
-- // //     id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
-- // //     country VARCHAR(30)
-- // // );
-- // // sequelize.query(`
-- // // DELETE FROM country WHERE id > 0
-- // // `).then((res)=>console.log(res))

-- // sequelize.query(`
-- // SHOW TABLES
-- // `).then((res) => console.log(res))



-- // const data = require('./citiesData.json')

-- // // {
-- // //     "country": "Indonesia",
-- // //     "geonameid": 1651112,
-- // //     "name": "Astanajapura",
-- // //     "subcountry": "West Java"
-- // //     },

-- // let countries = data.map(d => d.country)

-- // const deleteDuplication = array => {
-- //     let obj = {}

-- //     countries.forEach(c => {
-- //         if (!obj[c]) {
-- //             obj[c] = 1
-- //         }
-- //     })
-- //     let fixedArr = Object.keys(obj)
-- //     return fixedArr
-- // }

-- // let countriesFixed = deleteDuplication(countries)


-- // let city = data.map(d => {
-- //     return { city: d.name, country: d.country }
-- // })
-- // /*
-- // this for adding countries only
-- // const addValue = async function (table, name, type) {
-- //     let query = (`INSERT INTO ${table} VALUES (null, '${type}')`)
-- //     let result = await sequelize.query(query)
-- //     console.log(result[0], 'result[0]')
-- //     return result
    
-- // }
-- // countriesFixed.forEach(c=> addValue('country', 'country', c))
-- // */

-- // // let check = await findByID(table, name, type)
-- // // let check = await isNew('country','country', country)
-- // // console.log(check, 'check')
-- // // if(check === 'newValue'){
-- // const addValue = async function (table, type, countryId) {
-- //     let query = (`INSERT INTO ${table} VALUES (null, '${type}', ${countryId})`)
-- //     let result = await sequelize.query(query)
-- //     console.log(result[0], 'result[0]')
-- //     return result

-- // }


-- // const isNew = async function (table, name, value) {
-- //     let query = await sequelize.query(`SELECT id FROM ${table} WHERE ${name} = '${value}'`)
-- //     let dataId = query[0][0] ? query[0][0].id : 'newValue'
-- //     console.log(' dataId', dataId);
-- //     return dataId
-- // }

-- // // city.forEach(c=> {
-- // //     let obj ={}
-- // //     addValue('city', 'city', c.city, c.country)
-- // // })
-- // function checkLetters(str) {
-- //     for (let i in str) {
-- //         if (str[i] === "'") {
-- //             str = str.replace(/[^a-zA-Z ]/g, "")
-- //         }
-- //     }
-- //     return str
-- // }
-- // // console.log(checkLetters("dsamif'a"))

-- // const addCities = async (city) => {
-- //     for (let c of city) {
-- //         const temp = checkLetters(c.city)
-- //         let countryId = await isNew('country', 'country', c.country)
-- //         let result = await addValue('city', temp, countryId)
-- //         console.log(result)
-- //     }
-- // }

-- // // addCities(city)

-- // const findByID = async (table, name, value) => {
-- //     let query = `SELECT id FROM ${table} WHERE ${name} = '${value}'`
-- //     let results = await sequelize.query(query)
-- //     console.log(results[0][0])
-- //     console.log(results[0].length)

-- //     if (!results[0][0]) {
-- //         return 'undefined'
-- //     }
-- //     return 'ok'
-- // }

-- // // countries.forEach(c=>addValue('country', 'country', c))

-- DELETE FROM country
-- WHERE id IN
--     (SELECT id
--     FROM 
--         (SELECT id,
--          ROW_NUMBER() OVER( PARTITION BY country
--         ORDER BY  id ) AS row_num
--         FROM country ) t
--         WHERE t.row_num > 1 );

-- DELETE FROM country a
-- USING country b
-- WHERE a.id > b.id
-- AND a.country = b.country;

-- DELETE FROM country 
-- WHERE id NOT IN (SELECT MAX(id) 
--                  FROM country 
--                  GROUP BY country)

-- DELETE
-- FROM country 
-- WHERE id NOT IN
-- (
-- SELECT MIN(id)
-- FROM country 
-- GROUP BY id);
-- DROP TABLE koko;
-- DROP TABLE country2;

-- CREATE TABLE koko(
--     id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     country VARCHAR(30)
-- );

-- SELECT DISTINCT *
-- INTO koko
-- FROM country
-- GROUP BY country
-- HAVING COUNT(country) > 1;

-- DELETE country
-- WHERE country
-- IN (SELECT country
-- FROM koko)

-- INSERT country
-- SELECT *
-- FROM koko

-- DROP TABLE koko

-- DELETE t1 FROM country t1  
-- INNER JOIN country t2   
-- WHERE  
--     t1.id < t2.id AND  
--     t1.country = t2.country;  

-- SELECT DISTINCT country
-- FROM koko
-- GROUP BY country
-- HAVING COUNT(country) > 1;

-- DELETE country
-- WHERE country
-- IN (SELECT country
-- FROM koko);

-- INSERT country
-- SELECT *
-- FROM koko;

-- DROP TABLE koko;



-- delete from country where id in
-- (select id from country group by id having  count(*) >1);

-- SELECT * FROM country;

-- DELETE FROM country WHERE id>0 ;





-- CREATE TABLE sport(
--     id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     sport VARCHAR(30)
-- );



-- CREATE TABLE city(
--     id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     city VARCHAR(30),
--     country_id INT,

--     FOREIGN KEY(country_id) REFERENCES country(id)
-- );

-- CREATE TABLE frequency(
--     id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     frequency VARCHAR(30)
-- );



-- CREATE TABLE user(
--     id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
--     last VARCHAR(40),
--     first VARCHAR(40),
--     email VARCHAR(40),
--     password VARCHAR(10),
--     date VARCHAR(40),
--     mobile VARCHAR(20),
--     image VARCHAR(10000),
--     gender BOOLEAN,
--     active BOOLEAN,
--     city_id INT,
--     country_id INT,

--     FOREIGN KEY(city_id) REFERENCES city(id),
--     FOREIGN KEY(country_id) REFERENCES country(id)
-- );

-- CREATE TABLE post(
--     id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
--     date VARCHAR(30),
--     time VARCHAR(30),
--     people_num INT,
--     description VARCHAR(1000),
--     active BOOLEAN,
--     city_id INT,
--     country_id INT,
--     frequency_id INT,
--     sport_id INT,
    
--     FOREIGN KEY(city_id) REFERENCES city(id),
--     FOREIGN KEY(country_id) REFERENCES country(id),
--     FOREIGN KEY(frequency_id) REFERENCES frequency(id),
--     FOREIGN KEY(sport_id) REFERENCES sport(id)
-- );

