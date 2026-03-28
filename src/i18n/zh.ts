import type { Translations } from './en';

const zh: Translations = {
  // ─── Common ─────────────────────────────────────────
  common: {
    appName: 'EduApp',
    brandName: '思伴',
    tagline: 'AI苏格拉底式学习伙伴',
    slogan: '不给答案，给你思考的超能力',
    back: '返回',
    share: '分享',
    viewAll: '查看全部',
    startChallenge: '开始挑战',
    continueExplore: '继续探索',
    progress: '进度',
    all: '全部',
  },

  // ─── Navigation ─────────────────────────────────────
  nav: {
    home: '首页',
    explore: '探索',
    graph: '图谱',
    data: '数据',
    achievements: '成就',
    socraticDialogue: '苏格拉底对话',
    mindDiscoveryMap: '思维发现地图',
  },

  // ─── Landing Page ───────────────────────────────────
  landing: {
    badge: 'AI苏格拉底式学习伙伴',
    heroTitle: '思伴',
    heroSubtitle: 'EduApp',
    heroHeadline: '不给答案，给你思考的超能力',
    heroDescription:
      '在AI时代，最珍贵的能力不是获取答案，而是提出好问题。\n思伴通过苏格拉底式对话，引导你自己发现答案、构建真正的思维能力。',
    ctaButton: '开始思考之旅',

    // Core features
    featureSocratic: '苏格拉底对话',
    featureSocraticDesc: '永远不直接给答案，通过提问引导你自己发现真理',
    featureMindMap: '思维发现地图',
    featureMindMapDesc: '可视化你的思考路径，看见自己的思维成长',
    featureKnowledgeGraph: '知识图谱',
    featureKnowledgeGraphDesc: '探索过的知识形成网络，看见自己的知识宇宙',

    // Demo conversation
    demoTitle: '体验苏格拉底式对话',
    demoSubtitle: '看看思伴如何引导学生自己发现万有引力的奥秘',
    demoCtaLink: '亲自体验完整对话',

    // Comparison table
    comparisonTitle: '与传统AI教育的区别',
    comparisonSubtitle: '大多数AI教育产品帮你获取答案，思伴帮你学会思考',
    comparisonTraditional: '传统AI教育',
    comparisonEduApp: '思伴 EduApp',
    comparisonFeatures: [
      {
        feature: '当学生问问题时',
        traditional: '直接给出答案',
        eduapp: '用提问引导自己发现',
      },
      {
        feature: '学习过程',
        traditional: '被动接受信息',
        eduapp: '主动探索建构知识',
      },
      {
        feature: '思维能力',
        traditional: '记住答案',
        eduapp: '学会如何思考',
      },
      {
        feature: '学习记录',
        traditional: '做题数量/正确率',
        eduapp: '思维地图/知识图谱',
      },
      {
        feature: '学习动力',
        traditional: '分数和排名',
        eduapp: '发现的喜悦和成长可见',
      },
    ],

    // Pricing
    pricingTitle: '选择你的思考之旅',
    pricingSubtitle: '从免费开始，随时升级解锁更多功能',
    mostPopular: '最受欢迎',
    freeExperience: '免费体验',
    startTrial: '开始试用',
    plans: [
      {
        name: '免费版',
        price: '¥0',
        period: '',
        features: [
          '每天3次对话',
          '基础学科（数学、物理、化学）',
          '基础思维地图',
        ],
      },
      {
        name: '探索者',
        price: '¥29',
        period: '/月',
        features: [
          '无限对话',
          '所有学科',
          '完整知识图谱',
          '学习数据分析',
          'AI伙伴人格选择',
        ],
      },
      {
        name: '家庭版',
        price: '¥49',
        period: '/月',
        features: [
          '最多3个孩子账号',
          '家长学习报告',
          '亲子共同探索模式',
          '所有探索者功能',
        ],
      },
    ],

    // CTA
    ctaTitle_1: '准备好开始你的',
    ctaTitle_highlight: ' 思考之旅 ',
    ctaTitle_2: '了吗？',
    ctaDescription:
      '2400年前，苏格拉底用提问改变了世界。今天，让AI伙伴用同样的方式改变你的学习。',
    ctaButtonBottom: '开始思考之旅',

    // Footer
    footerLine1: '思伴 EduApp -- AI苏格拉底式学习伙伴',
    footerLine2: '不给答案，给你思考的超能力',
  },

  // ─── Explore Page ───────────────────────────────────
  explore: {
    title: '探索新知',
    subtitle: '选择一个学科，或输入你自己的问题',
    searchPlaceholder: '今天想探索什么？',
    selectSubject: '选择学科',
    recommendedTopics: '推荐话题',
    fullDialogueAvailable: '可体验完整对话',
    hotExplore: '热门探索',
    generalSubject: '综合',
  },

  // ─── Subjects ───────────────────────────────────────
  subjects: {
    math: '数学',
    physics: '物理',
    chemistry: '化学',
    biology: '生物',
    history: '历史',
    geography: '地理',
  },

  // ─── Topics (by id) ────────────────────────────────
  topics: {
    // Math
    'math-t-1': '为什么0.999...等于1？',
    'math-t-2': '负数相乘为什么得正数？',
    'math-t-3': '勾股定理是怎么来的？',
    'math-t-4': '概率为什么反直觉？',
    'math-t-5': '为什么不能除以零？',
    // Physics
    'physics-t-1': '为什么月亮不会掉下来？',
    'physics-t-2': '为什么天是蓝色的？',
    'physics-t-3': '为什么冰会浮在水面上？',
    'physics-t-4': '为什么飞机能飞起来？',
    'physics-t-5': '光是波还是粒子？',
    // Chemistry
    'chemistry-t-1': '为什么铁会生锈？',
    'chemistry-t-2': '水为什么能灭火？',
    'chemistry-t-3': '化学反应为什么有快有慢？',
    // Biology
    'biology-t-1': '为什么我们会做梦？',
    'biology-t-2': 'DNA如何决定我们的样子？',
    'biology-t-3': '为什么要睡觉？',
    'biology-t-4': '细胞如何"知道"该做什么？',
    // History
    'history-t-1': '为什么罗马帝国会衰落？',
    'history-t-2': '丝绸之路改变了什么？',
    'history-t-3': '文艺复兴为什么发生在意大利？',
    'history-t-4': '工业革命为什么发生在英国？',
    'history-t-5': '印刷术如何改变世界？',
    // Geography
    'geography-t-1': '为什么会有四季？',
    'geography-t-2': '沙漠是怎么形成的？',
    'geography-t-3': '为什么地球板块会移动？',
  },

  // ─── Hot topics (by id) ─────────────────────────────
  hotTopics: {
    'physics-moon': '为什么月亮不会掉下来？',
    'math-infinity': '为什么0.999...等于1？',
    'history-rome': '为什么罗马帝国会衰落？',
    'physics-blue-sky': '为什么天是蓝色的？',
    'bio-dna': 'DNA如何决定我们的样子？',
    'chem-rust': '为什么铁会生锈？',
    'math-probability': '概率为什么反直觉？',
    'history-printing': '印刷术如何改变世界？',
    'physics-airplane': '为什么飞机能飞起来？',
    'bio-dreams': '为什么我们会做梦？',
    'geo-seasons': '为什么会有四季？',
    'chem-water-fire': '水为什么能灭火？',
  },

  // ─── Dialogue Page ──────────────────────────────────
  dialogue: {
    phases: {
      exploration: '探索',
      scaffolding: '搭建',
      guided_discovery: '发现',
      consolidation: '巩固',
      reflection: '反思',
    },
    discoveredConcepts: '已发现 {count} 个概念',
    discoveredConceptsOf: '已发现 {count}/{total} 个概念',
    aiMode: 'AI模式',
    switchToAiMode: '切换到真实AI模式',
    aiLabel: '思伴 AI',
    scriptLabel: '思伴',
    discovered: '发现:',
    hintLabel: '提示',
    hintLabelN: '提示 {level}/3',
    giveHint: '给我一点提示',
    moreHint: '再给一点提示',
    lastHint: '最后提示',
    inputPlaceholder: '输入你的想法...',
    aiThinking: '思伴正在思考...',
    endSession: '结束本次对话',
    dialogueComplete: '对话结束！你发现了 {count} 个概念',
    viewMindMap: '查看思维发现地图',
    aiError: '无法连接到AI服务，请检查网络连接',
    freeExplore: '自由探索',
  },

  // ─── Mind Map Page ──────────────────────────────────
  mindmap: {
    title: '思维发现地图',
    yourDiscovery: '你发现的',
    aiGuided: 'AI引导的',
    shareTitle: '我的思维地图 - {title}',
    shareText: '我通过苏格拉底式对话，自己发现了{count}个概念！',
    shareCopied: '思维地图链接已复制到剪贴板！',
    notFound: '未找到对应的对话记录',
  },

  // ─── Knowledge Graph Page ───────────────────────────
  knowledgeGraph: {
    title: '我的知识宇宙',
    stats: '已探索 {concepts} 个概念 | 平均掌握度 {mastery}%',
    legendSize: '节点大小 = 掌握深度',
    legendCross: '跨学科连接',
  },

  // ─── Dashboard Page ─────────────────────────────────
  dashboard: {
    title: '学习仪表盘',
    subtitle: '你的思维成长一目了然',
    stats: {
      totalTopics: '探索主题',
      totalDialogues: '对话轮次',
      totalConcepts: '发现概念',
      thinkingDepth: '思维深度',
      streakDays: '连续天数',
      totalMinutes: '学习时长',
    },
    suffixDays: '天',
    suffixHours: '小时',
    depthTrend: '思维深度趋势',
    achievementBadges: '成就徽章',
    dailyChallenge: '每日思维挑战',
    dailyChallengeDesc:
      '今天的挑战：为什么音乐能影响情绪？（涉及物理 + 生物 + 心理学）',
    days: {
      mon: '周一',
      tue: '周二',
      wed: '周三',
      thu: '周四',
      fri: '周五',
      sat: '周六',
      sun: '周日',
    },
  },

  // ─── Achievements Page ──────────────────────────────
  achievements: {
    title: '成就系统',
    earned: '已获得 {earned}/{total} 个成就',
    overallProgress: '总进度',
    categories: {
      thinking: '思维品质',
      exploration: '探索精神',
      milestone: '里程碑',
    },
    earnedOn: '获得于 {date}',
    items: {
      'deep-thinker': {
        name: '深度思考者',
        description: '一次对话中独立推导出3个以上概念',
        condition: '一次对话中独立推导出3+个概念',
      },
      'curious-explorer': {
        name: '好奇探索家',
        description: '探索5个不同学科',
        condition: '探索5个不同学科',
      },
      'streak-thinker': {
        name: '连续思考家',
        description: '连续7天进行学习对话',
        condition: '连续7天进行学习对话',
      },
      'first-discovery': {
        name: '第一次发现',
        description: '完成第一次概念发现',
        condition: '完成第一次概念发现',
      },
      'self-corrector': {
        name: '自我纠正者',
        description: '主动发现并纠正自己的错误推理',
        condition: '主动发现并纠正自己的5次错误推理',
      },
      questioner: {
        name: '提问者',
        description: '向AI提出10个高质量问题',
        condition: '向AI提出10个高质量问题',
      },
      'knowledge-pioneer': {
        name: '知识拓荒者',
        description: '知识图谱达到100个概念节点',
        condition: '知识图谱达到100个概念节点',
      },
      'night-philosopher': {
        name: '午夜哲学家',
        description: '在晚上10点后完成一次深度对话',
        condition: '在晚上10点后完成一次深度对话',
      },
      'analogy-master': {
        name: '联想大师',
        description: '主动建立2个不同学科概念的联系',
        condition: '主动建立2个不同学科概念的联系',
      },
      'knowledge-network': {
        name: '知识网络',
        description: '知识图谱首次出现跨学科连接',
        condition: '知识图谱首次出现跨学科连接',
      },
      metamorphosis: {
        name: '思维蜕变',
        description: '认知层次首次达到"评估"或"创造"',
        condition: '布鲁姆认知层次首次达到"评估"或"创造"',
      },
    },
  },

  // ─── AhaEffect ──────────────────────────────────────
  aha: {
    conceptDiscovered: '概念发现!',
  },
};

export default zh;
