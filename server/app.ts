import { json, urlencoded } from "body-parser";
import * as compression from "compression";
import * as express from "express";
import * as path from "path";

import { messageRouter } from './routes/MessageApiController';
import { teamRouter } from './routes/TeamApiController';
import { threadRouter } from './routes/ThreadApiController';
import { userRouter } from './routes/UserApiController';
import { authRouter } from './routes/AuthApiController';

const app: express.Application = express();

app.disabled('x-powered-by');

app.use(json());
app.use(compression());
app.use(urlencoded({ extended: true }));

// api routes
app.use("/api/messages", messageRouter);
app.use("/api/teams", teamRouter);
app.use("/api/threads", threadRouter);
app.use("/api/users", userRouter);
app.use("/api/authenticate", authRouter);

const WebSocket = require('ws');
const http = require('http');
const url = require('url');
const jwt = require('jsonwebtoken');
import { secret } from './config';

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
import { db } from './db';

let users: Array<any> = [];

wss.on('connection', function connection(ws, req) {
    let token = req.url.substring(8);
    let decoded = jwt.verify(token, secret);

    let userId = decoded.data.id;

    users[userId] = ws;

    ws.on('message', function incoming(message) {
        db.query('SELECT * FROM userthreadlookup WHERE threadId=?', JSON.parse(message).threadId, (err, res) => {
            if(err) {
                throw err;
            }
            res.forEach(element => {
                if(users[element.userId] && users[element.userId].readyState === WebSocket.OPEN) {
                    users[element.userId].send(message);
                }
            });
        });
    });

    ws.on('close', (foo) => {
        users[userId] = null;
    })
});

server.listen(8080, function listening() {
  console.log('Listening on %d', server.address().port);
});

if (app.get("env") === "production") {
    // app.use(express.static(path.join(__dirname, "/../client")));
}

app.use((req: express.Request, res: express.Response, next) => {
    const err = new Error("Not Found");
    next(err);
});

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {

    res.status(err.status || 500);
    res.json({
        error: {},
        message: err.message,
    });
});

export { app };
