USE sql_teamate;

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

SELECT * FROM country;

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

