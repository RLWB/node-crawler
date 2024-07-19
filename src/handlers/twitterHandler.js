const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());

async function searchTweets(query) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto("https://twitter.com/explore");

  // 输入查询并搜索
  await page.waitForSelector('input[data-testid="SearchBox_Search_Input"]');
  await page.type('input[data-testid="SearchBox_Search_Input"]', query);
  await page.keyboard.press("Enter");

  // 等待搜索结果加载
  await page.waitForNavigation({ waitUntil: "networkidle2" });

  // 抓取推文
  const tweets = await page.evaluate(() => {
    let tweetElements = document.querySelectorAll("article div[lang]");
    let tweets = [];
    tweetElements.forEach((tweet) => {
      tweets.push(tweet.innerText);
    });
    return tweets;
  });

  await browser.close();
  return tweets;
}

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
          response.url().includes("UserByScreenName") &&
          request.method() === "GET"
        ) {
          const body = await response.json();
          userInfo = body.data?.user?.result?.legacy;
          if (!userInfo || !userInfo?.screen_name) {
            throw new Error("USER_DOES_NOT_EXIST");
          }
          resolve({
            name: userInfo.screen_name,
            avatar: userInfo.profile_image_url_https,
            followers_count: userInfo.followers_count,
            friends_count: userInfo.friends_count,
            url: userInfo.url,
          });
        }
      } catch (error) {
        reject(error);
      }
    });
    await page.goto(`https://x.com/${encodeURIComponent(username)}`, {
      waitUntil: "domcontentloaded",
    });
  }).finally(async () => {
    await browser.close();
  });
}

exports.handleCommand = async (command, params) => {
  switch (command) {
    case "userInfo":
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
