const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config(); //it loads variable from .env file and stores
//it in process.env(we can use process.env in app)

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); 

const propertyRoutes = require('./routes/property');
app.use('/', propertyRoutes);

const authRoutes = require('./routes/auth');
app.use('/', authRoutes);
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));


app.get('/',(req,res)=>{
  res.redirect('/login.html')
})
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
