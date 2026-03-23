export interface DialogueStep {
  id: string;
  speaker: 'ai' | 'user';
  content: string;
  options?: string[];
  conceptDiscovered?: string;
  isAha?: boolean;
  hints?: string[];
  phase: 'exploration' | 'scaffolding' | 'guided_discovery' | 'consolidation' | 'reflection';
}

export interface DialogueScript {
  id: string;
  subject: string;
  subjectColor: string;
  title: string;
  question: string;
  description: string;
  targetConcepts: string[];
  steps: DialogueStep[];
  mindMapNodes: MindMapNode[];
  mindMapEdges: MindMapEdge[];
}

export interface MindMapNode {
  id: string;
  label: string;
  discoveredByStudent: boolean;
  x: number;
  y: number;
}

export interface MindMapEdge {
  source: string;
  target: string;
  label?: string;
}

export const dialogueScripts: DialogueScript[] = [
  {
    id: 'physics-moon',
    subject: '物理',
    subjectColor: '#F59E0B',
    title: '为什么月亮不会掉下来？',
    question: '为什么月亮不会掉下来？',
    description: '从日常观察出发，探索万有引力和轨道运动的奥秘',
    targetConcepts: ['圆周运动', '向心力', '万有引力', '轨道运动'],
    steps: [
      {
        id: 'p1',
        speaker: 'ai',
        content: '这是一个非常棒的问题！在我们开始之前，我想先了解一下——你觉得月亮在天上是静止不动的，还是在做某种运动呢？',
        phase: 'exploration',
      },
      {
        id: 'p2',
        speaker: 'user',
        content: '月亮应该在绕地球转吧？',
        options: ['月亮在绕地球转', '月亮是静止的', '我不太确定'],
        phase: 'exploration',
      },
      {
        id: 'p3',
        speaker: 'ai',
        content: '没错！月亮确实在绕地球转。那我再问你一个有趣的问题：你骑过自行车吗？想象一下你骑车转弯的时候，是什么让你能转弯而不是一直走直线？',
        phase: 'scaffolding',
      },
      {
        id: 'p4',
        speaker: 'user',
        content: '转弯的时候要转车把，身体好像也要往弯的方向倾斜。',
        options: ['要转车把，身体倾斜', '有个力把我拉向弯道内侧', '摩擦力？'],
        phase: 'scaffolding',
      },
      {
        id: 'p5',
        speaker: 'ai',
        content: '说得很好！你提到了身体要倾斜。想想看，为什么要倾斜？如果你不倾斜会怎样？其实在你转弯的时候，需要有一个力把你"拉"向圆心的方向。这种做圆周运动时需要的、指向圆心的力，在物理学里有一个专门的名字，你猜是什么？',
        hints: [
          '提示1：这个力的方向始终指向圆的中心',
          '提示2：它的名字里有"心"这个字',
          '提示3：它叫做"向心力"——"向着中心的力"',
        ],
        phase: 'guided_discovery',
      },
      {
        id: 'p6',
        speaker: 'user',
        content: '向心力？',
        options: ['向心力', '离心力', '引力'],
        conceptDiscovered: '向心力',
        phase: 'guided_discovery',
      },
      {
        id: 'p7',
        speaker: 'ai',
        content: '太棒了！就是向心力！你自己推导出来了！任何做圆周运动的物体，都需要一个指向圆心的力——向心力。🌟\n\n现在让我们回到月亮。月亮在绕地球做圆周运动，那么月亮做圆周运动的"向心力"是由什么来提供的呢？',
        isAha: true,
        phase: 'guided_discovery',
      },
      {
        id: 'p8',
        speaker: 'user',
        content: '是地球对月亮的引力？',
        options: ['地球的引力', '太阳的引力', '我不确定'],
        conceptDiscovered: '万有引力',
        phase: 'guided_discovery',
      },
      {
        id: 'p9',
        speaker: 'ai',
        content: '完全正确！地球对月亮的万有引力，正好充当了月亮做圆周运动所需的向心力。🌟\n\n现在你能回答最初的问题了吗？为什么月亮不会"掉"下来？',
        isAha: true,
        phase: 'consolidation',
      },
      {
        id: 'p10',
        speaker: 'user',
        content: '因为月亮在高速绕地球转，地球的引力刚好提供了它转弯需要的向心力，所以它不会掉下来，而是一直在轨道上绕转！',
        options: [
          '月亮在绕地球转，引力提供向心力',
          '月亮速度很快所以不会掉',
          '我还是不太明白',
        ],
        conceptDiscovered: '轨道运动',
        phase: 'consolidation',
      },
      {
        id: 'p11',
        speaker: 'ai',
        content: '太精彩了！你完美地把整个逻辑链条串起来了！让我们回顾一下你刚才的思考过程：\n\n1. 月亮在做圆周运动\n2. 圆周运动需要向心力\n3. 地球的引力提供了这个向心力\n4. 所以月亮不会掉下来，而是沿轨道运行\n\n这其实就是牛顿发现万有引力定律的核心思路！你刚才走过的思考路径，和三百多年前牛顿的思考何其相似。你觉得在这个探索过程中，哪一步对你来说最有启发？',
        isAha: true,
        phase: 'reflection',
      },
      {
        id: 'p12',
        speaker: 'user',
        content: '从骑自行车转弯联想到月亮需要向心力这一步最让我惊喜！原来身边的事情和宇宙的规律是一样的。',
        options: [
          '从自行车联想到月亮这一步',
          '理解引力就是向心力那一步',
          '把整个逻辑链串起来那一刻',
        ],
        phase: 'reflection',
      },
    ],
    mindMapNodes: [
      { id: 'n1', label: '月亮不会掉下来', discoveredByStudent: false, x: 250, y: 0 },
      { id: 'n2', label: '月亮在绕地球转', discoveredByStudent: true, x: 250, y: 100 },
      { id: 'n3', label: '圆周运动', discoveredByStudent: true, x: 100, y: 200 },
      { id: 'n4', label: '骑车转弯类比', discoveredByStudent: false, x: 400, y: 200 },
      { id: 'n5', label: '向心力', discoveredByStudent: true, x: 250, y: 300 },
      { id: 'n6', label: '万有引力', discoveredByStudent: true, x: 100, y: 400 },
      { id: 'n7', label: '引力=向心力', discoveredByStudent: true, x: 250, y: 400 },
      { id: 'n8', label: '轨道运动', discoveredByStudent: true, x: 400, y: 400 },
    ],
    mindMapEdges: [
      { source: 'n1', target: 'n2', label: '观察' },
      { source: 'n2', target: 'n3', label: '运动类型' },
      { source: 'n4', target: 'n5', label: '类比推理' },
      { source: 'n3', target: 'n5', label: '需要' },
      { source: 'n5', target: 'n7', label: '由什么提供' },
      { source: 'n6', target: 'n7', label: '恰好等于' },
      { source: 'n7', target: 'n8', label: '因此形成' },
    ],
  },
  {
    id: 'math-infinity',
    subject: '数学',
    subjectColor: '#60A5FA',
    title: '为什么0.999...等于1？',
    question: '为什么0.999...等于1？',
    description: '通过多角度推理，理解极限和无穷的本质',
    targetConcepts: ['无限小数', '极限', '数学证明', '无穷级数'],
    steps: [
      {
        id: 'm1',
        speaker: 'ai',
        content: '这是一个让很多人困惑的问题！在我们探索之前，我先问你：你觉得0.999...（9无限循环）等于1吗？还是比1小一点点？',
        phase: 'exploration',
      },
      {
        id: 'm2',
        speaker: 'user',
        content: '我觉得0.999...应该比1小一点点吧？毕竟它永远到不了1。',
        options: ['比1小一点点', '应该等于1', '我不确定'],
        phase: 'exploration',
      },
      {
        id: 'm3',
        speaker: 'ai',
        content: '你的直觉很自然！大多数人第一反应都这么想。那我们来做一个有趣的实验。\n\n你知道 1/3 等于多少吗？用小数表示的话。',
        phase: 'scaffolding',
      },
      {
        id: 'm4',
        speaker: 'user',
        content: '1/3等于0.333...',
        options: ['0.333...', '0.3', '不太记得了'],
        phase: 'scaffolding',
      },
      {
        id: 'm5',
        speaker: 'ai',
        content: '没错！1/3 = 0.333...\n\n那如果我们把等式两边都乘以3，会得到什么？左边 1/3 × 3 = ？右边 0.333... × 3 = ？',
        hints: [
          '提示1：左边的分数 1/3 × 3，分子分母约分',
          '提示2：0.333... × 3，每一位3都乘以3得到9',
          '提示3：左边=1，右边=0.999...',
        ],
        phase: 'guided_discovery',
      },
      {
        id: 'm6',
        speaker: 'user',
        content: '左边是1，右边是0.999...！所以0.999... = 1？',
        options: ['左边1，右边0.999...', '我算不出来', '好像哪里不对'],
        conceptDiscovered: '数学证明',
        isAha: true,
        phase: 'guided_discovery',
      },
      {
        id: 'm7',
        speaker: 'ai',
        content: '你看到了！如果 1/3 = 0.333...，那么 3 × 1/3 = 3 × 0.333...，也就是 1 = 0.999...。🌟\n\n但你可能还有疑问。让我们再从另一个角度想：如果 0.999... 不等于 1，那它们之间的差是多少？',
        phase: 'guided_discovery',
      },
      {
        id: 'm8',
        speaker: 'user',
        content: '差是...0.000...001？但这个数好像写不出来，因为0后面有无限个0。',
        options: ['差是0.000...001', '差应该是0', '没法计算'],
        conceptDiscovered: '无限小数',
        phase: 'guided_discovery',
      },
      {
        id: 'm9',
        speaker: 'ai',
        content: '这个洞察太棒了！你发现了关键点——"0.000...001"这个数其实写不出来，因为如果有无限个0，就永远轮不到最后的那个1出现。也就是说，它们的差只能是0。🌟\n\n在数学中，这正是"极限"的概念。当9的个数趋向无穷时，0.999...的值趋向（或者说等于）1。两个实数之间如果差为0，那它们就是同一个数。\n\n你觉得这个结论直觉上还是有点"怪"吗？',
        isAha: true,
        conceptDiscovered: '极限',
        phase: 'consolidation',
      },
      {
        id: 'm10',
        speaker: 'user',
        content: '确实有点反直觉，但逻辑上说得通。因为它们之间的差是0，所以必须相等。',
        options: [
          '逻辑上说得通',
          '还是觉得怪怪的',
          '我理解了，它们就是同一个数',
        ],
        phase: 'consolidation',
      },
      {
        id: 'm11',
        speaker: 'ai',
        content: '你的感受很正确——数学有时候就是会给出反直觉的结论，但逻辑推理不会骗人。\n\n让我们回顾你的思考路径：\n1. 从 1/3 = 0.333... 出发\n2. 两边乘以3得到 1 = 0.999...\n3. 发现两个数的差只能为0\n4. 理解了"极限"的概念——无穷趋近就是相等\n\n你用了两种完全不同的方式证明了同一件事，这在数学里叫做"多角度验证"。在这个过程中，你觉得哪个推理方式最让你信服？',
        phase: 'reflection',
      },
      {
        id: 'm12',
        speaker: 'user',
        content: '用"差为0所以相等"这个角度最让我信服，因为这直接击中了我最初的疑问——"它们差多少"。',
        options: [
          '"差为0"的角度最信服',
          '1/3乘以3的方法更直观',
          '两个加在一起更有说服力',
        ],
        phase: 'reflection',
      },
    ],
    mindMapNodes: [
      { id: 'mn1', label: '0.999... = 1?', discoveredByStudent: false, x: 250, y: 0 },
      { id: 'mn2', label: '1/3 = 0.333...', discoveredByStudent: false, x: 100, y: 100 },
      { id: 'mn3', label: '×3 两边', discoveredByStudent: true, x: 100, y: 200 },
      { id: 'mn4', label: '1 = 0.999...', discoveredByStudent: true, x: 100, y: 300 },
      { id: 'mn5', label: '差是多少？', discoveredByStudent: false, x: 400, y: 100 },
      { id: 'mn6', label: '0.000...无限个0', discoveredByStudent: true, x: 400, y: 200 },
      { id: 'mn7', label: '差 = 0', discoveredByStudent: true, x: 400, y: 300 },
      { id: 'mn8', label: '极限概念', discoveredByStudent: true, x: 250, y: 400 },
    ],
    mindMapEdges: [
      { source: 'mn1', target: 'mn2', label: '出发点' },
      { source: 'mn2', target: 'mn3', label: '运算' },
      { source: 'mn3', target: 'mn4', label: '得到' },
      { source: 'mn1', target: 'mn5', label: '另一个角度' },
      { source: 'mn5', target: 'mn6', label: '计算' },
      { source: 'mn6', target: 'mn7', label: '推理' },
      { source: 'mn4', target: 'mn8', label: '本质' },
      { source: 'mn7', target: 'mn8', label: '意味着' },
    ],
  },
  {
    id: 'history-rome',
    subject: '历史',
    subjectColor: '#FB923C',
    title: '为什么罗马帝国会衰落？',
    question: '为什么罗马帝国会衰落？',
    description: '从多角度分析历史事件，培养系统性思维和因果分析能力',
    targetConcepts: ['多因素分析', '系统性思维', '因果关系', '历史类比'],
    steps: [
      {
        id: 'h1',
        speaker: 'ai',
        content: '非常好的历史大问题！在我们开始之前，我很好奇——如果让你猜，你觉得一个强大的帝国最可能因为什么原因衰落？可以联系你知道的任何朝代或国家。',
        phase: 'exploration',
      },
      {
        id: 'h2',
        speaker: 'user',
        content: '可能是被外敌打败了？或者内部腐败？',
        options: ['被外敌打败', '内部腐败', '经济崩溃', '我不太清楚'],
        phase: 'exploration',
      },
      {
        id: 'h3',
        speaker: 'ai',
        content: '你提到了两个非常重要的角度——外部威胁和内部问题。让我们先聊内部。\n\n想象你是一个管理着从英国到埃及这么大领土的皇帝。你觉得管理这么大的地方，最大的挑战是什么？',
        phase: 'scaffolding',
      },
      {
        id: 'h4',
        speaker: 'user',
        content: '信息传递太慢了？边疆的事情皇帝可能很久才知道。',
        options: ['信息传递慢，管理困难', '需要很多军队驻守', '税收很难收上来'],
        phase: 'scaffolding',
      },
      {
        id: 'h5',
        speaker: 'ai',
        content: '非常棒的思考！信息传递确实是古代大帝国的致命难题。那么当边疆将军掌握大量军队，但皇帝又很难控制他们的时候，你觉得会发生什么？',
        hints: [
          '提示1：想想将军手里有军队，远离皇帝的监管...',
          '提示2：中国历史上有类似的情况，比如唐朝的"安史之乱"',
          '提示3：这些将军可能会争夺皇位，导致内战不断',
        ],
        phase: 'guided_discovery',
      },
      {
        id: 'h6',
        speaker: 'user',
        content: '将军可能会叛乱或者自立为王！就像中国的军阀割据。',
        options: ['将军会叛乱', '会有内战', '将军不听指挥'],
        conceptDiscovered: '权力分散',
        isAha: true,
        phase: 'guided_discovery',
      },
      {
        id: 'h7',
        speaker: 'ai',
        content: '太好了！你还跨文化类比了中国的军阀割据！🌟 这正是罗马帝国后期的真实情况——"三世纪危机"期间，50年里换了26个皇帝，大部分死于内斗。\n\n但这只是一个因素。让我们再想想经济层面：打仗需要钱，养军队需要钱，建设需要钱。当帝国不再扩张，没有新的土地和战利品时，钱从哪来？',
        phase: 'guided_discovery',
      },
      {
        id: 'h8',
        speaker: 'user',
        content: '只能靠加税？但是加太多税老百姓会受不了。',
        options: ['加税，但百姓受不了', '发行更多货币', '减少开支'],
        conceptDiscovered: '经济困境',
        phase: 'guided_discovery',
      },
      {
        id: 'h9',
        speaker: 'ai',
        content: '你说的"发更多货币"其实也发生了！罗马后期不断减少银币中的含银量，导致了严重的通货膨胀。加上你说的重税，老百姓的生活变得很困难。🌟\n\n现在让我们把视角拉回来——你已经找到了好几个原因了。能帮我列一下吗？一个帝国衰落，不会只有一个原因，对吧？',
        isAha: true,
        phase: 'consolidation',
      },
      {
        id: 'h10',
        speaker: 'user',
        content: '内部有：政治不稳（皇位争夺）、经济崩溃（通胀+重税）、管理困难。外部还有蛮族入侵。这些因素互相影响，形成恶性循环！',
        options: [
          '多个因素互相影响',
          '主要是外敌入侵',
          '主要是内部腐败',
        ],
        conceptDiscovered: '多因素分析',
        isAha: true,
        phase: 'consolidation',
      },
      {
        id: 'h11',
        speaker: 'ai',
        content: '精彩！你刚才做了一件非常重要的事情——多因素分析和系统性思维！🌟\n\n你发现了：\n1. 政治不稳定（军人争权）\n2. 经济危机（通胀、重税）\n3. 管理困难（帝国太大）\n4. 外部压力（蛮族入侵）\n5. 这些因素互相加剧，形成恶性循环\n\n这种分析方式不只适用于罗马帝国。你觉得，如果用同样的分析框架去看其他历史上衰落的大帝国（比如汉朝、奥斯曼帝国），会发现类似的模式吗？',
        phase: 'reflection',
      },
      {
        id: 'h12',
        speaker: 'user',
        content: '肯定会有类似模式！比如汉朝末年也有外戚专权、土地兼并、农民起义。看来大帝国衰落可能有一些共同的规律。',
        options: [
          '会有类似模式和规律',
          '每个帝国情况不同',
          '需要更多研究才能确定',
        ],
        conceptDiscovered: '历史类比',
        phase: 'reflection',
      },
    ],
    mindMapNodes: [
      { id: 'hn1', label: '罗马帝国衰落', discoveredByStudent: false, x: 250, y: 0 },
      { id: 'hn2', label: '内部因素', discoveredByStudent: true, x: 100, y: 120 },
      { id: 'hn3', label: '外部因素', discoveredByStudent: true, x: 400, y: 120 },
      { id: 'hn4', label: '权力分散', discoveredByStudent: true, x: 0, y: 240 },
      { id: 'hn5', label: '经济困境', discoveredByStudent: true, x: 150, y: 240 },
      { id: 'hn6', label: '管理困难', discoveredByStudent: true, x: 300, y: 240 },
      { id: 'hn7', label: '蛮族入侵', discoveredByStudent: false, x: 450, y: 240 },
      { id: 'hn8', label: '恶性循环', discoveredByStudent: true, x: 250, y: 360 },
      { id: 'hn9', label: '多因素分析', discoveredByStudent: true, x: 150, y: 460 },
      { id: 'hn10', label: '历史类比', discoveredByStudent: true, x: 350, y: 460 },
    ],
    mindMapEdges: [
      { source: 'hn1', target: 'hn2' },
      { source: 'hn1', target: 'hn3' },
      { source: 'hn2', target: 'hn4' },
      { source: 'hn2', target: 'hn5' },
      { source: 'hn2', target: 'hn6' },
      { source: 'hn3', target: 'hn7' },
      { source: 'hn4', target: 'hn8', label: '互相加剧' },
      { source: 'hn5', target: 'hn8', label: '互相加剧' },
      { source: 'hn7', target: 'hn8', label: '互相加剧' },
      { source: 'hn8', target: 'hn9', label: '方法论' },
      { source: 'hn9', target: 'hn10', label: '拓展' },
    ],
  },
];

