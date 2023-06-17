import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import path from "path";
import { url } from "./store.js";
import connectDatabase from "./database/mongodb.js";

const app = express();
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions)); // Use this after the variable declaration
app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true })); //might need this in the future

// serves our build file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// using routes...
app.use("/user", userRoutes);

// starting server
app.listen(3000, () => {
  console.log(`server is up and running at ${url}`);

  connectDatabase();
});

export default app;
