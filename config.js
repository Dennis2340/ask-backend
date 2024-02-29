// Connection to MongoDB
import mongoose from 'mongoose';
import ('dotenv')
export const connectDB = async () => {
  console.log('MongoDB connection with retry');
  try{

  await mongoose.connect(process.env.MONGODB_URI, {
    })
    
}catch(err) {
  console.log('MongoDB connection unsuccessful, retry after 5 seconds.');
  setTimeout(connectDB, 5000);
  console.log(err)
  };
}

const allowedOrigins = ['http://localhost:3000', 'http://localhost:3001']

export const corsOption = {
    origin: (origin, callback) => {
        if(allowedOrigins.indexOf(origin) !== -1 || !origin){
            callback(null, true)
        }
        else{
            callback(new Error("not allowed by Cors"))
        }
    },
     optionSuccessStatus: 200
}


