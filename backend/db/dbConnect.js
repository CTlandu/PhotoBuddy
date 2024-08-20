const mongoose = require("mongoose");
require('dotenv').config();

async function dbConnect(){
  mongoose.connect(
    process.env.DB_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  ).then( () => {
    console.log("成功连接到MongoDB Atlas!");
    console.log("数据库名称: " + mongoose.connection.db.databaseName + "\n")
  })
  .catch((error) => {
    console.log("连接失败");
    console.error(error);
  })
}

module.exports = dbConnect