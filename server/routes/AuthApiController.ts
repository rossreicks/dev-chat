import { ResponseOptions } from '@angular/http';
import { Request, Response, Router } from 'express';
import { db } from '../db';

const authRouter: Router = Router();

// Route: /api/authenticate
let users: any[] = JSON.parse(localStorage.getItem('users')) || [];

authRouter.get("/authenticate", (request: Request, response: Response) => {
    response.json("authenticat");
});

authRouter.post("/authenticate", (request: Request, response: Response) => {
    let params = request.params();

    // find if any user matches login credentials
    let filteredUsers = users.filter(user => {
        return user.username === params.username && user.password === params.password;
    });

    if (filteredUsers.length) {
        // if login details are valid return 200 OK with user details and fake jwt token
        let user = filteredUsers[0];
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
        // else return 400 bad request
        response.send(new Error('Username or password is incorrect'));
    }
});

export { authRouter };
