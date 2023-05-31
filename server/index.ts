// IMPORTS
import express from 'express'
const app = express();
import userRoutes from './routes/userRoutes';

// USING userRoutes
app.use('/', userRoutes);

// PORT
app.listen(3000)

// EXPORTING
export default app