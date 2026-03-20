# EduApp - 技术架构设计文档

> CTO/架构师视角 | v1.0

## 一、架构概览

```
┌─────────────────────────────────────────────────────────┐
│                     客户端层                              │
│  ┌──────────┐  ┌──────────────┐  ┌──────────────────┐   │
│  │ Web PWA  │  │ React Native │  │  教师管理后台     │   │
│  │(React+TS)│  │  (移动端)    │  │  (Web Dashboard)  │   │
│  └────┬─────┘  └──────┬───────┘  └────────┬─────────┘   │
└───────┼───────────────┼───────────────────┼─────────────┘
        │               │                   │
        ▼               ▼                   ▼
┌─────────────────────────────────────────────────────────┐
│                    API Gateway (Vercel Edge)              │
│              认证 · 限流 · 路由 · 缓存                    │
└────────────────────────┬────────────────────────────────┘
                         │
        ┌────────────────┼────────────────┐
        ▼                ▼                ▼
┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│  苏格拉底     │ │  知识图谱     │ │  学习追踪     │
│  对话引擎     │ │  服务         │ │  服务         │
│              │ │              │ │              │
│ · 对话管理   │ │ · 图谱构建   │ │ · 进度记录   │
│ · Prompt编排 │ │ · 关系推理   │ │ · 数据分析   │
│ · 思维评估   │ │ · 可视化数据 │ │ · 报告生成   │
│ · 难度调节   │ │ · 概念提取   │ │ · 成就系统   │
└──────┬───────┘ └──────┬───────┘ └──────┬───────┘
       │                │                │
       ▼                ▼                ▼
┌─────────────────────────────────────────────────────────┐
│                    数据层                                 │
│  ┌──────────┐  ┌──────────────┐  ┌──────────────────┐   │
│  │ Supabase │  │   Claude API  │  │   Redis Cache    │   │
│  │(PostgreSQL│  │  (LLM推理)   │  │  (会话缓存)      │   │
│  │ +Auth+   │  │              │  │                  │   │
│  │ Realtime)│  │              │  │                  │   │
│  └──────────┘  └──────────────┘  └──────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

---

## 二、核心模块设计

### 2.1 苏格拉底对话引擎（Socratic Dialogue Engine）

这是产品的核心技术壁垒。不是简单的ChatBot包装，而是一个有教育学理论支撑的对话编排系统。

#### 2.1.1 对话状态机

```typescript
// 对话阶段状态机
enum DialoguePhase {
  EXPLORATION = 'exploration',    // 探索阶段：理解学生的问题和已有知识
  SCAFFOLDING = 'scaffolding',    // 脚手架阶段：搭建思考框架
  GUIDED_DISCOVERY = 'guided_discovery',  // 引导发现：核心苏格拉底提问
  CONSOLIDATION = 'consolidation', // 巩固阶段：确认理解，建立联系
  REFLECTION = 'reflection',      // 反思阶段：元认知回顾
}

interface DialogueState {
  sessionId: string;
  phase: DialoguePhase;
  topic: string;
  subject: Subject;

  // 学生状态追踪
  studentModel: {
    priorKnowledge: Concept[];      // 已确认掌握的概念
    misconceptions: Concept[];       // 已识别的误解
    currentUnderstanding: number;    // 当前理解度 0-1
    frustrationLevel: number;       // 挫折感水平 0-1
    engagementLevel: number;        // 参与度 0-1
  };

  // 教学目标
  targetConcepts: Concept[];        // 本次对话目标概念
  discoveredConcepts: Concept[];    // 已发现的概念

  // 对话历史（精简版，用于prompt）
  conversationSummary: string;
  turnCount: number;
  hintLevel: number;               // 当前提示级别 0-3
}
```

#### 2.1.2 Prompt编排架构

```typescript
// 分层Prompt系统
interface PromptLayer {
  // L1: 系统人格层（不变）
  systemPersona: string;

  // L2: 教学策略层（按阶段变化）
  pedagogyStrategy: string;

  // L3: 学生模型层（动态更新）
  studentContext: string;

  // L4: 对话上下文层（每轮更新）
  conversationContext: string;

  // L5: 安全护栏层（始终生效）
  safetyGuardrails: string;
}

