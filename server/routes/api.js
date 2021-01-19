
const express = require('express')
const router = express.Router()

const Sequelize = require('sequelize')
// const sequelize = new Sequelize('mysql://root:@localhost/sql_teamate')



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



router.delete('/post/:id', function(req, res){
    //receives post id and delete it 
})

router.put('/post/delete', function(req, res){
    //receives object with post id and changes its active value to false 
    //this will delete the post from events page, bul it will still be appear on the user page 
})

router.put('/post', function(req, res){
    //receives object with post id, property to update and new value
    // sport/recursion/description/time/date/peopleNum/city/country 
})

router.get('/posts/:id?', function(req, res){
    //if receive id return one post, else all posts 
})





router.post('/check/:email', async function (req, res) {
    //receives email and checks if its exist in db return true/false 
})






module.exports = router
