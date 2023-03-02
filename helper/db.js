const mongoose=require('mongoose');
const dotenv = require("dotenv");
dotenv.config();

module.exports=()=>{
//DB connection 

mongoose.connect("mongodb+srv://ripperdevdb:r9kFp6NZGDS0nhq@dynamicgentis.5kwl9hg.mongodb.net/?retryWrites=true&w=majority");


mongoose.connection.on('open',()=>{
  //console.log('MongoDB connection successful');
});
mongoose.connection.on('error',(err)=>{
  console.log('MongoDB connection fail');
});


mongoose.Promise=global.Promise;
}



