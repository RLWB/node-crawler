const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());

async function getUserInfo(username) {
  if (!username) {
    throw new Error("KEYWORD_IS_REQURED");
  }
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-features=site-per-process",
    ],
  });
  const page = await browser.newPage();
  return new Promise(async (resolve, reject) => {
    let userInfo = null;
    // 监听响应事件
    page.on("response", async (response) => {
      try {
        const request = response.request();
        if (
          response.url().includes("https://www.douyin.com/aweme/v1/web/general/search/single") &&
          request.method() === "GET"
        ) {
          const body = await response.json();
          if(body.status_code === 0 && Array.isArray(body.data) && body.data.length > 0){
            resolve({
                name: body.data[0]?.user_list[0]?.user_info?.nickname,
                avatar: body.data[0]?.user_list[0]?.user_info?.avatar_thumb?.url_list[0],
                followers_count: body.data[0]?.user_list[0]?.user_info?.follower_count,
                friends_count: body.data[0]?.user_list[0]?.user_info?.following_count,
                url: `https://www.douyin.com/user/${body.data[0]?.user_list[0]?.user_info?.sec_uid}`,
            })
          }else {
            throw new Error("USER_DOES_NOT_EXIST");
          }
        }
      } catch (error) {
        reject(error);
      }
    });
    await page.goto(`https://www.douyin.com/search/${encodeURIComponent(username)}`, {
      waitUntil: "domcontentloaded",
    });
  }).finally(async () => {
    await browser.close();
  });
}

exports.handleCommand = async (command, params) => {
  switch (command) {
    case "getUserInfo":
      try {
        const user = await getUserInfo(params?.keyword);
        return user;
      } catch (error) {
        throw error;
      }
    default:
      throw new Error("NOT_SUPPORT_COMMAND");
  }
};
