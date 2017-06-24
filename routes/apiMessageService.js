// const express = require('express');
// const validator = require('express-validator');
// const bcrypt = require('bcrypt');
// const bodyParser = require('body-parser');
// var db = require('./db');

// var messageRouter = express.Router();

// messageRouter.use(bodyParser.json());
// messageRouter.use(validator());

// messageRouter.get('/messages/thread/:threadId', function(req, res) {
//     var threadId = req.params['threadId'];

//     db.query("SELECT * FROM messages WHERE threadId=?", threadId, (err, rows) => {
//       if (err) throw err;
//       if (rows.length > 0) {
//         res.json(rows);
//       }
//     });
// });

// messageRouter.get('/messages', function(req, res) {
//   db.query('SELECT * FROM messages', (err, rows, fields) => {
//     if (err) throw err;
//     res.json(rows);
//   });
// });

// messageRouter.post('/messages', function(req, res) {
//     if(req.body) {
//       req.checkBody('data', 'Message empty').notEmpty();
//       req.checkBody('threadId', 'No Thread Id').notEmpty();
//     }
//     let err = req.validationErrors();
//     if (err) {
//       res.status(400).send(JSON.stringify(errors));
//     }
//     else {
//       db.query("SELECT * FROM ")
//     }
// });

// messageRouter.delete('/messages', function(req, res) {
//   res.send("DELETE called on message api endpoint")
// })