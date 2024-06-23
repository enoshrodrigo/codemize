// controllers/questionController.js
const { db } = require("../models/db");
const { server } =  require("../index");
const socketIO = require("socket.io");
const io = socketIO(server);

const socketFunction = async (req, res) => {
    console.log("Received request on /multiple");
    const { question, time, isGameOnline, message } = req.body;
    await db.query(
      "UPDATE status SET is_online = ?, time = ?, message = ? WHERE id = 12",
      [isGameOnline, time, message],
      async (err, status) => {
        if (err) throw err;
        console.log("Status updated");
      }
    );
    if (isGameOnline) {
      await getQuestion(res, isGameOnline, time, "", false);
    } else {
      await io.emit("question", {
        question: Array([]),
        time: 0, 
        isGameOnline: isGameOnline,
        message: message,
      });
      res.json({ isGameOnline: isGameOnline });
    }
  }



const refreshQuestion = async (req, res) => {

    const { isGameOnline } = req.body;
  
    db.query("SELECT * FROM status where id=12", async (err, status) => {
      if (err) throw err;
      if (status[0].is_online == 1) {
        await getQuestion(
          res,
          status[0].is_online,
          status[0].time,
          status[0].message,
          true
        );
      } else {
        res.json({
          question: Array([]),
          time: 0,
          isGameOnline: false,
          message: status[0].message,
        });
      }
    });
  }


const getQuestion = async function getQuestion(res, isGameOnline, time, message, isrefrsh) {
    db.query("SELECT * FROM questions", async (err, questions) => {
      if (err) throw err;
  
      // Initialize the JSON structure
      let output = {
        question: [],
        time: time,
        isGameOnline: isGameOnline,
        message: message,
      };
  
      // Iterate over each question
      await questions.forEach((question) => {
        // Query to fetch answers for each question
        db.query(
          "SELECT * FROM answer WHERE question_id = ?",
          [question.id],
          async (err, answers) => {
            if (err) throw err;
  
            // Construct the question object
            let questionObj = {
              id: question.id,
              question: question.question,
              image: question.image,
              answer: answers.map((answer) => ({
                option: answer.answer,
              })),
            };
  
            output.question.push(questionObj);
  
            if (output.question.length === questions.length) {
              console.log(output);
              if (!isrefrsh) {
                io.emit("question", {
                  question: output.question,
                  time: output.time,
                  isGameOnline: output.isGameOnline,
                  message: output.message,
                });
              }
              res.json({
                question: output.question,
                time: time,
                isGameOnline: isGameOnline,
                message: message,
              });
            }
          }
        );
      });
    });
  }

  module.exports = { refreshQuestion,socketFunction };