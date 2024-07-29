const jwt = require("jsonwebtoken");

// create and export an async function in which the authorization code will live:
module.exports = async (request, response, next) => {
  try{
    // get the token from the authorization header
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      throw new Error("No authorization header provided 没有授权的header提供");
    }
    // get the token from the authorization header
    const token = await request.headers.authorization.split(" ")[1];
    if (!token){
      throw new Error("No token provided");
    }
    // check if the token matches the supposed origin
    // "RANDOM-TOKEN"相当于token名字，创建和解码的时候需要保持一致，不然通过不了
    const decodedToken = await jwt.verify(token, "RANDOM-TOKEN");
    // retrieve the user details of the logged in user
    const user = await decodedToken;
    // pass the user down to the endpoints here
    request.user = user;

    // pass  down functionality to the endpoint
    // next() 是 Express 中间件函数的一部分，用于将控制权传递给下一个中间件函数或路由处理程序。
    //具体来说，当一个中间件函数完成其任务后，可以调用 next() 以便 Express 继续处理剩余的请求。
    //这样可以在多个中间件函数之间进行处理逻辑的链式传递。

    //在你的代码中，next() 的作用是确保在成功验证 JWT 令牌后，请求继续到达下一个中间件或路由处理程序
    next();
  }
  catch (error) {
    console.error("Authorization error:", error.message); // log the error for debugging
    response.status(401).json({
      error: new Error("Invalid Request! 无效请求"),
      message:error.message + '1'
    })
  }
}