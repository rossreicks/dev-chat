import { ResponseOptions } from '@angular/http';
import { Request, Response, Router } from 'express';
import { db } from '../db';
let bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
import {secret} from '../config';

const authRouter: Router = Router();

// Route: /api/authenticate
// let users: any[] = JSON.parse(localStorage.getItem('users')) || [];

// authRouter.get("/authenticate", (request: Request, response: Response) => {
//     response.json("authenticat");
// });

authRouter.get('/', (request: Request, response: Response) => {
    response.json('Found authenticate');
});

authRouter.post("/", (request: Request, response: Response) => {
    if(request.body.email) {
        db.query('SELECT * FROM users where email=?', request.body.email, (err, rows) => {
            if(err) {
                throw err;
            }
            if(rows.length) {
                let user = rows[0];
                bcrypt.compare(request.body.password, user.password, (err, res) => {
                    if(res){
                        let returnUser = {
                            id: user.id,
                            email: user.email,
                            icon: user.icon
                        };
                        let token = jwt.sign({ data: returnUser }, secret, { expiresIn: '1d' });
                        db.query("SELECT userthreadlookup.threadId, threads.teamId from userthreadlookup left join threads on userthreadlookup.threadId = threads.id where userthreadlookup.userId = ?", user.id, (err, ids) => {
                            if(err) {
                                throw err;
                            }
                            
                            response.status(200).json({token: token, threadId: ids[0].threadId, teamId: ids[0].teamId, user: returnUser});
                        })
                    } else {
                        response.status(500).send("username and password combination incorrect");
                    }
                })
            } else {
                response.status(500).send("username and password combination incorrect");
            } 
        })
    } else {
        response.status(500).send("invalid request");
    }
});

export { authRouter };
