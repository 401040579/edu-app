export const dashboardStats = {
  totalTopics: 12,
  totalDialogues: 28,
  totalConcepts: 47,
  thinkingDepth: 7.8,
  streakDays: 5,
  totalMinutes: 420,
};

export const depthTrend = [
  { day: '周一', score: 6.2 },
  { day: '周二', score: 7.1 },
  { day: '周三', score: 6.8 },
  { day: '周四', score: 7.5 },
  { day: '周五', score: 8.2 },
  { day: '周六', score: 7.8 },
  { day: '周日', score: 8.5 },
];

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'thinking' | 'exploration' | 'milestone';
  earned: boolean;
  earnedDate?: string;
  progress?: number;
  maxProgress?: number;
  condition: string;
}

export const achievements: Achievement[] = [
  {
    id: 'deep-thinker',
    name: '深度思考者',
    description: '一次对话中独立推导出3个以上概念',
    icon: 'Brain',
    category: 'thinking',
    earned: true,
    earnedDate: '2026-03-18',
    condition: '一次对话中独立推导出3+个概念',
  },
  {
    id: 'curious-explorer',
    name: '好奇探索家',
    description: '探索5个不同学科',
    icon: 'Compass',
    category: 'exploration',
    earned: true,
    earnedDate: '2026-03-15',
    condition: '探索5个不同学科',
  },
  {
    id: 'streak-thinker',
    name: '连续思考家',
    description: '连续7天进行学习对话',
    icon: 'Flame',
    category: 'exploration',
    earned: false,
    progress: 5,
    maxProgress: 7,
    condition: '连续7天进行学习对话',
  },
  {
    id: 'first-discovery',
    name: '第一次发现',
    description: '完成第一次概念发现',
    icon: 'Sprout',
    category: 'milestone',
    earned: true,
    earnedDate: '2026-03-10',
    condition: '完成第一次概念发现',
  },
  {
    id: 'self-corrector',
    name: '自我纠正者',
    description: '主动发现并纠正自己的错误推理',
    icon: 'RefreshCw',
    category: 'thinking',
    earned: false,
    progress: 3,
    maxProgress: 5,
    condition: '主动发现并纠正自己的5次错误推理',
  },
  {
    id: 'questioner',
    name: '提问者',
    description: '向AI提出10个高质量问题',
    icon: 'HelpCircle',
    category: 'thinking',
    earned: false,
    progress: 7,
    maxProgress: 10,
    condition: '向AI提出10个高质量问题',
  },
  {
    id: 'knowledge-pioneer',
    name: '知识拓荒者',
    description: '知识图谱达到100个概念节点',
    icon: 'Globe',
    category: 'milestone',
    earned: false,
    progress: 47,
    maxProgress: 100,
    condition: '知识图谱达到100个概念节点',
  },
  {
    id: 'night-philosopher',
    name: '午夜哲学家',
    description: '在晚上10点后完成一次深度对话',
    icon: 'Moon',
    category: 'exploration',
    earned: true,
    earnedDate: '2026-03-12',
    condition: '在晚上10点后完成一次深度对话',
  },
  {
    id: 'analogy-master',
    name: '联想大师',
    description: '主动建立2个不同学科概念的联系',
    icon: 'Link',
    category: 'thinking',
    earned: false,
    progress: 1,
    maxProgress: 2,
    condition: '主动建立2个不同学科概念的联系',
  },
  {
    id: 'knowledge-network',
    name: '知识网络',
    description: '知识图谱首次出现跨学科连接',
    icon: 'Network',
    category: 'milestone',
    earned: true,
    earnedDate: '2026-03-16',
    condition: '知识图谱首次出现跨学科连接',
  },
  {
    id: 'metamorphosis',
    name: '思维蜕变',
    description: '认知层次首次达到"评估"或"创造"',
    icon: 'Butterfly',
    category: 'milestone',
    earned: false,
    progress: 0,
    maxProgress: 1,
    condition: '布鲁姆认知层次首次达到"评估"或"创造"',
  },
];

