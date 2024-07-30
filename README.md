### 联合抓取服务项目

[流程图](https://doc.weixin.qq.com/doc/w3_AJEAwQb1AJk19fyJZiTQo6sD28qaS?scode=ANIA9gdUAAceDchrDKAUAAtwYOAGo)

[模块图](https://doc.weixin.qq.com/doc/w3_AJEAwQb1AJk19fyJZiTQo6sD28qaS?scode=ANIA9gdUAAceDchrDKAUAAtwYOAGo)
### 项目目录

```
huanqiu-summary-fetch/
│
├── src/
│   ├── index.js       // 入口文件
│   ├── routes/
│   │   ├── command.js // 处理指令的路由
│   ├── handlers/
│   │   ├── wechatHandler.js
│   │   ├── weiboHandler.js
│   │   ├── twitterHandler.js
│   │   ├── douyinHandler.js
│   │   ├── xiaohongshuHandler.js
│   │   └── videoHandler.js
│   ├── middleware/
│   │   ├── auth.js    // 认证中间件
│   │   └── errorHandler.js // 错误处理中间件
│   ├── services/
│   │   ├── authService.js // 认证服务
│   │   └── dataService.js // 数据处理服务
│   └── utils/
│       ├── apiHandler.js  // API处理工具
│       ├── logger.js // 记录日志工具
│       └── platformSelector.js // 平台选择器
│
├── package.json
└── README.md
```
### 安装&启动

```bash
# 安装依赖
yarn 
# 启动服务
yarn start || yarn dev
```




* Cookie过期参考
B 站的 Cookie 每隔一段时间会自动刷新，此时就失效了。

在浏览器无痕模式（隐身模式）下登录后获取相应的 Cookie。因为用户通过浏览器访问才会触发 Cookie 刷新，所以可以用该方法规避。

* 解决微博图片403，防盗，参考
https://blog.axiaoxin.com/post/2023-10-14-%E5%85%8D%E8%B4%B9%E5%9B%BE%E5%BA%8A%E4%B9%8B%E5%BE%AE%E5%8D%9A%E5%A4%96%E9%93%BE%E5%9B%BE%E7%89%87%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88/