import { physicsGeoDialogues } from './dialogues-physics-geo';
import { mathChemDialogues } from './dialogues-math-chem';
import { bioHistoryDialogues } from './dialogues-bio-history';

export const allDialogueScripts: DialogueScript[] = [
  ...dialogueScripts,
  ...physicsGeoDialogues,
  ...mathChemDialogues,
  ...bioHistoryDialogues,
];

export const subjects = [
  { id: 'math', name: '数学', icon: 'Calculator', color: '#60A5FA', topics: ['为什么0.999...等于1？', '负数相乘为什么得正数？', '勾股定理是怎么来的？', '概率为什么反直觉？', '为什么不能除以零？'] },
  { id: 'physics', name: '物理', icon: 'Atom', color: '#F59E0B', topics: ['为什么月亮不会掉下来？', '为什么天是蓝色的？', '为什么冰会浮在水面上？', '为什么飞机能飞起来？', '光是波还是粒子？'] },
  { id: 'chemistry', name: '化学', icon: 'FlaskConical', color: '#34D399', topics: ['为什么铁会生锈？', '水为什么能灭火？', '化学反应为什么有快有慢？'] },
  { id: 'biology', name: '生物', icon: 'Leaf', color: '#A78BFA', topics: ['为什么我们会做梦？', 'DNA如何决定我们的样子？', '为什么要睡觉？', '细胞如何"知道"该做什么？'] },
  { id: 'history', name: '历史', icon: 'Landmark', color: '#FB923C', topics: ['为什么罗马帝国会衰落？', '丝绸之路改变了什么？', '文艺复兴为什么发生在意大利？', '工业革命为什么发生在英国？', '印刷术如何改变世界？'] },
  { id: 'geography', name: '地理', icon: 'Globe', color: '#2DD4BF', topics: ['为什么会有四季？', '沙漠是怎么形成的？', '为什么地球板块会移动？'] },
];