export const knowledgeGraphNodes = [
  // Physics
  { id: 'kg-1', label: '力学', subject: 'physics', mastery: 0.8, x: 300, y: 200 },
  { id: 'kg-2', label: '速度', subject: 'physics', mastery: 0.9, x: 200, y: 300 },
  { id: 'kg-3', label: '加速度', subject: 'physics', mastery: 0.7, x: 350, y: 320 },
  { id: 'kg-4', label: '力', subject: 'physics', mastery: 0.85, x: 450, y: 280 },
  { id: 'kg-5', label: '向心力', subject: 'physics', mastery: 0.75, x: 500, y: 380 },
  { id: 'kg-6', label: '万有引力', subject: 'physics', mastery: 0.7, x: 380, y: 420 },
  { id: 'kg-7', label: '牛顿第二定律', subject: 'physics', mastery: 0.65, x: 300, y: 400 },
  { id: 'kg-8', label: '轨道运动', subject: 'physics', mastery: 0.6, x: 480, y: 460 },
  { id: 'kg-9', label: '光学', subject: 'physics', mastery: 0.5, x: 600, y: 200 },
  // Math
  { id: 'kg-10', label: '极限', subject: 'math', mastery: 0.7, x: 100, y: 500 },
  { id: 'kg-11', label: '无穷级数', subject: 'math', mastery: 0.55, x: 180, y: 580 },
  { id: 'kg-12', label: '数学证明', subject: 'math', mastery: 0.6, x: 50, y: 600 },
  { id: 'kg-13', label: '函数', subject: 'math', mastery: 0.8, x: 150, y: 450 },
  { id: 'kg-14', label: '勾股定理', subject: 'math', mastery: 0.9, x: 80, y: 380 },
  // History
  { id: 'kg-15', label: '罗马帝国', subject: 'history', mastery: 0.65, x: 700, y: 400 },
  { id: 'kg-16', label: '多因素分析', subject: 'history', mastery: 0.7, x: 750, y: 500 },
  { id: 'kg-17', label: '丝绸之路', subject: 'history', mastery: 0.5, x: 650, y: 520 },
  // Chemistry
  { id: 'kg-18', label: '氧化反应', subject: 'chemistry', mastery: 0.6, x: 550, y: 550 },
  { id: 'kg-19', label: '化学键', subject: 'chemistry', mastery: 0.45, x: 600, y: 630 },
  // Biology
  { id: 'kg-20', label: 'DNA', subject: 'biology', mastery: 0.55, x: 400, y: 600 },
  { id: 'kg-21', label: '细胞', subject: 'biology', mastery: 0.5, x: 320, y: 550 },
];

export const knowledgeGraphEdges = [
  { source: 'kg-1', target: 'kg-2' },
  { source: 'kg-1', target: 'kg-3' },
  { source: 'kg-1', target: 'kg-4' },
  { source: 'kg-3', target: 'kg-7' },
  { source: 'kg-4', target: 'kg-5' },
  { source: 'kg-4', target: 'kg-7' },
  { source: 'kg-5', target: 'kg-6' },
  { source: 'kg-6', target: 'kg-8' },
  { source: 'kg-10', target: 'kg-11' },
  { source: 'kg-10', target: 'kg-13' },
  { source: 'kg-11', target: 'kg-12' },
  { source: 'kg-13', target: 'kg-14' },
  { source: 'kg-15', target: 'kg-16' },
  { source: 'kg-15', target: 'kg-17' },
  { source: 'kg-18', target: 'kg-19' },
  { source: 'kg-20', target: 'kg-21' },
  // Cross-subject connections
  { source: 'kg-7', target: 'kg-13' }, // Physics-Math
  { source: 'kg-18', target: 'kg-20' }, // Chemistry-Biology
];
