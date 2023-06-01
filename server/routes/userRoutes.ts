// IMPORTS
import { Request, Response, Router } from "express";
const userRoutes = Router();

// ADDING ROUTES TO userRoutes
userRoutes.get("/", (req: Request, res: Response) => {
  res.send("This is user routes");
});

// EXPORTING
export default userRoutes;
