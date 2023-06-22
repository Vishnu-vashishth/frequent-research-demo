const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const userRoute = require('./routes');



dotenv.config();
app.use(express.json());
app.use(cors());
app.use('/api', userRoute);

const port = process.env.PORT || 3000;

mongoose
  .connect(process.env.DB)
  .then(() => console.log('DB Connected'))
  .catch(err => console.log(err));

app.listen(port, () => console.log(`Server running on port ${port}`));
