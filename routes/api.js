// const express = require('express');
// const validator = require('express-validator');
// const bcrypt = require('bcrypt');
// const bodyParser = require('body-parser');
// var db = require('./db');

// var router = express.Router();

// router.use(bodyParser.json());
// router.use(validator());

// // server routes ===========================================================

// /*router.get('/messages/thread/:threadId', function(req, res) {
//     var threadId = req.params['threadId'];

//     db.query("SELECT * FROM messages WHERE threadId=?", threadId, (err, rows) => {
//       if (err) throw err;
//       if (rows.length > 0) {
//         res.json(rows);
//       }
//     });
// });

// router.get('/messages', function(req, res) {
//   db.query('SELECT * FROM messages', (err, rows, fields) => {
//     if (err) throw err;
//     res.json(rows);
//   });
// });
// */

// router.post('/teams', function(req, res) {
//   if(req.body) {
//     req.checkBody('name', 'Team name is required').notEmpty();
//     req.checkBody('email', 'Email is required').notEmpty();
//     req.checkBody('email', 'Email does not appear to be valid').isEmail();
//     req.checkBody('password', 'Password is required').notEmpty();
//     req.checkBody('password', 'Password must be longer than 6 characters').len(7);
//     req.checkBody('username', 'A team name is required').notEmpty();
    
//     let errors = req.validationErrors();

//     if(errors) {
//       res.status(400).send(JSON.stringify(errors));
//     } else {
//       db.query("SELECT * FROM users where email=?", req.body.email, (err, rows) => {
//         if(err) throw err;
//         if(rows.length > 0) {
//           res.status(400).send("A user with this email already exists");
//         } else {
//           let icon = req.body.icon === undefined ? null : req.body.icon;
//           let desc = req.body.description === undefined ? null : req.body.description;
//           let username = req.body.username === undefined ? null : req.body.username;
//           bcrypt.hash(req.body.password, 5, (err, bcryptedPassword) => {
//             if(err) throw err;
//             db.query('INSERT INTO users (email, password, icon) VALUES (?, ?, ?)',
//              [req.body.email, bcryptedPassword, icon],
//              (err, user) => {
//               if(err) throw err;
//               let userId = user.insertId;
//               db.query('INSERT INTO teams (name, description) VALUES (?,?)',
//               [req.body.name, desc], (err, team) => {
//                 if(err) throw err;
//                 let teamId = team.insertId;
//                   db.query("INSERT INTO threads (teamId, name) VALUES (?, 'General')", teamId, (err, thread) => {
//                     let threadId = thread.insertId;
//                     if(err) throw err;
//                     db.query('INSERT INTO userThreadLookup (userId, threadId, username) VALUES (?,?,?)',
//                     [userId, teamId, username], (err, lookup) => {
//                     if(err) throw err;
//                       res.send({id: teamId});
//                   });
//                 });
//               });
//             });
//           });
//         }
//       });
//     }
//   } else {
//     res.json('An invalid form was submitted');
//   }
// });

// /*
// router.post('/messages', function(req, res) {
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
// });*/

// router.get('/teams/:id', function(req, res) {
//   console.log(req.params['id']);
//   let teamId = req.params['id'];
//   let team = {};
//   //db.connect();
//   db.query("SELECT * FROM teams where id=?", teamId, (err, rows) => {
//     if(err) throw err;
//     if(rows.length == 0) {
//       res.status(404).send("Not Found");
//     }
//     team = rows[0];
//     let users = [];
//     let threads = [];
//     db.query("SELECT users.Id, userTeamLookup.username, users.icon from userTeamLookup left JOIN users on userTeamLookup.userId = users.id WHERE userTeamLookup.teamId = ?", teamId, (err, rows) => {
//       if(err) throw err;
//       if(rows) {
//         users = rows;
//       }
//       db.query("SELECT * FROM threads where teamId=?", teamId, (err, rows) => {
//         if(err) {
//           console.log(err);
//           throw err;
//         }
//         let promises = [];
//         if(threads) {
//           threads = rows;
//           threads.forEach(thread => {
//             promises.push(
//               new Promise((resolve, reject) => {
//                 db.query("SELECT * FROM messages WHERE threadId=?", thread.id, (err, rows) => {
//                   if(err) {
//                     reject(err);
//                   }
//                   if(!rows) {
//                     rows = [];
//                   }
//                   thread.messages = rows;
//                   resolve(rows);
//                 });
//               })
//             );
//           });
//         }
//         Promise.all(promises).then(suc => {
//           //db.end();
//           team.users = users;
//           team.threads = threads;
//           team.owner = users.length === 0 ? null : users[0];
//           res.json(team);
//         }, err => {
//           //db.end();
//           res.status(500).send("An Error Occured");
//         });

//       });
//     });
//   });
// });

// module.exports = router