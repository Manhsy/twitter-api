//https://mongoosejs.com/docs/
const mongoose = require('mongoose');

// connect to database
mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
  const db = mongoose.connection;
  
  db.once("open", function () {
    console.info("successfully connected to MongoDB!");
  });
  
  module.exports = mongoose;