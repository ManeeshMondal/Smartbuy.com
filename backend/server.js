const app=require('./app');
const dotenv=require("dotenv")
const cloudinary= require("cloudinary")
const connectToDatabase= require('./config/database')

//  Handling Uncaught Exception
  process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

// config 
dotenv.config({path:"backend/config/config.env"}) 


// connection to database
connectToDatabase();

// cloude set up 
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME ,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

   // const port= process.env.PORT

    const server = app.listen("4000", async()=>{
        console.log(`Server is working on http://localhost:4000`);
    }) 


// Unhandled Promise Rejection  
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);
    server.close(() => {
      process.exit(1);
    });
  });