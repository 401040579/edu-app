# EduApp - 开发规范

## 项目概述
AI苏格拉底式学习伙伴应用。通过引导式提问帮助学生自主发现答案、构建思维能力。方向已确定。

## 产品核心理念
- 永远不直接给答案，通过苏格拉底式提问引导学生思考
- AI是学习伙伴而非老师
- 培养思考力而非记忆力
- 详见 docs/PRODUCT.md 和 docs/PEDAGOGY.md

## 技术栈
- 前端：React 19 + TypeScript 5.x + Vite 6
- 状态管理：Zustand
- 样式：Tailwind CSS 4
- 跨平台：React Native (Expo) (移动端)
- AI推理：Claude API (Anthropic)
- 图谱可视化：React Flow
- 思维地图：D3.js
- 数据库/Auth：Supabase (PostgreSQL + Auth + Realtime)
- 部署：Vercel
- 监控：Sentry + PostHog
- CI/CD：GitHub Actions
- 详见 docs/ARCHITECTURE.md

## 开发规范
- 使用 TypeScript strict mode
- 组件使用函数式组件 + Hooks
- 测试：Vitest + React Testing Library
- 提交信息：Conventional Commits (中文描述)
- 代码格式：Prettier + ESLint

## 目录结构
```
src/
  socratic/      # 苏格拉底对话引擎（状态机、Prompt编排、难度调节）
  knowledge/     # 知识图谱（概念节点、关系推理、可视化数据）
  progress/      # 学习进度追踪（评估、成就、报告）
  ui/            # 界面组件
  utils/         # 工具函数
docs/            # 项目文档
  PRODUCT.md          # 产品设计
  ARCHITECTURE.md     # 技术架构
  PEDAGOGY.md         # 教育学理论
  UX_DESIGN.md        # 用户体验设计
  GROWTH.md           # 增长策略
  RISKS.md            # 风险分析
  COMPETITORS.md      # 竞品分析
  DIRECTION_ANALYSIS.md  # 方向决策分析
  ROADMAP.md          # 开发路线图
public/          # 静态资源
```

## 关键设计决策
1. 苏格拉底对话引擎使用状态机模式（exploration → scaffolding → guided_discovery → consolidation → reflection）
2. 知识图谱使用 PostgreSQL JSONB（平衡性能和灵活性），未来可迁移 Neo4j
3. LLM调用使用分级策略：简单判断用 Haiku，深度对话用 Sonnet/Opus
4. 遗忘曲线基于 FSRS 算法
