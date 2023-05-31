import express from 'express'
const app = express();
import userRoutes from './routes/userRoutes';

app.use('/', userRoutes);

app.listen(3000)

export default app