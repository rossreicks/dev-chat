import { Request, Response, Router } from 'express';
import { db } from '../db';

const userRouter: Router = Router();
type AuthorizedRequest = Request & { headers: { authorization: string} };

// Route: /api/users
let users: any[] = JSON.parse(localStorage.getItem('users')) || [];

userRouter.get("", (request: Request, response: Response) => {
    db.query("SELECT * FROM users", (err, rows, fields) => {
    if (err) {
      throw err;
    }
    rows.array.forEach(element => {
        localStorage.setItem('users', element);
    });
    response.json(rows);
  });
});

userRouter.get("/:id", (request: Request, response: Response) => {
    JSON.parse(request.get('body'));
    response.json("user");
});

export { userRouter };
