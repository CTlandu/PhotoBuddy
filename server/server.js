require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
const express = require('express');
const router = require("./routes/routes");
// bcrypt 将用户的明文密码转换为一个加密的哈希值。这个哈希值是不可逆的，即无法从哈希值直接还原出原始密码。
//当用户尝试登录时，bcrypt 可以将用户输入的明文密码与存储在数据库中的哈希值进行比较，判断密码是否正确。
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// require database connection
const dbConnect = require('./db/dbConnect');
const User = require("./db/userModel");

dbConnect();

// express app
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))


// middleware
// const corOptions = {
//   origin: "*",
//   Credentials: true,
//   optionSuccessStatus: 200,
// }
// app.use(cors(corOptions));
// app.use('/',router)


// listen for requests
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started on ${port}`);
});
// app.get('/api/items', (req, res) => {
//   res.json({ message: 'This is CORS-enabled for all origins!' });
// });


// create a "register" endpoint
app.post('/register',(request, response) => {
  // hash the password before saving the email and password into the database
  // The code below is telling bcrypt to hash the password received from request body 10 times or 10 salt rounds.
  bcrypt.hash(request.body.password, 10)
    // In the then block, save the data you have now. Create a new instance of the userModel and collect the updated data:
    .then((hashedPassword) => {
      const user = new User({
        email: request.body.email,
        password: hashedPassword,
      });

      // save the user to the database, with feedback to the client.
      user.save().then((result) => {
        response.status(201).send({
          message: "User created Successfully用户注册成功",
          result,
        });
      })
      .catch((error) => {
        response.status(500).send({
          message: "Error creating user用户创建失败",
          error,
        })
      })

    })
    // catch errors
    .catch((e) => {
      response.status(500).json({
        message: "密码哈希失败",
        e: e.message,
      });
      console.log(e);
    })
});

// create a "login" endpoint
app.post("/login",(request,response) => {
  // Check if the email that the user entered is in the database.
  User.findOne({email: request.body.email})
    // if successfully found, compare the password entered by the user with the one in the database.
    .then((user) => {
      bcrypt.compare(request.body.password, user.password)
      // to see if the passwords match
      .then((passwordChecked) => {
        if(!passwordChecked){
          return response.status(401).send({
            message: "密码错误1",
          })
        }
        // create a JWT token
        const token = jwt.sign(
          {
            userId: user._id,
            userEmail: user.email,
          },
          "RANDOM_TOKEN",
          { expiresIn: '1h'}
        );
        // return success response
        response.status(201).send({
          message: "登录成功",
          email: user.email,
          token,
        });
      })
      .catch((error) => {
        response.status(401).send({
          message: "密码错误2",
          error,
        })
      })
    })
    .catch(error => {
      response.status(404).send({
        message: "Email not found",
        error,
      })
    })
});

app.get("/free-endpoint",(request, response) => {
  response.json({ message: "You are free to access me anytime"});
  console.log("This is a free endpoint");
})

app.get("auth-endpoint", (request, response) => {
  response.json({message: "You are authorizaed to access me"});
  console.log("This is an authenticated endpoint");
})