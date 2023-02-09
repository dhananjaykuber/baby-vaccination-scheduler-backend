require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const PORT = process.env.PORT || 4000;

const hospitalRouter = require('./routes/hospitalRoute');
const childrenRouter = require('./routes/childrenRoute');
const vaccinationRouter = require('./routes/vaccinationRoute');
const mailRouter = require('./routes/mailRoute');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/hospital', hospitalRouter);
app.use('/api/children', childrenRouter);
app.use('/api/vaccination', vaccinationRouter);
app.use('/api/send-mail', mailRouter);

// connect mongodb
mongoose.set('strictQuery', true);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
