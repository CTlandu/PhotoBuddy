const {middleware} = require("supertokens-node/framework/express");

// import supertoken packages
const supertokens =require("supertokens-node");
const Session = require("supertokens-node/recipe/session");
const EmailPassword = require("supertokens-node/recipe/emailpassword");
const EmailVerification = require("supertokens-node/recipe/emailverification");
const ThirdParty = require("supertokens-node/recipe/thirdparty");
const { errorHandler } = require("supertokens-node/framework/express");
const Dashboard = require("supertokens-node/recipe/dashboard");
const { verifySession } = require("supertokens-node/recipe/session/framework/express");
const { SessionRequest } = require("supertokens-node/framework/express");
const dbconnect = require("./db/dbConnect");
const User = require("./db/userModel");

dbconnect();

// 初始化supertokens
async function superTokensInit()
{
    supertokens.init({
        framework: "express",
        supertokens: {
            // https://try.supertokens.com is for demo purposes. Replace this with the address of your core instance (sign up on supertokens.com), or self host a core.
            // connectionURI: "https://try.supertokens.com",
            connectionURI: "https://st-dev-66f4ad70-4fb9-11ef-a24d-7fa502ed3c7e.aws.supertokens.io",
            // apiKey: <API_KEY(if configured)>,
            apiKey: "5cwWMIhpOn9Gq=IY3BooLy7u3t",
        },
        appInfo: {
            // learn more about this on https://supertokens.com/docs/thirdpartyemailpassword/appinfo
            appName: "photobuddy",
            apiDomain: "http://localhost:4000",
            websiteDomain: "http://localhost:5173",
            apiBasePath: "/auth",
            websiteBasePath: "/auth"
        },
        recipeList: [
            Dashboard.init({
              // 设置管理员的邮箱。除了管理员有读写功能，其他dashboard user只能读
              admins: [
                "jizhoutang@outlook.com",
              ]
            }),
            EmailPassword.init(),
            EmailVerification.init({
              mode: "OPTIONAL", // or OPTIONAL
            }),
            ThirdParty.init({
              // We have provided you with development keys which you can use for testing.
              // IMPORTANT: Please replace them with your own OAuth keys for production use.
              signInAndUpFeature: {
                  providers: [{
                      config: {
                          thirdPartyId: "google",
                          clients: [{
                              clientId: "1060725074195-kmeum4crr01uirfl2op9kd5acmi9jutn.apps.googleusercontent.com",
                              clientSecret: "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"
                          }]
                      }
                  }, {
                      config: {
                          thirdPartyId: "github",
                          clients: [{
                              clientId: "467101b197249757c71f",
                              clientSecret: "e97051221f4b6426e8fe8d51486396703012f5bd"
                          }]
                      }
                  }
                ],
                }
              }),
            Session.init({
              exposeAccessTokenToFrontendInCookieBasedAuth: true,
            }) // initializes session features
          ]
      });
}
module.exports = superTokensInit;