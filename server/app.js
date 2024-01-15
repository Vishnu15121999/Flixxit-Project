import express from 'express';
import mongoose from 'mongoose';
import router from './routes/user-routes.js';
import cors from 'cors';
import stripe from 'stripe';
//const stripe = require('stripe')

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/user', router)
mongoose.connect("mongodb+srv://vishnugawade795:fqrkg48K9pxUEFkW@FlixitApplication.7ugvftd.mongodb.net/?retryWrites=true&w=majority")
  .then(() => app.listen(5000))
  .then(() => console.log("Connected to databse and listening on the port 5000"))
  .catch((err) => console.log(err));

//fqrkg48K9pxUEFkW