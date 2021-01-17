
//axios.get('Users/:id?', func{})
//receives userId
// return all user data 

//axios.post('newUser')
//receives object of user data 
//return success

//axios.put(user/:id)
//receives object of data to update 
//return updated data (user updated data)

//axios.delete(user/:id) // active--> true/false
//---> axios.put....

//axios.get('events/:id?')
//receives event id 
//return event/events data

////////////////
//axios.post('newEvent')
//receives object of event data 
// return all events data

//axios.put(event/:id)
//receives object of data to update 
//return updated data

//axios.delete(event/:id)// active--> true/false
//---> axios.put....




// router.get('/pokemon', async function(req, res){
//     // query = (`SELECT p.name
//     // FROM pokemon AS p, trainer AS t, pokemon_trainer AS pt
//     // WHERE t.name = "${trainerName}"
//     // AND t.id = pt.t_id
//     // AND p.id = pt.p_id`)

//     // let query = (`SELECT * FROM pokemon`)

//     let queryPok = (`
//     SELECT  p.name, p.type, t.t_name, p.weight, p.height
//     FROM pokemon AS P
//     INNER JOIN  pokemon_trainer AS pt ON p.id = pt.p_id AND p.id = 4
//     INNER JOIN  trainer AS t ON  pt.t_id = t.id`)

//     // let userResult = await sequelize.query(queryPok)
//     // let friendsResult = await sequelize.query(queryTrainers)
//     let array 
//     array.push(userResult)
//     array.push(friendsResult)
//     let result = await sequelize.query(query)

//     res.send(result[0])
// })