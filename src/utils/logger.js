const { createLogger, format, transports } = require("winston");
const { logEnv } = require("../../config.json").webConfig;
module.exports = createLogger({
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize(), // 添加颜色以区分不同级别的日志
        format.timestamp({ format: "MMM-DD-YYYY HH:mm:ss" }),
        format.align(),
        format.printf(
          (info) =>
            `${logEnv}.INFO=>${info.level}: ${[info.timestamp]}: ${
              info.message
            }`
        )
      ),
    }),
  ],
});
