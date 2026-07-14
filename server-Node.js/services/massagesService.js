 
const {getCurrentConfig} = require('./../services/configService');
const express = require('express');
const router = express.Router();
const {sendMassage } = require('./../utils/massagesUtils');
const {log, levels} =  require('./../utils/logUtils');

router.post('/send-massage',     function (req,res,next){
    log('send-massage',levels.INFORMATION);
    try {
        const { userName }= req.query;
        const {message }= req.body;
        sendMassage(userName,message ) ;
        res.send(true);
        
    }
    catch (err){
        console.log(err)
        res.send(false);
    }
    
   
})

module.exports= router

 