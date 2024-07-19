// src/handlers/weiboHandler.js
const axios = require("axios");
const cheerio = require("cheerio");
const { headers } = require("../../config.json").plateforms.weibo;
exports.handleCommand = async (command, params) => {
  switch (command) {
    case "userInfo":
      return await searchUser(params?.keyword);
    case "search":
      return await searchWeibo(params?.keyword);
    default:
      throw new Error("NOT_SUPPORT_COMMAND");
  }
};
// 搜索用户
const searchUser = async (keyword) => {
  if (!keyword) {
    throw new Error("KEYWORD_IS_REQURED");
  }
  const url = `https://s.weibo.com/user?q=${encodeURIComponent(
    keyword
  )}&Refer=weibo_user`;
  const response = await axios.get(url, {
    headers,
  });
  // 需要解析返回的 HTML，提取用户信息
  return parseUserResponse(response.data, keyword);
};
// 搜索微博
const searchWeibo = async (keyword) => {
  const url = `https://s.weibo.com/weibo?q=${encodeURIComponent(keyword)}`;
  const response = await axios.get(url, {
    headers,
  });
  // 需要解析返回的 HTML，提取微博内容
  return parseWeiboResponse(response.data);
};
//获取用户信息
const fetchUserProfile = async (uid) => {
  try {
    const response = await axios.get(
      `https://weibo.com/ajax/profile/info?uid=${uid}`,
      {
        headers,
      }
    );
    if (response.data.ok === 1) {
      return response.data.data.user;
    } else {
      //可能出发反爬
      throw new Error("UNAUTHORIZED");
    }
  } catch (error) {
    throw error;
  }
};
//解析用户信息
const parseUserResponse = async (html, keyword) => {
  const $ = cheerio.load(html);
  const firstCardWrap = $(".card:first"); // 选取第一个 .card 元素
  if (!firstCardWrap || firstCardWrap.length === 0) {
    //触发反扒机制，抛出个错误类型
    throw new Error("UNAUTHORIZED");
  }

  const userName = firstCardWrap.find(".name").text();
  const uid = firstCardWrap.find(".woo-button-main").attr("uid");

  if (!uid) {
    throw new Error("USER_DOES_NOT_EXIST");
  }
  if (!keyword) {
    throw new Error("KEYWORD_IS_REQURED");
  }

  if (userName === keyword) {
    try {
      const userData = await fetchUserProfile(uid);
      return {
        name: userData.screen_name,
        avatar: userData.profile_image_url,
        // avatar_large: userData.avatar_large,
        // avatar_hd: userData.avatar_hd,
        id: userData.id,
        followers_count: userData.followers_count,
        friends_count: userData.friends_count,
        url: userData.url,
      };
    } catch (error) {
      throw error;
    }
  } else {
    throw new Error("USER_DOES_NOT_EXIST");
  }
};

const parseWeiboResponse = (html) => {
  // 解析 HTML
  const $ = cheerio.load(html);
  const weibos = [];
  $(".card-wrap").each((i, elem) => {
    const weibo = {
      content: $(elem).find(".name").text(),
      // 添加更多微博内容的提取逻辑
    };

    weibos.push(weibo);
  });

  return weibos;
};
