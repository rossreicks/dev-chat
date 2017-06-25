import { Request, Response, Router } from 'express';
import { db } from "../db";
import { Team, User, Thread } from '../models';

let bcrypt = require('bcrypt');
let bodyParser = require('body-parser');
const validator = require('express-validator');

const teamRouter: Router = Router();
teamRouter.use(bodyParser.json());
teamRouter.use(validator());

const jwt = require('jsonwebtoken');
import {secret} from '../config';

// Route: /api/users

teamRouter.get('/:id', function(req, res) {
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
    var users: User[] = [];
    var threads: Thread[];
    db.query("SELECT * FROM threads where teamId=?", teamId, (err, rows) => {
      if (err) {
        throw err;
      }
      let promises = [];
      if (rows) {
        threads = rows;
        threads.forEach(thread => {
          thread.messages = [];
          promises.push(
            new Promise((resolve, reject) => {
                  db.query(`SELECT users.id, userthreadlookup.nickname, users.icon, users.email from userthreadlookup
                        LEFT JOIN users on userthreadlookup.userId = users.id
                        WHERE userthreadlookup.threadId = ?`, thread.id, (err, rows) => {
                  if (err) {
                      throw err;
                  }
                  if (!rows) {
                    rows = [];
                  }
                  thread.users = rows;
                  users.push(rows);
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

teamRouter.post('/', (req: any, res: Response) => {
  if (req.body) {
    console.log(req.body);
    req.checkBody('name', 'Team name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email does not appear to be valid').isEmail();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password', 'Password must be longer than 6 characters').len(7);

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
          let nickname = req.body.nickname === undefined ? null : req.body.nickname;
          bcrypt.hash(req.body.password, 10, (err, bcryptedPassword) => {
            if (err) {
                throw err;
            }
            bcrypt.compare(req.body.password, bcryptedPassword, (err, result) => {
              console.log("match: " + result);
            })
            db.query('INSERT INTO users (email, password, icon) VALUES (?, ?, ?)',
             [req.body.email, bcryptedPassword, icon],
             (err, user) => {
              if (err) {
                  throw err;
              }
              let userId = user.insertId;
              db.query('INSERT INTO teams (name, ownerId) VALUES (?, ?)',
              [req.body.name, userId], (err, team) => {
                if (err) {
                    throw err;
                }
                let teamId = team.insertId;
                db.query("INSERT INTO threads (teamId, description, name) VALUES (?, ?, 'General')", [teamId, desc], (err, thread) => {
                  let threadId = thread.insertId;
                  if (err) {
                      throw err;
                  }
                  db.query("INSERT INTO userthreadlookup (userId, threadId, nickname) VALUES (?,?,?)", [userId, threadId, nickname], (err, lookup) => {
                      if (err) {
                          throw err;
                      }
                      let returnUser = {
                          id: userId,
                          email: req.body.email,
                          icon: icon
                      };
                      let token = jwt.sign({ data: returnUser }, secret, { expiresIn: '1d' });
                          
                      res.status(200).json({token: token, threadId: threadId, teamId: teamId, user: returnUser});
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
