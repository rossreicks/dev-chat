import { NextFunction, Request, Response, Router } from 'express';
import { json, urlencoded } from 'body-parser';
import { verify } from 'jsonwebtoken';
import { db } from '../db';
import { secret } from '../config';

const messageRouter: Router = Router();

type AuthorizedRequest = Request & { headers: { authorization: string} };

messageRouter.use((request: AuthorizedRequest, response: Response, next: NextFunction) => {
    const token = request.headers.authorization;

    verify(token, secret, (tokenError) => {
        if (tokenError) {
            return response.status(403).json({
                message: 'Invalid token, please Log in first',
            });
        }

        next();
    });
});

messageRouter.get('/messages/thread/:threadId', (req: Request, res: Response) => {
    let threadId = req.params['threadId'];

    db.query('SELECT * FROM messages WHERE threadId=?', threadId, (err, rows) => {
      if (err) {
        throw err;
      }
      if (rows.length > 0) {
        res.json(rows);
      }
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

messageRouter.post('/messages', (req: Request, res: Response) => {
    db.query('INSERT INTO messages (data, timestamp, userId, threadId) VALUES (?, ?, ?, ?)',
             [req.body.data, new Date(), req.body.user.Id, req.body.threadId],
             (err, message) => {
               res.json("inserted");
             });
});

messageRouter.delete('/messages', (req, res) => {
  res.send('DELETE called on message api endpoint');
});

export { messageRouter };
