const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const bodyParser = require("body-parser");
const cors=require('cors')
const mysql = require('mysql');
const md5 = require('md5');
const mongoose =   require('mongoose');
 const app = express();
const server = http.createServer(app);
const io = socketIO(server
  
)
app.use(express.json());
app.use(cors());
     
const uri='mongodb+srv://enoshrodrigo:1WeQrRQkxzpfGVHI@cluster0.vpagcwx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const connect =async ()=>{
    try{
await mongoose.connect(uri)
console.log('Conected to MongoDB');  
    }catch(err){
console.log(' MongoDB ',err);
      
    }
}
connect();
 
const db= mysql.createConnection({
  user:"root",
  host: "localhost",
  password: "",
  database: "gameapp",
})


const time =20;

const question =[
  { id:123322,

    question:'What is the capital of Sri Lanka?',
  image:'https://gifdb.com/images/high/starting-soon-498-x-280-gif-4zspqnr23ernb20a.gif',
  answer:
  [
    {option:'Gampha'},
    {option:'Negombo'},
    {option:'Colombo'},
    {option:'Pettha'},
  ]
},

]
const json={"question":[
  { "id":123322,

    "question":"What is the capital of Sri Lanka?",
  "image":"https://gifdb.com/images/high/starting-soon-498-x-280-gif-4zspqnr23ernb20a.gif",
  "answer":
  [
    {"option":"Gampha"},
    {"option":"Negombo"},
    {"option":"Colombo"},
    {"option":"Pettha"}
  ]
}


],
"time":20
}


const gameonline=true;
 
io.on('connection', (socket) => {
    console.log('Client connected'); 
  });

app.post(bodyParser.urlencoded({ extended: true }));
  

let endTime = new Date().getTime() + 0.5 * 60 * 1000;
 // 10 minutes from now

app.get('/api/time', (req, res) => {
  const currentTime = new Date().getTime() ;
  const remainingTime = ((endTime - currentTime )); 
 console.log(remainingTime)
  res.json({ remainingTime });
});


app.post("/api/question/multiple", async (req, res) => { 

     
  console.log("Received request on /multiple");
  const {question,time,isGameOnline,message} = req.body
  await db.query('UPDATE status SET is_online = ?, time = ?, message = ? WHERE id = 12', [isGameOnline, time, message], async(err, status) => {
    if (err) throw err;
    console.log("Status updated");
  });
if(isGameOnline){
  
  await getQuestion(res,isGameOnline,time,'',false)

}
  else{
  await  io.emit("question", { question:Array([]),time:0,isGameOnline:isGameOnline, message:message});
    res.json({isGameOnline:isGameOnline})
  }
  
});


app.post("/api/question/refresh", async (req, res) => { 
  const {isGameOnline} = req.body;
   
  db.query('SELECT * FROM status where id=12', async(err, status) => {
    if (err) throw err; 
    if(status[0].is_online==1){
    await  getQuestion(res,status[0].is_online,status[0].time,status[0].message,true)  
   }
    else{
      res.json({question:Array([]),time:0,isGameOnline:false, message:status[0].message})
    }
  }
  )

});


async function getQuestion(res,isGameOnline,time,message,isrefrsh){
  db.query('SELECT * FROM questions', async(err, questions) => {
    if (err) throw err;

    // Initialize the JSON structure
     let output = {
      "question": [],
      "time": time,
      "isGameOnline": isGameOnline,
      "message":message
    };

    // Iterate over each question
   await questions.forEach(question => {
      // Query to fetch answers for each question
      db.query('SELECT * FROM answer WHERE question_id = ?', [question.id], async(err, answers) => {
        if (err) throw err;

        // Construct the question object
        let questionObj = {
          "id": question.id,
          "question": question.question,
          "image": question.image,
          "answer": answers.map(answer => ({
            "option": answer.answer
          })) 
        };
 
        output.question.push(questionObj);
 
        if (output.question.length === questions.length) { 
          console.log(output)
          if(!isrefrsh){
            io.emit("question", { question:output.question,time:output.time,isGameOnline:output.isGameOnline, message:output.message}); 
          }
       res.json({question:output.question,time:time,isGameOnline:isGameOnline,message:message})
       
        } 
      });
    });
  });
}

app.post("/api/gettime", async (req, res) => { 
  console.log("Received request on /ti,e");
 return await io.emit("gettime", {time:time }); 
});
 server.listen("5000",()=>{
    console.log("Running on port 5000")
 })