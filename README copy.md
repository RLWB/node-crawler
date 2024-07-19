
```mermaid
flowchart TD
    A[🧑 客户端] -->|请求| D[⚙️ 请求处理器]
    D -->|分发| F{🔀 平台选择器}
    F -->|微信| G[💬 公众号抓取器]
    F -->|微博| H[🐦 微博抓取器]
    F -->|推特| I[🐤 推特抓取器]
    F -->|...| OTHER[其他抓取器]
    F -->|抖音| J[🎵 抖音抓取器]
    F -->|小红书| K[📕 小红书抓取器]
    F -->|微信| L[🎥 视频号抓取器]
    
    subgraph "🛡️ 反爬机制处理"
        AA[🕷️ IP代理池]
        BB[⏱️ 请求延迟]
        CC[🔄 User-Agent轮换]
        DD[🍪 Cookie管理]
    end
    
    G & H & I & OTHER & J & K & L --> AA & BB & CC & DD
    AA & BB & CC & DD --> M[💾 数据聚合器]
    
    M <--> R[(📦 Redis缓存)]
    M --> N[🧹 数据清洗器]
    N --> P[📄 报告生成器]
    P --> Q[📤 响应格式化器]
    Q -->|响应| A

    D -.-> S[📘 Swagger/OpenAPI]
    S -.-> T[🌐 自动生成的API文档]
    
    subgraph "📡 系统监控"
        X[💓 健康检查]
        Y[📈 性能指标]
        Z[⚠️ 告警系统]
    end
    
    style A fill:#f9f,stroke:#333,stroke-width:4px
    style D fill:#bfb,stroke:#333,stroke-width:2px
    style F fill:#fff,stroke:#333,stroke-width:2px
    style G,H,I,J,K,L,OTHER fill:#bff,stroke:#333,stroke-width:2px
    style M,N,P fill:#fbf,stroke:#333,stroke-width:2px
    style Q fill:#bbf,stroke:#333,stroke-width:2px
    style R fill:#ffcccc,stroke:#ff0000,stroke-width:2px
    style S fill:#e6ffcc,stroke:#82b366,stroke-width:2px
    style T fill:#e6ffcc,stroke:#82b366,stroke-width:2px
    style AA,BB,CC,DD fill:#ffe6cc,stroke:#d79b00,stroke-width:2px
```

```mermaid
flowchart TD
    A[🧑 客户端] -->|API请求| B(🖥️ API网关)
    B -->|认证| C{🔐 认证服务}
    C -->|有效| D[⚙️ 请求处理器]
    C -->|无效| E[🚫 错误处理]
    D -->|分发| F{🔀 平台选择器}
    F -->|微信| G[💬 公众号抓取器]
    F -->|微博| H[🐦 微博抓取器]
    F -->|推特| I[🐤 推特抓取器]
    F -->|...| OTHER[其他抓取器]
    F -->|抖音| J[🎵 抖音抓取器]
    F -->|小红书| K[📕 小红书抓取器]
    F -->|微信| L[🎥 视频号抓取器]
    G & H & I & OTHER & J & K & L --> M[💾 数据聚合器]
    M --> N[🧹 数据清洗器]
    N --> O[📊 分析引擎]
    O --> P[📄 报告生成器]
    P --> Q[📤 响应格式化器]
    Q --> R[🖥️ API网关]
    R -->|API响应| A
    
    subgraph "🛡️ 安全层"
        S[🔒 加密]
        T[⏱️ 速率限制]
        U[🔥 防火墙]
    end
    
    subgraph "📡 系统监控"
        V[💓 健康检查]
        W[📈 性能指标]
        X[⚠️ 告警系统]
    end
    
    style A fill:#f9f,stroke:#333,stroke-width:4px
    style B fill:#bbf,stroke:#f66,stroke-width:2px,color:#fff,stroke-dasharray: 5 5
    style C fill:#ff9,stroke:#333,stroke-width:2px
    style D fill:#bfb,stroke:#333,stroke-width:2px
    style E fill:#f99,stroke:#333,stroke-width:2px
    style F fill:#fff,stroke:#333,stroke-width:2px
    style G,H,I,J,K,L fill:#bff,stroke:#333,stroke-width:2px
    style M,N,O,P fill:#fbf,stroke:#333,stroke-width:2px
    style Q,R fill:#bbf,stroke:#333,stroke-width:2px
```



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