export const hotTopics = [
  { title: '为什么月亮不会掉下来？', subject: '物理', participants: 2847, id: 'physics-moon' },
  { title: '为什么0.999...等于1？', subject: '数学', participants: 2156, id: 'math-infinity' },
  { title: '为什么罗马帝国会衰落？', subject: '历史', participants: 1893, id: 'history-rome' },
  { title: '为什么天是蓝色的？', subject: '物理', participants: 1654, id: 'physics-blue-sky' },
  { title: 'DNA如何决定我们的样子？', subject: '生物', participants: 1432, id: 'bio-dna' },
  { title: '为什么铁会生锈？', subject: '化学', participants: 1298, id: 'chem-rust' },
  { title: '概率为什么反直觉？', subject: '数学', participants: 1187, id: 'math-probability' },
  { title: '印刷术如何改变世界？', subject: '历史', participants: 1056, id: 'history-printing' },
  { title: '为什么飞机能飞起来？', subject: '物理', participants: 982, id: 'physics-airplane' },
  { title: '为什么我们会做梦？', subject: '生物', participants: 943, id: 'bio-dreams' },
  { title: '为什么会有四季？', subject: '地理', participants: 897, id: 'geo-seasons' },
  { title: '水为什么能灭火？', subject: '化学', participants: 834, id: 'chem-water-fire' },
];
