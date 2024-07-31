// src/utils/platformSelector.js
const wechatHandler = require('../v1/handlers/wechatHandler');
const weiboHandler = require('../v1/handlers/weiboHandler');
const twitterHandler = require('../v1/handlers/twitterHandler');
const douyinHandler = require('../v1/handlers/douyinHandler');
const xiaohongshuHandler = require('../v1/handlers/xiaohongshuHandler');
const videoHandler = require('../v1/handlers/videoHandler');

module.exports = (platform) => {
  switch (platform) {
    case 'wechat': return wechatHandler;
    case 'weibo': return weiboHandler;
    case 'twitter': return twitterHandler;
    case 'douyin': return douyinHandler;
    case 'xiaohongshu': return xiaohongshuHandler;
    case 'video': return videoHandler;
    default: throw new Error('NOT_SUPPORT_PLATFORM');
  }
};
