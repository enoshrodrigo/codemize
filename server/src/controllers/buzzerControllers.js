// controllers/questionController.js
const { db } = require("../models/db");
const express = require("express");
const router = express.Router();
const socket = require("../utils/socket");

 const buzzerClick = async(req,res)=>{
    console.log(req.query.buzzerId)
    const io = await socket.getIO();
         db.query('INSERT INTO buzzer (buzzerID)VALUES (?) ',req.query.buzzerId,async(err,res)=>{
           err?console.log('err'):''
             if(res){
              db.query('SELECT * FROM buzzer JOIN team_assign ON buzzer.id = team_assign.buzzer_id;',(err,result)=>{
                console.log(result)
                err?console.log('buzzer seelct'):''  
                io.emit("buzzerNUmber", {
                  buzzerOrder: result, 
                });
              })
    
             }
        })
        res.send('Buzzer Clicked')
      }
      

const buzzerReset = async(req,res)=>{
    const io = await socket.getIO();
    db.query('TRUNCATE TABLE buzzer',async(err,res)=>{
      err?console.log('err'):''
        if(res){
         console.log('table truncated')
         io.emit("buzzerNUmber", {
            buzzerOrder: [{}], 
          });

        }
   })
   res.send('Buzzer Clicked')
 }
  module.exports = { buzzerClick, buzzerReset};