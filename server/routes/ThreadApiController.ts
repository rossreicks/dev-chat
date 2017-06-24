import { Request, Response, Router } from 'express';

const threadRouter: Router = Router();

// Route: /api/users

threadRouter.get("/:id", (request: Request, response: Response) => {
    response.json("user");
});

export { threadRouter };
