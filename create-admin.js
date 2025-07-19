const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const Admin = require('./models/Admin');

dotenv.config();

mongoose.connect(process.env.MONGO_URI) //This line tells Mongoose (a MongoDB ODM for Node.js) to connect your app to a MongoDB database.
  .then(() => {
    return bcrypt.hash("4321", 10);
  }) //this returns a value and it is used for the 2nd .then() as hashedPassword (please remember :(((()))))
  .then(hashedPassword => {
    return Admin.create({ username: "santhoshi", password: hashedPassword });
  })
  .then(() => {
    console.log("✅ Admin user created!");
    process.exit(); //this will end the Node.js becoz, we need this code only to store valid and correct username and password 
  })
  .catch(err => {
    console.error("❌ Error:", err);  
    process.exit(1);
  });

