const mongoose = require("mongoose");
require('dotenv').config();

async function dbConnect(){
  mongoose.connect(
    process.env.DB_URL,
    {
      /**警告：useNewUrlParser 和 useUnifiedTopology 选项在 MongoDB Node.js 驱动版本 4.0.0 及以上版本中已弃用。
       * 这些选项现在已经不再需要，并且在未来版本中会被移除。你可以从 MongoClient 的连接选项中移除这些设置。 */
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
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