// Prompt模板示例
const SOCRATIC_SYSTEM_PROMPT = `
你是一位苏格拉底式的学习伙伴。你的核心原则：

1. **永远不直接给出答案**。通过提问引导学生自己发现。
2. **从学生已知出发**。先了解他们知道什么，再搭建桥梁。
3. **一次只问一个问题**。不要连续提多个问题让学生困惑。
4. **用类比和生活经验**。将抽象概念与学生的日常经验连接。
5. **监测情绪状态**。如果学生表现出沮丧，降低难度或给予鼓励。
6. **庆祝发现时刻**。当学生自己想通时，真诚地表达赞赏。

你不是老师，而是一起探索的同伴。用"我们来想想..."而非"你应该知道..."的语气。
`;
```

#### 2.1.3 自适应难度算法

```typescript
interface DifficultyController {
  // 输入信号
  signals: {
    responseLatency: number;        // 回复速度（太快可能是猜的）
    responseLength: number;         // 回复长度（太短可能卡住了）
    correctnessRate: number;        // 近5轮的正确推理比例
    hintUsage: number;              // 提示使用次数
    emotionalCues: string[];        // 情绪关键词检测
    sessionDuration: number;        // 会话时长
  };

  // 输出动作
  actions: {
    adjustQuestionComplexity: (delta: number) => void;  // -2 到 +2
    switchToAnalogy: () => void;                         // 切换到类比模式
    provideScaffold: (level: number) => void;            // 提供脚手架
    offerBreak: () => void;                              // 建议休息
    celebrateDiscovery: () => void;                      // 庆祝发现
  };
}

// 难度调整规则
const DIFFICULTY_RULES = [
  {
    condition: 'frustrationLevel > 0.7 && hintUsage >= 2',
    action: 'switchToAnalogy + adjustQuestionComplexity(-2)',
    reason: '学生明显受挫，需要降低难度并换一种方式引导'
  },
  {
    condition: 'correctnessRate > 0.8 && responseLatency < 5s',
    action: 'adjustQuestionComplexity(+1)',
    reason: '学生掌握良好，可以增加挑战'
  },
  {
    condition: 'sessionDuration > 20min && engagementLevel < 0.4',
    action: 'offerBreak',
    reason: '学习时间较长且参与度下降，建议休息'
  },
  {
    condition: 'discoveredConcepts.includes(targetConcept)',
    action: 'celebrateDiscovery + enterConsolidation',
    reason: '学生成功发现目标概念，进入巩固阶段'
  }
];
```

#### 2.1.4 思维评估模型

```typescript
// 评估学生在对话中的思维表现
interface ThinkingAssessment {
  // 思维深度指标
  depth: {
    surfaceRecall: number;          // 表面记忆 (0-1)
    proceduralUnderstanding: number; // 程序理解 (0-1)
    conceptualUnderstanding: number; // 概念理解 (0-1)
    transferAbility: number;         // 迁移能力 (0-1)
  };

  // 思维品质指标
  quality: {
    logicalCoherence: number;       // 逻辑连贯性
    creativeLinkage: number;        // 创造性联想
    selfCorrection: number;         // 自我纠正能力
    questionAsking: number;         // 主动提问能力
  };

  // 元认知指标
  metacognition: {
    awarenessOfKnowledge: number;   // 知道自己知道/不知道什么
    strategySelection: number;      // 策略选择能力
    monitoringAccuracy: number;     // 自我监控准确性
  };
}
```

### 2.2 知识图谱数据结构

#### 2.2.1 图谱模型

```typescript
// 知识图谱核心数据结构
interface KnowledgeGraph {
  nodes: ConceptNode[];
  edges: ConceptRelation[];
}

interface ConceptNode {
  id: string;
  name: string;
  subject: Subject;

  // 概念元数据
  abstractionLevel: 'concrete' | 'abstract' | 'meta';
  prerequisiteOf: string[];        // 是哪些概念的前置条件

  // 学生个人数据
  masteryLevel: number;            // 掌握度 0-1
  discoveryDate: Date | null;      // 首次自主发现时间
  lastReviewDate: Date | null;     // 最近复习时间
  forgettingCurve: ForgettingCurve; // 个人遗忘曲线参数

  // 来源追踪
  dialogueSessionIds: string[];    // 相关对话ID
}

interface ConceptRelation {
  source: string;                  // 源概念ID
  target: string;                  // 目标概念ID
  type: RelationType;
  strength: number;                // 关联强度 0-1
  discoveredByStudent: boolean;    // 是否由学生自主发现的关联
}

enum RelationType {
  PREREQUISITE = 'prerequisite',   // A是B的前置知识
  ANALOGY = 'analogy',             // A和B是类比关系
  CAUSE_EFFECT = 'cause_effect',   // A导致B
  PART_WHOLE = 'part_whole',       // A是B的组成部分
  CONTRAST = 'contrast',           // A和B形成对比
  APPLICATION = 'application',     // A在B中有应用
}
```

#### 2.2.2 图谱构建流程

```
对话进行 → 概念提取(LLM) → 关系推理 → 图谱更新 → 可视化渲染

