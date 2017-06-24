import { ResponseOptions } from '@angular/http';
import { Request, Response, Router } from 'express';
import { db } from '../db';
let bcrypt = require('bcrypt');

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
        console.log(request.body.email);
        db.query('SELECT * FROM users where email=?', request.body.email, (err, rows) => {
            if(err) {
                throw err;
            }
            if(rows.length) {
                let user = rows[0];
                console.log(rows[0]);
                bcrypt.compare(request.body.password, user.password, (err, res) => {
                    if(res){
                        let newresponse = {
                            status: 200,
                            params: {
                                id: user.id,
                                username: user.username,
                                firstName: user.firstName,
                                lastName: user.lastName,
                                token: 'fake-jwt-token'
                            }};
                        response.json(newresponse);
                    } else {
                        response.json({message: 'Email or password is incorrect'});
                    }
                })
            } else {
                response.json({message: 'Email or password is incorrect'});
            } 
        })
    }
});

export { authRouter };
