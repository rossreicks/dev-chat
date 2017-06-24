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
