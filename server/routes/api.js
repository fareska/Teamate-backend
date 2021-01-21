const express = require('express')
const router = express.Router()
const SQLManager = require('./sqlManagerB')
const sqlManager = new SQLManager()

router.delete('/post/:id', async function (req, res) {
    //receives post id and delete it
    const { id } = req.params
    const result = await sqlManager.deleteEvent(id)
    res.status(200).send(result)
})

router.put('/post/deactive', async function (req, res) {
    //receives object with post id and changes its active value to false 
    //this will delete the post from events page, bul it will still be appear on the user page
    const { id } = req.body
    const result = await sqlManager.deactiveEvent(id)
    res.status(200).send(result)
})

router.put('/post', async function (req, res) {
    //receives object with post id, property to update and new value
    // sport/recursion/description/time/date/peopleNum/city/country 
    const result = await sqlManager.updateEvent(req.body)
    res.status(200).send(result)
})

router.get('/posts/:id?', async function (req, res) {
    //if receive id return one post, else all posts
    if (req.params.id) {
        const result = await sqlManager.getEvent(req.params.id)
        res.status(200).send(result)
    }
    else {
        const result = await sqlManager.getEvents()
        res.status(200).send(result)
    }

})

router.get('/posts/user/:id', async function (req, res){
    //posts by user id  // get all the events of some user
    const {userId} = req.params
    const result = await sqlManager.getEventsByUser(userId)
    res.status(200).send(result)
})

router.post('/post', async function (req, res) {
    //add new event to DB
    // const {userId} = req.body
    const result = await sqlManager.addEvent(req.body)
    // const result = await sqlManager.eventToUser(userId, postId)
    res.status(200).send(result)
})

router.post('/post/participant', async function (req, res) {
    //add person to event //should receive userId (participant) and event Id
    const {eventId, userId} = req.body
    const result = await sqlManager.userToEvent(eventId, userId)
    res.status(200).send(result)
})

// router.get('/post/participants', async function(req, res){
    //don't need this one as long the posts route returns the partis  
// })

module.exports = router
