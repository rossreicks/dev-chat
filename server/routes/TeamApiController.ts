import { Request, Response, Router } from 'express';
import { db } from "../db";
import { Team, User, Thread } from '../models';

let bcrypt = require('bcrypt');
let bodyParser = require('body-parser');
const validator = require('express-validator');

const teamRouter: Router = Router();
teamRouter.use(bodyParser.json());
teamRouter.use(validator());

// Route: /api/users

teamRouter.get('/teams/:id', function(req, res) {
  console.log(req.params['id']);
  let teamId = req.params['id'];
  let team: Team;
  db.query("SELECT * FROM teams where id=?", teamId, (err, rows) => {
    if (err) {
        throw err;
    }
    if (rows.length === 0) {
      res.status(404).send("Not Found");
    }
    team = rows[0];
    let users: User[];
    let threads: Thread[];
    db.query("SELECT * FROM threads where teamId=?", teamId, (err, rows) => {
      if (err) {
        throw err;
      }
      let promises = [];
      if (rows) {
        threads = rows;
        threads.forEach(thread => {
          promises.push(
            new Promise((resolve, reject) => {
              db.query("SELECT * FROM messages WHERE threadId=?", thread.id, (err, rows) => {
                if (err) {
                  reject(err);
                }
                if (!rows) {
                  rows = [];
                }
                thread.messages = rows;
                resolve(rows);
              });
            })
          );
          promises.push(
            new Promise((resolve, reject) => {
                  db.query(`SELECT users.Id, userthreadlookup.nickname, users.icon from userthreadlookup
                        LEFT JOIN users on userthreadlookup.userId = users.id
                        WHERE userthreadlookup.threadId = ?`, thread.id, (err, rows) => {
                  if (err) {
                      throw err;
                  }
                  if (!rows) {
                    rows = [];
                  }
                  thread.users = rows;
                  resolve(rows);
                });
            })
          );
        });
      }
      Promise.all(promises).then(suc => {
        team.threads = threads;
        team.owner = users.find(x => x.id === team.ownerId);
        res.json(team);
      }, err => {
        res.status(500).send("An Error Occured");
      });

    });
  });
});

teamRouter.post('/teams', (req: any, res: Response) => {
  if (req.body) {
    req.checkBody('name', 'Team name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email does not appear to be valid').isEmail();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password', 'Password must be longer than 6 characters').len(7);
    req.checkBody('username', 'A team name is required').notEmpty();

    let errors = req.validationErrors();

    if (errors) {
      res.status(400).send(JSON.stringify(errors));
    } else {
      db.query('SELECT * FROM users where email=?', req.body.email, (err, rows) => {
        if (err) {
            throw err;
        }
        if (rows.length > 0) {
          res.status(400).send('A user with this email already exists');
        } else {
          let icon = req.body.icon === undefined ? null : req.body.icon;
          let desc = req.body.description === undefined ? null : req.body.description;
          let username = req.body.username === undefined ? null : req.body.username;
          bcrypt.hash(req.body.password, 5, (err, bcryptedPassword) => {
            if (err) {
                throw err;
            }
            db.query('INSERT INTO users (email, password, icon) VALUES (?, ?, ?)',
             [req.body.email, bcryptedPassword, icon],
             (err, user) => {
              if (err) {
                  throw err;
              }
              let userId = user.insertId;
              db.query('INSERT INTO teams (name, description, ownerId) VALUES (?,?, ?)',
              [req.body.name, desc, userId], (err, team) => {
                if (err) {
                    throw err;
                }
                let teamId = team.insertId;
                db.query("INSERT INTO threads (teamId, name) VALUES (?, 'General')", teamId, (err, thread) => {
                let threadId = thread.insertId;
                if (err) {
                    throw err;
                }
                db.query("INSERT INTO userthreadlookup (userId, threadId, username) VALUES (?,?,?)", [userId, threadId, username], (err, lookup) => {
                    if (err) {
                        throw err;
                    }
                    res.send({id: teamId});
                    });
                });
              });
            });
          });
        }
      });
    }
  } else {
    res.json('An invalid form was submitted');
  }
});

export { teamRouter };