1. 实时概念提取：对话中每轮结束后，用LLM提取新出现的概念
2. 关系推理：基于教育学知识和对话上下文推断概念间关系
3. 掌握度评估：根据学生的表现评估每个概念的掌握程度
4. 遗忘曲线：基于FSRS算法预测复习时机
5. 可视化：使用React Flow渲染交互式知识图谱
```

### 2.3 学习进度追踪系统

#### 2.3.1 数据模型

```typescript
interface LearningProfile {
  userId: string;

  // 学习偏好（自动检测+手动调整）
  preferences: {
    preferredLearningStyle: 'visual' | 'verbal' | 'kinesthetic';
    bestTimeOfDay: string;
    averageSessionDuration: number;
    subjectInterests: Subject[];
  };

  // 累计数据
  stats: {
    totalDialogues: number;
    totalConceptsDiscovered: number;
    averageThinkingDepth: number;
    streakDays: number;
    totalLearningMinutes: number;
  };

  // 成就
  achievements: Achievement[];

  // 知识图谱快照
  knowledgeGraphId: string;
}

// 学习会话记录
interface LearningSession {
  id: string;
  userId: string;
  startTime: Date;
  endTime: Date;

  subject: Subject;
  topic: string;

  // 对话数据
  turnCount: number;
  hintsUsed: number;
  conceptsDiscovered: string[];

  // 评估数据
  thinkingAssessment: ThinkingAssessment;
  difficultyProgression: number[];

  // 生成产物
  mindMapId: string;              // 思维地图ID

  // 用户反馈
  userRating: number | null;
  userFeedback: string | null;
}
```

#### 2.3.2 数据库Schema（Supabase/PostgreSQL）

```sql
-- 用户表
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE,
  display_name TEXT,
  role TEXT CHECK (role IN ('student', 'parent', 'teacher')),
  preferences JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 学习会话表
CREATE TABLE learning_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  subject TEXT NOT NULL,
  topic TEXT NOT NULL,
  start_time TIMESTAMPTZ DEFAULT NOW(),
  end_time TIMESTAMPTZ,
  turn_count INT DEFAULT 0,
  hints_used INT DEFAULT 0,
  thinking_assessment JSONB,
  mind_map_data JSONB,
  status TEXT CHECK (status IN ('active', 'completed', 'abandoned')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 概念节点表
CREATE TABLE concept_nodes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  name TEXT NOT NULL,
  subject TEXT NOT NULL,
  mastery_level FLOAT DEFAULT 0,
  discovery_date TIMESTAMPTZ,
  last_review_date TIMESTAMPTZ,
  fsrs_params JSONB,  -- FSRS遗忘曲线参数
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, name, subject)
);

-- 概念关系表
CREATE TABLE concept_relations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  source_concept_id UUID REFERENCES concept_nodes(id),
  target_concept_id UUID REFERENCES concept_nodes(id),
  relation_type TEXT NOT NULL,
  strength FLOAT DEFAULT 0.5,
  discovered_by_student BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 对话消息表
CREATE TABLE dialogue_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES learning_sessions(id),
  role TEXT CHECK (role IN ('user', 'assistant', 'system')),
  content TEXT NOT NULL,
  metadata JSONB,  -- 包含概念提取结果、情绪检测等
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 成就表
CREATE TABLE achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  type TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  earned_at TIMESTAMPTZ DEFAULT NOW()
);

-- 家长-孩子关联表
CREATE TABLE parent_child (
  parent_id UUID REFERENCES users(id),
  child_id UUID REFERENCES users(id),
  PRIMARY KEY (parent_id, child_id)
);

-- RLS策略：学生只能看自己的数据，家长能看孩子的统计（不含对话内容）
ALTER TABLE learning_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE concept_nodes ENABLE ROW LEVEL SECURITY;
ALTER TABLE dialogue_messages ENABLE ROW LEVEL SECURITY;
```

---

## 三、技术栈确认

| 层 | 技术选型 | 理由 |
|----|---------|------|
| 前端框架 | React 19 + TypeScript 5.x | 生态成熟，团队熟悉 |
| 构建工具 | Vite 6 | 极快的开发体验 |
| 状态管理 | Zustand | 轻量、TypeScript友好 |
| 样式 | Tailwind CSS 4 | 快速迭代UI |
| 图谱可视化 | React Flow | 交互式知识图谱渲染 |
| 思维地图 | D3.js | 自定义思维发现地图 |
| 移动端 | React Native (Expo) | 与Web共享业务逻辑 |
| PWA | Workbox | Service Worker管理 |
| 后端 | Supabase (BaaS) | Auth + DB + Realtime，快速上线 |
| AI推理 | Claude API (Anthropic) | 苏格拉底对话质量最佳 |
| 缓存 | Supabase Edge + Vercel KV | 会话状态缓存 |
| 部署 | Vercel | 零配置部署、Edge Functions |
| 监控 | Sentry + PostHog | 错误追踪 + 产品分析 |
| CI/CD | GitHub Actions | 自动测试和部署 |

---

## 四、API设计

### 4.1 核心API端点

```typescript
// 对话相关
POST   /api/dialogue/start        // 开始新对话
POST   /api/dialogue/message      // 发送消息（流式返回）
POST   /api/dialogue/hint         // 请求提示
POST   /api/dialogue/end          // 结束对话，生成思维地图
GET    /api/dialogue/:id          // 获取对话详情

