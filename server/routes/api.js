const express = require('express')
const router = express.Router()
const SQLManager = require('./sqlManagerB')
const sqlManager = new SQLManager()

router.get('/insert/sports', function(req, res){

})

router.get('/user/:id', function(req, res){
    //receives id return user 
})

router.put('/user/friends', function(req, res){
    //receives object of friends and update accordingly
})

router.put('/user/profileData', function(req,res){

    //receives object with user id, property to update and new value
    // first/last/city/country/birthdate/bio
})


router.put('/user/friends', function(req,res){
    //receives object with user id and sports  
})

router.put('/user/emailPass', function(req,res){
    //receives object with user id, email, passwords  

})


router.delete('/post/:id', async function (req, res) {
    //receives post id and delete it
    const {id} = req.params 
    const result = await sqlManager.deleteEvent(id)
    res.status(200).send(result) 
})

router.put('/post/deactive', async function (req, res) {
    //receives object with post id and changes its active value to false 
    //this will delete the post from events page, bul it will still be appear on the user page
    const {id} = req.body 
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

router.post('/post', async function(req, res){
    //add new event to DB
    const result = await sqlManager.addEvent(req.body)
    res.status(200).send(result)
})


router.post('/check/:email', async function (req, res) {
    //receives email and checks if its exist in db return true/false 
})

module.exports = router
