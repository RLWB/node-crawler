// src/utils/platformSelector.js
const wechatHandler = require('../handlers/wechatHandler');
const weiboHandler = require('../handlers/weiboHandler');
const twitterHandler = require('../handlers/twitterHandler');
const douyinHandler = require('../handlers/douyinHandler');
const xiaohongshuHandler = require('../handlers/xiaohongshuHandler');
const videoHandler = require('../handlers/videoHandler');

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
