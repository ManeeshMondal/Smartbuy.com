const mongoos= require("mongoose");

const connectDatabase=()=>{
  console.log(`${process.env.DB_URL}`)
    mongoos.connect(`mongodb+srv://Maneesh1120:maneesh1120@smartbuy.yqdrzmh.mongodb.net/SmartBuy`,{
        useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true, 
    })
    .then((data) => {
      console.log(`Mongodb connected with server: ${data.connection.host}`);
    })
};

module.exports = connectDatabase;