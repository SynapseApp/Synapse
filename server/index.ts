import express from "express";
import userRoutes from "./routes/userRoutes";
import path from "path";

const app = express();

// during deployment our service provider will provide their own port
// this is a flexible way to say that if port is provided then use it or use 3000
const port = process.env.PORT || 3000;

// serves our build file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// using routes...
app.use("/user", userRoutes);

// starting server
app.listen(3000, () => {
  console.log(`server is up and running at http://localhost:${port}`);

  // Ank connect to database here to ensure that we will be connecting to db after server is ready
});

export default app;
