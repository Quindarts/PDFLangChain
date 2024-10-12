const express = require('express');
const aiRoutes = require('./routes/aiRoutes');
const dotenv = require('dotenv');

const app = express();

dotenv.config();
// const os = require('os');
// console.log('Host info::::', os.cpus());
const PORT = process.env.PORT;

app.use(express.json());

app.use('/api/v1', aiRoutes);

app.listen(PORT, () => {
  console.log(`Server is running::::: http://localhost:${PORT}`);
});
