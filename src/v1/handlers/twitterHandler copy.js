const { TwitterApi } = require("twitter-api-v2");
const config = require("../../../config.json").plateforms.twitter;
console.log(config);
const twitterClient = new TwitterApi(config);
const readOnlyClient = twitterClient.readOnly;


exports.handleCommand = async (command, params) => {
  switch (command) {
    case "getUserInfo":
      try {
        const user = await readOnlyClient.v2.userByUsername("plhery");
        return user;
      } catch (error) {
        console.log(error, 123);
        throw error;
      }
    default:
      throw new Error("NOT_SUPPORT_COMMAND");
  }
};
