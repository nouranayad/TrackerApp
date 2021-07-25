const express = require("express");
const router = express.Router();
const mongoose= require('mongoose')
const User = require('../models/User')



router.post('/create', async (req,res) => {
    try {
        const re=/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const isValidated = re.test(req.body.email)
         if(!isValidated)

        return res.status(400).send({ msg: "Wrong Email!" })
    
        var name = req.body.name
        var email = req.body.email
        var temp = req.body.temperature
        var long = req.body.long
        var lat = req.body.lat

        const newUser = await User.create({
            name: name,
            email: email,
            temperature: temp,
            long:long,
            lat:lat,
            
        })
        res.json({msg:'User was created successfully', data: newUser})
       }
       catch(error) {
           if(error.code==11000)
            res.json({data:error,msg:"This email is already used"})

       }  
  })
  router.get('/getUsers', async(request, response) => {
      try{
    const users = await User.find()
    response.json({data: users})
      }
      catch(error){
          console.log(error)
      }

});
router.get('/getSickUsers', async(request, response) => {
    try{
  const users = await User.find({temperature:{ $gt: 37.5}})
  response.json({data: users})
    }
    catch(error){
        console.log(error)
    }

});
module.exports = router;
