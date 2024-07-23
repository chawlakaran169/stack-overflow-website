const express = require('express');
const router = express.Router();
const User = require('../models/UserDetail');


router.delete('/logout',(req,res)=>{
    try{
        const userid = req.user.id;


User.findByIdAndDelete(userId);

res.redirect('/');
    } catch(err){
        console.log(err);
    }


});

module.exports = router;