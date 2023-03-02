const mongoose=require('mongoose');
const dotenv = require("dotenv");
dotenv.config();

module.exports=()=>{
//DB connection 
mongoose.connect(process.env.DB_LINK.toString());


mongoose.connection.on('open',()=>{
  //console.log('MongoDB connection successful');
});
mongoose.connection.on('error',(err)=>{
  console.log('MongoDB connection fail');
});


mongoose.Promise=global.Promise;
}



