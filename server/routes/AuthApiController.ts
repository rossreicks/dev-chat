import { ResponseOptions } from '@angular/http';
import { Request, Response, Router } from 'express';
import { db } from '../db';
let bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
import {secret} from '../config';
import { User } from "../models";

const authRouter: Router = Router();

// Route: /api/authenticate
 let users: any[] = JSON.parse(localStorage.getItem('users')) || [];

 authRouter.get("/authenticate", (request: Request, response: Response) => {
     response.json("authenticat");
 });

authRouter.get('/', (request: Request, response: Response) => {
    response.json('Found authenticate');
});

// login
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
                        let returnUser: User = {
                            id: user.id,
                            email: user.email,
                            icon: user.icon,
                            nickname: '',
                            teams: []
                        };
                        let token = jwt.sign({ data: returnUser }, secret, { expiresIn: '1d' });
                        db.query("SELECT threads.name as threadName, teams.* from userthreadlookup left join threads on userthreadlookup.threadId = threads.id LEFT JOIN teams ON threads.teamId = teams.id where userthreadlookup.userId =?", user.id, (err, teams) => {
                            if(err) {
                                throw err;
                            }
                            returnUser.teams = teams;
                            response.status(200).json({token: token, threadName: teams[0].threadName, teamName: teams[0].name, user: returnUser});
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
