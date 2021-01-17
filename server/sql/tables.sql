USE sql_teamate;

SELECT * FROM country;

-- DELETE FROM country WHERE id>0 ;
-- CREATE TABLE sport(
--     id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     sport VARCHAR(30)
-- );

-- CREATE TABLE country(
--     id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     country VARCHAR(30)
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

