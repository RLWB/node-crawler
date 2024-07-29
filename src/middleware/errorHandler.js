const logger = require("../utils/logger");
module.exports = (err, req, res, next) => {
  let code, message;
  switch (err.message) {
    case "NOT_SUPPORT_PLATFORM":
      code = 400;
      message = "平台不支持";
      break;
    case "NOT_SUPPORT_COMMAND":
      code = 400;
      message = "命令不支持";
      break;
    case "UNAUTHORIZED":
      code = 403;
      message = "未授权";
      break;
    case "USER_DOES_NOT_EXIST":
      code = 404;
      message = "用户不存在";
      break;
    case "KEYWORD_IS_REQURED":
      code = 400;
      message = "关键字不能为空";
      break;
    case "INVAID_JSON":
      return;
    default:
      code = 500;
      message = err.message;
      break;
  }
  res.status(code).json({
    detail: {
      code,
      message,
      params: req.body, // 将请求的参数包含在错误响应中
      time: new Date().toLocaleString(),
      router: req.url,
    },
  });
  logger.error(
    `${code} - ${JSON.stringify(req.body)} - ${message} - ${
      req.originalUrl
    } - ${req.method} - ${req.ip}`
  );
};
