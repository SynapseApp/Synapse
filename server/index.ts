import express from "express";
import userRoutes from "./routes/userRoutes";
import path from "path";
import { url } from "./store";

const app = express();

// serves our build file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// using routes...
app.use("/user", userRoutes);

// starting server
app.listen(3000, () => {
  console.log(`server is up and running at ${url}`);

  // Ank connect to database here to ensure that we will be connecting to db after server is ready
});

export default app;
