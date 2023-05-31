import app from '../index';
import { Request, Response, Router } from 'express'
const userRoutes = Router();

userRoutes.get('/user', (req: Request, res: Response) => {
    res.send("Hello World");
})

export default userRoutes;