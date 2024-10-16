const mongoose = require("mongoose");
const User = require("./userModel"); // 确保路径正确
require("dotenv").config();

// 连接到数据库
// 根据环境变量连接到不同的数据库
mongoose.connect(
  `mongodb+srv://ctlandu:admin123@mernapp.hj5mpxa.mongodb.net/authDB?retryWrites=true&w=majority&appName=MERNapp`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const addAddressesFieldToUsers = async () => {
  try {
    // 查找所有没有 addresses 字段的用户
    const users = await User.find({ addresses: { $exists: false } });

    for (const user of users) {
      user.addresses = []; // 初始化为空数组
      await user.save();
      console.log(`Updated user ${user.id} with addresses field.`);
    }

    console.log("All users updated successfully.");
  } catch (error) {
    console.error("Error updating users:", error);
  } finally {
    mongoose.connection.close();
  }
};

addAddressesFieldToUsers();
