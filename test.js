const axios = require("axios");
const crypto = require("crypto");
const OAuth = require("oauth-1.0a");
const config = require("./config.json").plateforms.twitter;
// 你的Twitter API凭据
const consumer_key = config.appKey;
const consumer_secret = config.appSecret;
const access_token = config.accessToken;
const access_token_secret = config.accessSecret;

// 要获取信息的用户ID或用户名
const user_id = "12345"; // 或者使用 const username = "example_user";

// API端点
const url = `https://api.twitter.com/2/users/${user_id}`;
// 如果使用用户名，URL应该是：
// const url = `https://api.twitter.com/2/users/by/username/${username}`;

// 添加你想要获取的字段
const params = {
  "user.fields":
    "created_at,description,entities,id,location,name,pinned_tweet_id,profile_image_url,protected,public_metrics,url,username,verified,withheld",
};

// 创建OAuth对象
const oauth = OAuth({
  consumer: { key: consumer_key, secret: consumer_secret },
  signature_method: "HMAC-SHA1",
  hash_function(base_string, key) {
    return crypto.createHmac("sha1", key).update(base_string).digest("base64");
  },
});

// 生成授权头
const authorization = oauth.authorize(
  {
    url,
    method: "GET",
    data: params,
  },
  {
    key: access_token,
    secret: access_token_secret,
  }
);

// 构建请求头
const headers = oauth.toHeader(authorization);

// 发送请求
axios
  .get(url, {
    headers: {
      ...headers,
      "User-Agent": "v2UserLookupJS",
    },
    params: params,
  })
  .then((response) => {
    console.log(JSON.stringify(response.data, null, 2));
  })
  .catch((error) => {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
  });
