#!/bin/bash

# Forum Board Vercel 部署脚本
# 使用方法: ./scripts/deploy.sh

set -e

echo "🚀 开始部署 Forum Board 到 Vercel..."

# 检查是否安装了 Vercel CLI
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI 未安装，正在安装..."
    npm install -g vercel
fi

# 检查是否已登录
if ! vercel whoami &> /dev/null; then
    echo "🔐 请先登录 Vercel..."
    vercel login
fi

# 构建项目
echo "📦 构建项目..."
pnpm build

# 检查构建是否成功
if [ $? -eq 0 ]; then
    echo "✅ 构建成功"
else
    echo "❌ 构建失败"
    exit 1
fi

# 部署到 Vercel
echo "🌐 部署到 Vercel..."
vercel --prod

echo "🎉 部署完成！"
echo "📋 请检查以下项目："
echo "   1. 环境变量 MONGODB_URI 是否已设置"
echo "   2. 网站功能是否正常"
echo "   3. API 接口是否响应"
echo "   4. 数据库连接是否稳定" 