// IMPORTS
import { Request, Response, Router } from 'express'
const userRoutes = Router();

// ADDING ROUTES TO userRoutes
userRoutes.get('/user', (req: Request, res: Response) => {
    res.send("Hello World");
})

// EXPORTING
export default userRoutes;