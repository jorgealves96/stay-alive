const mongoose = require("mongoose");

mongoose.connect('mongodb+srv://mebetop:mongo123@cluster0-hnqku.gcp.mongodb.net/stayAliveDB', { 
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
.then(response => console.log('Connected to Database..'))
.catch(error => console.log('error ->', error.message));
mongoose.Promise = global.Promise;

module.exports = mongoose;