// src/handlers/wechatHandler.js
const axios = require('axios');

exports.handleCommand = async (command, params) => {
  switch (command) {
    case 'search':
      return await search(params.keyword);
    case 'userInfo':
      return await getUserInfo(params.userId);
    default:
      throw new Error('Unsupported command');
  }
};

const search = async (keyword) => {
  // 实现搜索功能
  const response = await axios.get(`https://api.wechat.com/search?keyword=${keyword}`);
  return response.data;
};

const getUserInfo = async (userId) => {
  // 实现获取用户信息功能
  const response = await axios.get(`https://api.wechat.com/user/${userId}`);
  return response.data;
};
