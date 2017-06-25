import { NextFunction, Request, Response, Router } from 'express';
import { json, urlencoded } from 'body-parser';
import { verify } from 'jsonwebtoken';
import { db } from '../db';
import { secret } from '../config';
import { Message, User } from "../models";
const jwt = require('jsonwebtoken');

const messageRouter: Router = Router();

type AuthorizedRequest = Request & { headers: { authorization: string} };

messageRouter.use((request: AuthorizedRequest, response: Response, next: NextFunction) => {
    const token = request.headers['x-access-token'];
    jwt.verify(token, secret, (tokenError) => {
        if (tokenError) {
            return response.status(403).json({
                message: 'Invalid token, please Log in first',
            });
        }

        next();
    });
});

messageRouter.get('/:threadId', (req: Request, res: Response) => {
    let threadId = req.params['threadId'];

    db.query('SELECT messages.*, users.email, users.icon, userthreadlookup.nickname FROM messages LEFT JOIN users ON users.id = messages.userId LEFT JOIN userthreadlookup ON messages.threadId = userthreadlookup.threadId AND users.id = userthreadlookup.userId WHERE messages.threadId=?', threadId, (err, rows) => {
      if (err) {
        throw err;
      }
      let messages: Message[] = [];
      rows.forEach(element => {
        let user: User = {
          id: element.userId,
          email: element.email,
          icon: element.icon,
          nickname: element.nickname
        }
        let message: Message = {
          id: element.id,
          threadId: element.threadId,
          data: element.data,
          timestamp: element.timestamp,
          user: user
        }
        messages.push(message);
      });
      res.json(messages);
    });
});

messageRouter.get('/messages', (req: Request, res: Response) => {
  db.query('SELECT * FROM messages', (err, rows, fields) => {
    if (err) {
      throw err;
    }
    res.json(rows);
  });
});

messageRouter.post('/', (req: Request, res: Response) => {
    db.query('INSERT INTO messages (data, userId, threadId) VALUES (?, ?, ?)',
      [req.body.data, req.body.user.id, req.body.threadId], (err, message) => {
        if(err) {
          throw err;
        }
        if(message) {
          let returnMessage: Message = {
              id: message.insertId,
              threadId: req.body.threadId,
              data: req.body.data,
              timestamp: new Date(),
              user: req.body.user
          }
          res.json(returnMessage);
        } else {
          res.json("not inserted inserted");
        }

      });
});

messageRouter.delete('/messages', (req, res) => {
  res.send('DELETE called on message api endpoint');
});

export { messageRouter };