// 知识图谱
GET    /api/graph                  // 获取用户知识图谱
GET    /api/graph/recommendations  // 获取推荐学习主题

// 学习追踪
GET    /api/progress/dashboard     // 学习仪表盘数据
GET    /api/progress/report        // 学习报告（周/月）
GET    /api/progress/achievements  // 成就列表

// 用户管理
POST   /api/auth/signup
POST   /api/auth/login
GET    /api/user/profile
PUT    /api/user/preferences
```

### 4.2 流式对话交互

```typescript
// 前端调用示例
async function sendMessage(sessionId: string, message: string) {
  const response = await fetch('/api/dialogue/message', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sessionId, message }),
  });

  // 流式读取AI回复
  const reader = response.body?.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { done, value } = await reader!.read();
    if (done) break;

    const chunk = decoder.decode(value);
    const events = chunk.split('\n\n').filter(Boolean);

    for (const event of events) {
      const data = JSON.parse(event.replace('data: ', ''));

      switch (data.type) {
        case 'text':
          // 渲染AI文本
          appendToChat(data.content);
          break;
        case 'concept_discovered':
          // 更新知识图谱
          addConceptToGraph(data.concept);
          break;
        case 'phase_change':
          // 对话阶段变化
          updatePhaseIndicator(data.phase);
          break;
        case 'thinking_assessment':
          // 思维评估更新
          updateAssessment(data.assessment);
          break;
      }
    }
  }
}
```

---

## 五、性能与成本考量

### 5.1 LLM调用成本控制

| 策略 | 说明 |
|------|------|
| Prompt缓存 | 系统prompt使用Claude缓存，减少重复token费用 |
| 上下文压缩 | 超过10轮后，用摘要替代早期对话历史 |
| 分级模型 | 简单判断用Haiku，深度对话用Sonnet/Opus |
| 概念提取批处理 | 每3轮批量提取概念，而非每轮调用 |

### 5.2 预估月度成本（1000 DAU时）

```
Claude API:  ~$800/月 (假设每用户每天2次对话，每次15轮)
Supabase:    ~$25/月  (Pro plan)
Vercel:      ~$20/月  (Pro plan)
Sentry:      ~$26/月  (Team plan)
PostHog:     ~$0/月   (免费额度内)
-----------------------------------------
总计:        ~$871/月
每用户成本:  ~$0.87/月
```

### 5.3 扩展性设计

- Supabase Edge Functions处理无状态请求
- 对话状态存储在Redis/Vercel KV，支持快速恢复
- 知识图谱数据使用PostgreSQL JSONB，平衡查询性能和灵活性
- 未来可迁移至专用图数据库（Neo4j）处理复杂图查询

---

## 六、安全与隐私

### 6.1 数据安全
- 所有对话内容端到端加密存储
- 符合COPPA（儿童在线隐私保护法）和GDPR要求
- 未成年用户数据不用于模型训练
- 家长可查看学习统计但不可查看具体对话内容

### 6.2 AI安全
- 内容安全过滤：防止不当内容
- 学科范围限制：AI只讨论学习相关话题
- 对话长度限制：防止过度使用
- 定期审计AI回复质量

### 6.3 认证与授权
- Supabase Auth（邮箱+手机号+OAuth）
- Row Level Security (RLS) 确保数据隔离
- 家长-孩子账号关联机制
- 教师端API权限独立管理

---

## 七、MVP技术实施计划

### 第1周：基础搭建
- [ ] Vite + React + TypeScript项目初始化
- [ ] Supabase项目创建、数据库Schema迁移
- [ ] Claude API集成、基础对话功能
- [ ] Tailwind CSS + 基础UI组件库

### 第2周：核心对话引擎
- [ ] 苏格拉底Prompt系统实现
- [ ] 对话状态机
- [ ] 流式响应渲染
- [ ] 基础难度调整逻辑

### 第3周：可视化与追踪
- [ ] React Flow知识图谱渲染
- [ ] 思维发现地图（D3.js）
- [ ] 学习进度仪表盘
- [ ] 基础成就系统

### 第4周：上线准备
- [ ] Landing Page
- [ ] PWA配置（Service Worker + manifest）
- [ ] 部署到Vercel
- [ ] 基础监控和错误追踪
- [ ] 内测邀请机制

---

*本文档随技术演进持续更新。重大架构变更需要团队评审。*
