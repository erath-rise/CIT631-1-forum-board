# Forum Board
论坛留言板应用，支持消息发布、回复和实时更新。

## 功能特性

- 📝 消息发布和展示
- 💬 消息回复功能
- 🎨 现代化UI设计
- 📱 响应式布局
- 🔒 数据验证和安全处理
- ⚡ 高性能MongoDB数据库

## 技术栈

- **前端**: Next.js 14, React 18, Tailwind CSS
- **后端**: Next.js API Routes
- **数据库**: MongoDB
- **UI组件**: Radix UI, shadcn/ui
- **部署**: Vercel

## 本地开发

### 环境要求

- Node.js 18+
- pnpm (推荐) 或 npm
- MongoDB 数据库

### 安装依赖

```bash
pnpm install
```

### 环境变量配置

创建 `.env.local` 文件：

```env
MONGODB_URI=your_mongodb_connection_string
```

### 启动开发服务器

```bash
pnpm dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

## Vercel 部署

### 自动部署

1. 将代码推送到 GitHub 仓库
2. 在 [Vercel](https://vercel.com) 中导入项目
3. 配置环境变量：
   - `MONGODB_URI`: 你的 MongoDB 连接字符串
4. 点击部署

### 手动部署

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录 Vercel
vercel login

# 部署项目
vercel

# 生产环境部署
vercel --prod
```

### 环境变量配置

在 Vercel 项目设置中添加以下环境变量：

- `MONGODB_URI`: MongoDB 连接字符串
- `NEXT_PUBLIC_VERCEL_URL`: 自动设置（Vercel 提供）

### 部署优化

项目已配置以下优化：

- ✅ 函数超时时间设置为 30 秒
- ✅ 安全头部配置
- ✅ 图片优化
- ✅ 压缩和缓存
- ✅ MongoDB 连接池优化

## 项目结构

```
forum-board/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── api/            # API 路由
│   │   ├── components/     # 页面组件
│   │   └── page.js         # 主页面
│   └── lib/                # 工具库
│       ├── mongodb.js      # 数据库连接
│       └── utils/          # 工具函数
├── components/             # UI 组件
├── public/                 # 静态资源
└── vercel.json            # Vercel 配置
```

## API 接口

### 获取消息列表

```http
GET /api/messages
```

### 发布新消息

```http
POST /api/messages
Content-Type: application/json

{
  "title": "消息标题",
  "content": "消息内容",
  "author": {
    "name": "作者姓名",
    "email": "author@example.com"
  }
}
```

### 回复消息

```http
POST /api/messages/[id]/reply
Content-Type: application/json

{
  "content": "回复内容",
  "author": {
    "name": "回复者姓名",
    "email": "replier@example.com"
  }
}
```

