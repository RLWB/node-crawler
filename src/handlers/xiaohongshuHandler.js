const puppeteer = require("puppeteer");

async function getUserInfo(keyword) {
  if (!keyword) {
    throw new Error("KEYWORD_IS_REQURED");
  }
  const browser = await puppeteer.launch({
    headless: false,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-features=site-per-process",
      //打开devtools
      "--auto-open-devtools-for-tabs",
    ],
  });
  const page = await browser.newPage();
  await page.goto(
    `https://www.xiaohongshu.com/search_result/?keyword=${keyword}&source=web_explore_feed&search_type=user&type=51`,
    {
      waitUntil: "domcontentloaded",
    }
  );
  // 等待页面元素加载完成
  await page.waitForSelector("#user");
  // 点击元素
  await page.click("#user");
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
