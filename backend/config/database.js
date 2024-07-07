// import mongoose from "mongoose";
// import dotenv from "dotenv"
// dotenv.config({
//     path:"../config/.env"
// })


// const databaseConnection = ()=> {
//  mongoose.connect(process.env.MONGO_URI).then(()=>{
//     console.log('connected to MongoDB databse')
//  }).catch((error)=>{
//     console.log(error);
//  })
// }

// export default databaseConnection;

import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({
  path: "../config/.env"
});

const databaseConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 30000, // 30 seconds timeout for server selection
      socketTimeoutMS: 45000, // 45 seconds timeout for socket operations
    });
    console.log('Connected to MongoDB database');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit with failure
  }
};

export default databaseConnection;
