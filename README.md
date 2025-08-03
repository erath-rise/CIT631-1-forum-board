# 论坛留言板项目

基于 Next.js App Router + MongoDB + Vercel 构建的简化版论坛留言板系统。

## 功能特性

- ✅ 发布新消息
- ✅ 查看消息列表
- ✅ 删除自己的消息
- ✅ 对消息进行回复
- ✅ 查看回复列表
- ✅ 响应式设计
- ✅ 数据验证和安全防护

## 技术栈

- **前端**: Next.js 14 (App Router), React 18, Tailwind CSS
- **后端**: Next.js API Routes
- **数据库**: MongoDB
- **部署**: Vercel
- **样式**: Tailwind CSS

## 快速开始

### 1. 克隆项目

\`\`\`bash
git clone <your-repo-url>
cd forum-board
\`\`\`

### 2. 安装依赖

\`\`\`bash
npm install
\`\`\`

### 3. 环境配置

复制 \`.env.local.example\` 为 \`.env.local\` 并填入您的 MongoDB 连接字符串：

\`\`\`bash
cp .env.local.example .env.local
\`\`\`

编辑 \`.env.local\`：

\`\`\`env
MONGODB_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/forumdb
\`\`\`

### 4. 启动开发服务器

\`\`\`bash
npm run dev
\`\`\`

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

## 项目结构

\`\`\`
forum-board/
├── src/
│   ├── app/
│   │   ├── api/messages/          # API 路由
│   │   ├── components/            # React 组件
│   │   ├── globals.css           # 全局样式
│   │   ├── layout.js             # 根布局
│   │   └── page.js               # 首页
│   └── lib/
│       ├── mongodb.js            # 数据库连接
│       └── utils/                # 工具函数
├── public/                       # 静态资源
├── .env.local                   # 环境变量
├── next.config.js               # Next.js 配置
├── tailwind.config.js           # Tailwind 配置
└── vercel.json                  # Vercel 部署配置
\`\`\`

## API 接口

### 消息相关

- \`GET /api/messages\` - 获取所有消息
- \`POST /api/messages\` - 发布新消息
- \`GET /api/messages/[id]\` - 获取特定消息
- \`DELETE /api/messages/[id]\` - 删除消息

### 回复相关

- \`POST /api/messages/[id]/reply\` - 添加回复

## 数据库设计

### Messages Collection

\`\`\`javascript
{
  _id: ObjectId,
  title: String,        // 消息标题
  content: String,      // 消息内容
  author: {
    name: String,       // 作者姓名
    email: String       // 作者邮箱
  },
  replies: [{           // 回复数组
    _id: ObjectId,
    content: String,
    author: {
      name: String,
      email: String
    },
    createdAt: Date
  }],
  createdAt: Date,
  updatedAt: Date
}
\`\`\`

## 部署到 Vercel

### 1. 连接 GitHub

将项目推送到 GitHub 仓库。

### 2. 导入到 Vercel

1. 访问 [Vercel Dashboard](https://vercel.com/dashboard)
2. 点击 "New Project"
3. 选择您的 GitHub 仓库
4. 配置环境变量

### 3. 环境变量配置

在 Vercel 项目设置中添加：

- \`MONGODB_URI\`: 您的 MongoDB 连接字符串

### 4. 部署

Vercel 会自动构建和部署您的应用。

## 开发指南

### 添加新功能

1. **API 路由**: 在 \`src/app/api/\` 目录下创建新的路由文件
2. **组件**: 在 \`src/app/components/\` 目录下创建新组件
3. **工具函数**: 在 \`src/lib/utils/\` 目录下添加工具函数

### 样式指南

项目使用 Tailwind CSS，遵循以下约定：

- 使用语义化的类名组合
- 优先使用 Tailwind 的设计系统
- 自定义样式放在 \`globals.css\` 中

### 代码规范

- 使用 ESLint 进行代码检查
- 组件使用 PascalCase 命名
- 文件使用 kebab-case 命名
- API 路由使用 RESTful 设计

## 性能优化

- ✅ 使用 Next.js App Router 的服务端组件
- ✅ 图片优化 (Next.js Image 组件)
- ✅ 代码分割和懒加载
- ✅ MongoDB 连接池复用
- ✅ 响应式设计

## 安全考虑

- ✅ 输入数据验证和清理
- ✅ XSS 防护
- ✅ 安全头部配置
- ✅ 环境变量保护
- ✅ HTTPS 强制 (生产环境)

**Happy Coding! 🚀**
\`\`\`
