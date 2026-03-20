# EduApp - 开发规范

## 项目概述
AI苏格拉底式学习伙伴应用（方向探索中）。

## 技术栈
- 前端：React + TypeScript + Vite
- 跨平台：React Native (移动)
- AI：Claude API
- 可视化：D3.js / React Flow
- 数据库：Supabase
- 部署：GitHub Pages (PWA) → Vercel (生产)

## 开发规范
- 使用 TypeScript strict mode
- 组件使用函数式组件 + Hooks
- 状态管理：Zustand
- 样式：Tailwind CSS
- 测试：Vitest + React Testing Library
- 提交信息：Conventional Commits (中文描述)

## 目录结构
```
src/
  socratic/      # 苏格拉底对话引擎
  knowledge/     # 知识图谱
  progress/      # 学习进度
  ui/            # 界面组件
  utils/         # 工具函数
docs/            # 文档
public/          # 静态资源
```
