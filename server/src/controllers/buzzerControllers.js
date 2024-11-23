// controllers/questionController.js
const { db } = require("../models/db");
const express = require("express");
const router = express.Router();
const socket = require("../utils/socket");

const buzzerStart = async(req,res)=>{ 
    const io = await socket.getIO();
    db.query('SELECT * FROM buzzer JOIN team_assign ON buzzer.id = team_assign.buzzer_id;',(err,result)=>{
        console.log(result)
        err?console.log('buzzer seelct'):''  
        io.emit("buzzerStart", {
          isStart: result, 
        });
      })
      res.send('Buzzer Started')
    }

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
    //const {time, isGameOnline, massege, question} = req.body;
    //check buzzer round online 
    db.query('SELECT is_online FROM status  WHERE game_id = 21003',(err,result)=>{
      err?console.log('err'):''  
      if(result[0].is_online == 1){
        db.query('TRUNCATE TABLE buzzer',async(err,res)=>{
        //  err?console.log('err'):''
            if(res){
             console.log('table truncated')
           
     db.query('SELECT * FROM buzzer_questions WHERE is_displayed = 0 LIMIT 1',(err,result)=>{
          err?console.log(err):''  
          if(result){
            db.query('UPDATE buzzer_questions SET is_displayed = 1 WHERE id = ?',result[0]?.id,(err,res)=>{
              err?console.log('err'):''  
              if(res){
                console.log('question displayed')
                io.emit("buzzerStart", {
                  buzzerOrder: [{}], 
                  buzzerQuestion:  [
                    {question: result[0].question, time : result[0].time}, 
                  ],
                });
              }
            })
          }
        })
            }
       })
       //get the question from buzzer_quetions table first one and set is_displayed to 1 
       

      }
    }
    )
 
   res.send('Buzzer Clicked')
 }
  module.exports = { buzzerClick, buzzerReset};