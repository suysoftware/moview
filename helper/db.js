const mongoose=require('mongoose');
require('dotenv').config();

module.exports=()=>{
//DB connection 
mongoose.connect(process.env.DB_LINK);


mongoose.connection.on('open',()=>{
  console.log('MongoDB connection successful');
});
mongoose.connection.on('error',(err)=>{
  console.log('MongoDB connection fail');
});


mongoose.Promise=global.Promise;
}



