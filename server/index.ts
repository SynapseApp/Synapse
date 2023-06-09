import express from 'express';
import userRoutes from './routes/userRoutes';
import path from 'path';
import { url } from './store';
import connectDatabase from './database/mongodb';
import bodyParser from 'body-parser';

const cors = require('cors');
const app = express();
app.use(cors());



app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true })); //might need this in the future

// serves our build file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// using routes...
app.use('/user', userRoutes);

// starting server
app.listen(3000, () => {
  console.log(`server is up and running at ${url}`);

  connectDatabase();
});

export default app;
