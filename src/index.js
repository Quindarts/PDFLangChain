import dotenv from 'dotenv';
import express from 'express';
import router from './routes/routing.js';
const app = express();
dotenv.config();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/', router);

app.listen(PORT, () => {
  console.log(`Server is running at: http://localhost:${PORT}`);
});
