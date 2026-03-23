import type { DialogueScript } from './dialogues';

export const physicsGeoDialogues: DialogueScript[] = [
  // ============================================================
  // 1. 为什么天是蓝色的？
  // ============================================================
  {
    id: 'physics-blue-sky',
    subject: '物理',
    subjectColor: '#F59E0B',
    title: '为什么天是蓝色的？',
    question: '为什么天是蓝色的？',
    description: '从阳光的秘密出发，探索光的色彩、波长与散射的奥秘',
    targetConcepts: ['光的组成', '波长', '散射', '瑞利散射'],
    steps: [
      {
        id: 'bs1',
        speaker: 'ai',
        content:
          '好问题！天天抬头看到蓝天，但很少有人想过为什么。在我们开始探索之前，我先问你一个问题——你觉得太阳光是什么颜色的？',
        phase: 'exploration',
      },
      {
        id: 'bs2',
        speaker: 'user',
        content: '太阳光是白色的吧？或者说是黄色的？',
        options: ['白色的', '黄色的', '没有颜色'],
        phase: 'exploration',
      },
      {
        id: 'bs3',
        speaker: 'ai',
        content:
          '有意思！看起来是白色或者黄色的对吧？但你有没有见过雨后的彩虹？彩虹是从哪来的呢？没有人拿颜料去天上画画吧。如果彩虹的光来自太阳，那这说明太阳光里面藏着什么秘密？',
        phase: 'scaffolding',
      },
      {
        id: 'bs4',
        speaker: 'user',
        content: '太阳光里面其实包含了所有颜色？彩虹就是把它们分开了！',
        options: [
          '太阳光包含所有颜色',
          '彩虹是水滴产生的',
          '我不太确定',
        ],
        conceptDiscovered: '光的组成',
        phase: 'scaffolding',
      },
      {
        id: 'bs5',
        speaker: 'ai',
        content:
          '没错！太阳光看起来是白色的，其实是红橙黄绿蓝靛紫所有颜色混在一起。彩虹就是水滴把它们"拆"开了，就像一个三棱镜。\n\n那下一个问题来了：这些不同颜色的光，除了颜色不一样，还有什么物理性质上的区别呢？想象一下海浪——有的浪头之间距离大，有的距离小。光也有类似的特征……',
        hints: [
          '提示1：光其实也是一种"波"，像水波一样有起伏',
          '提示2：不同颜色的光，波的间距不同，这个间距叫做……',
          '提示3：这个性质叫"波长"——红光波长长，蓝光波长短',
        ],
        phase: 'guided_discovery',
      },
      {
        id: 'bs6',
        speaker: 'user',
        content: '波长！不同颜色的光波长不一样？',
        options: ['波长不同', '速度不同', '亮度不同'],
        conceptDiscovered: '波长',
        phase: 'guided_discovery',
      },
      {
        id: 'bs7',
        speaker: 'ai',
        content:
          '太棒了！就是波长！红光的波长长，蓝光的波长短。你可以这样想象：红光像悠闲的大波浪，蓝光像急促的小碎浪。\n\n现在关键问题来了！太阳光穿过大气层的时候，会碰到空气中的小分子（氮气、氧气）。就像你往一堆弹珠里扔球——扔一个大球（红光，波长长）和扔一个小弹珠（蓝光，波长短），哪个更容易被弹来弹去？',
        isAha: true,
        phase: 'guided_discovery',
      },
      {
        id: 'bs8',
        speaker: 'user',
        content: '小弹珠更容易被弹开！所以蓝光更容易被空气分子弹来弹去？',
        options: [
          '蓝光（短波长）更容易被弹开',
          '红光更容易被弹开',
          '两种一样',
        ],
        conceptDiscovered: '散射',
        phase: 'guided_discovery',
      },
      {
        id: 'bs9',
        speaker: 'ai',
        content:
          '完全正确！波长短的蓝光更容易被空气分子散射到四面八方——这个现象叫做"瑞利散射"，是一位叫瑞利的科学家发现的。蓝光被散射的程度是红光的好几倍！\n\n所以你抬头看天，看到的其实是从四面八方被散射过来的蓝光。天空就像一个巨大的蓝色灯罩，到处都在发出蓝光。\n\n那我再考你一个：如果你理解了这个原理，你能解释为什么日落的时候天是红色或橙色的吗？',
        isAha: true,
        phase: 'consolidation',
      },
      {
        id: 'bs10',
        speaker: 'user',
        content:
          '因为日落时太阳光要穿过更厚的大气层，蓝光全被散射掉了，剩下的就是红光和橙光！',
        options: [
          '蓝光被散射完了，剩下红光',
          '太阳本身变红了',
          '我不太确定',
        ],
        conceptDiscovered: '瑞利散射',
        phase: 'consolidation',
      },
      {
        id: 'bs11',
        speaker: 'ai',
        content:
          '太精彩了！你不仅理解了原理，还能反向推理日落的颜色！让我们回顾一下你的推理链条：\n\n1. 太阳光包含所有颜色（彩虹证据）\n2. 不同颜色的光波长不同（红光长，蓝光短）\n3. 波长短的蓝光更容易被空气分子散射（瑞利散射）\n4. 散射的蓝光充满天空→天是蓝的\n5. 反向验证：日落时蓝光散射完了→天变红\n\n你刚才做的"反向验证"非常了不起，这是科学家检验理论的标准方法。在这个过程中，哪一步让你觉得"原来是这样"？',
        isAha: true,
        phase: 'reflection',
      },
      {
        id: 'bs12',
        speaker: 'user',
        content:
          '用弹珠的比喻理解散射那一步最有感觉！一下子就明白了为什么蓝光更容易被弹开。',
        options: [
          '弹珠比喻理解散射那一步',
          '用日落反向验证那一步',
          '发现太阳光包含所有颜色那一步',
        ],
        phase: 'reflection',
      },
    ],
    mindMapNodes: [
      { id: 'bs_n1', label: '天为什么是蓝色的', discoveredByStudent: false, x: 300, y: 0 },
      { id: 'bs_n2', label: '太阳光=所有颜色', discoveredByStudent: true, x: 150, y: 80 },
      { id: 'bs_n3', label: '彩虹=拆分光', discoveredByStudent: false, x: 450, y: 80 },
      { id: 'bs_n4', label: '波长', discoveredByStudent: true, x: 150, y: 170 },
      { id: 'bs_n5', label: '蓝光波长短', discoveredByStudent: true, x: 300, y: 170 },
      { id: 'bs_n6', label: '红光波长长', discoveredByStudent: false, x: 450, y: 170 },
      { id: 'bs_n7', label: '散射', discoveredByStudent: true, x: 200, y: 260 },
      { id: 'bs_n8', label: '瑞利散射', discoveredByStudent: true, x: 400, y: 260 },
      { id: 'bs_n9', label: '日落是红色的', discoveredByStudent: true, x: 300, y: 350 },
    ],
    mindMapEdges: [
      { source: 'bs_n1', target: 'bs_n2', label: '出发点' },
      { source: 'bs_n3', target: 'bs_n2', label: '证据' },
      { source: 'bs_n2', target: 'bs_n4', label: '区别在于' },
      { source: 'bs_n4', target: 'bs_n5' },
      { source: 'bs_n4', target: 'bs_n6' },
      { source: 'bs_n5', target: 'bs_n7', label: '更容易' },
      { source: 'bs_n7', target: 'bs_n8', label: '物理原理' },
      { source: 'bs_n8', target: 'bs_n9', label: '反向验证' },
    ],
  },

  // ============================================================
  // 2. 为什么冰会浮在水面上？
  // ============================================================
  {
    id: 'physics-ice-float',
    subject: '物理',
    subjectColor: '#F59E0B',
    title: '为什么冰会浮在水面上？',
    question: '为什么冰会浮在水面上？',
    description: '从一块冰出发，理解密度、氢键和水的奇特性质',
    targetConcepts: ['密度', '分子排列', '氢键', '物态变化'],
    steps: [
      {
        id: 'if1',
        speaker: 'ai',
        content:
          '你有没有想过，冰浮在水上其实是一件非常"奇怪"的事情？大多数物质冷却变成固体之后，会怎样？比如你把一块铁加热到液态铁，再让它冷却变回固态——这块固态铁放在液态铁里面会浮起来吗？',
        phase: 'exploration',
      },
      {
        id: 'if2',
        speaker: 'user',
        content: '固态铁应该会沉下去吧？大多数东西冷了会缩小、变重。',
        options: [
          '会沉下去，固体更重',
          '会浮起来',
          '我不太确定',
        ],
        phase: 'exploration',
      },
      {
        id: 'if3',
        speaker: 'ai',
        content:
          '没错！绝大多数物质的固体会沉到液体里面去。因为冷却的时候分子挤得更紧，同样体积的东西就更重了——这个"同样体积有多重"在物理学里有个专门的叫法。你把一杯水和一杯铁比较，铁更"沉"，我们怎么描述这种区别？',
        phase: 'scaffolding',
      },
      {
        id: 'if4',
        speaker: 'user',
        content: '密度！铁的密度比水大。',
        options: ['密度', '重量', '质量'],
        conceptDiscovered: '密度',
        phase: 'scaffolding',
      },
      {
        id: 'if5',
        speaker: 'ai',
        content:
          '对！就是密度。密度小的东西浮在密度大的东西上面——这就是为什么木头浮在水上、铁块沉入水底。\n\n那问题来了：冰能浮在水上，说明冰的密度比液态水怎么样？但水变成冰是冷却了对吧？按照"冷了会缩小"的规律，冰应该密度更大才对啊——可它偏偏浮起来了。这说明水结冰的时候发生了什么反常的事情？',
        hints: [
          '提示1：如果冰浮起来了，说明冰的密度比水小——也就是同样重量的冰，体积更大',
          '提示2：同样多的水变成冰后，体积膨胀了大约9%——你有没有把装满水的瓶子放进冰箱结冰后瓶子胀裂的经历？',
          '提示3：水结冰的时候反而膨胀了！分子排列变得更"松散"',
        ],
        phase: 'guided_discovery',
      },
      {
        id: 'if6',
        speaker: 'user',
        content: '水结冰的时候居然膨胀了？体积变大了所以密度反而变小？',
        options: [
          '水结冰时膨胀了，密度变小',
          '冰里面有空气',
          '我不太明白',
        ],
        conceptDiscovered: '物态变化',
        phase: 'guided_discovery',
      },
      {
        id: 'if7',
        speaker: 'ai',
        content:
          '没错！这就是水的"反常膨胀"——全宇宙几乎独一无二的怪脾气！\n\n但为什么呢？秘密在分子层面。液态水里，水分子就像舞池里的人，自由走动、彼此靠得很近。但当温度降到0度，水分子要"结冰"了——它们之间有一种特殊的化学力叫做"氢键"。你可以想象成每个水分子都伸出小手，规规矩矩地手拉手排成整齐的六角形结构。\n\n问题是：你觉得一群人肩挨肩自由挤在一起紧凑，还是手拉手排成整齐队形紧凑？',
        isAha: true,
        phase: 'guided_discovery',
      },
      {
        id: 'if8',
        speaker: 'user',
        content: '自由挤在一起更紧凑！排队反而间距更大——所以冰的分子排列更松散！',
        options: [
          '自由挤在一起更紧凑',
          '排队更紧凑',
          '差不多',
        ],
        conceptDiscovered: '氢键',
        phase: 'guided_discovery',
      },
      {
        id: 'if9',
        speaker: 'ai',
        content:
          '你这个理解太到位了！氢键强迫水分子排成六角形的"冰晶"结构，就像搭了一个漂亮但有很多空隙的积木城堡，反而比自由挤在一起时占了更多空间。这就是为什么冰的密度比水小——体积变大了约9%。\n\n现在来一个思维实验：假如水和其他物质一样，固态更重，冰会沉到水底。你想象一下，冬天的湖泊会变成什么样？对鱼和其他水生生物意味着什么？',
        isAha: true,
        phase: 'consolidation',
      },
      {
        id: 'if10',
        speaker: 'user',
        content:
          '如果冰沉到水底，湖会从底部开始结冰，最后整个冻成一坨！鱼就全死了！冰浮在上面反而形成了保温层！',
        options: [
          '湖会从底部冻实，鱼全死了',
          '没什么影响',
          '不太确定',
        ],
        conceptDiscovered: '分子排列',
        phase: 'consolidation',
      },
      {
        id: 'if11',
        speaker: 'ai',
        content:
          '太深刻了！水的这个"反常"性质恰恰是生命存在的关键条件之一。冰浮在水面上，形成一层隔热层，保护下面的液态水不被冻住，鱼和水生生物才能在冬天存活。\n\n让我们回顾你的思考之旅：\n1. 大多数固体密度大于液体→会下沉\n2. 冰浮起来→说明冰的密度反而更小\n3. 水结冰时膨胀→因为氢键让分子排成松散的六角形\n4. 如果冰不浮→水生生态系统将毁灭\n\n你从一块冰出发，走到了生命存在的意义！在这个过程中，哪个环节最让你吃惊？',
        isAha: true,
        phase: 'reflection',
      },
      {
        id: 'if12',
        speaker: 'user',
        content:
          '最让我吃惊的是"排队反而更松散"这个比喻！瞬间就理解了为什么固体反而比液体轻。还有冰浮在水上居然关系到地球上所有水生生物的命运！',
        options: [
          '排队比喻那一步最惊艳',
          '冰保护生态系统那一步',
          '发现大多数物质固体更重那一步',
        ],
        phase: 'reflection',
      },
    ],
    mindMapNodes: [
      { id: 'if_n1', label: '冰浮在水上', discoveredByStudent: false, x: 300, y: 0 },
      { id: 'if_n2', label: '密度', discoveredByStudent: true, x: 150, y: 80 },
      { id: 'if_n3', label: '大多数固体更重', discoveredByStudent: true, x: 450, y: 80 },
      { id: 'if_n4', label: '冰密度 < 水密度', discoveredByStudent: true, x: 300, y: 160 },
      { id: 'if_n5', label: '水结冰时膨胀', discoveredByStudent: true, x: 150, y: 240 },
      { id: 'if_n6', label: '氢键', discoveredByStudent: true, x: 300, y: 240 },
      { id: 'if_n7', label: '六角形冰晶结构', discoveredByStudent: false, x: 450, y: 240 },
      { id: 'if_n8', label: '分子排列松散', discoveredByStudent: true, x: 300, y: 320 },
      { id: 'if_n9', label: '保护水生生态', discoveredByStudent: true, x: 300, y: 400 },
    ],
    mindMapEdges: [
      { source: 'if_n1', target: 'if_n2', label: '关键概念' },
      { source: 'if_n2', target: 'if_n3', label: '一般规律' },
      { source: 'if_n1', target: 'if_n4', label: '说明' },
      { source: 'if_n4', target: 'if_n5', label: '原因' },
      { source: 'if_n5', target: 'if_n6', label: '根本原因' },
      { source: 'if_n6', target: 'if_n7', label: '形成' },
      { source: 'if_n7', target: 'if_n8', label: '导致' },
      { source: 'if_n8', target: 'if_n9', label: '生态意义' },
    ],
  },

  // ============================================================
  // 3. 为什么飞机能飞起来？
  // ============================================================
  {
    id: 'physics-airplane',
    subject: '物理',
    subjectColor: '#F59E0B',
    title: '为什么飞机能飞起来？',
    question: '为什么飞机能飞起来？',
    description: '从一架沉重的钢铁巨鸟出发，揭开升力和伯努利原理的秘密',
    targetConcepts: ['升力', '伯努利原理', '流速与压强', '牛顿第三定律'],
    steps: [
      {
        id: 'ap1',
        speaker: 'ai',
        content:
          '一架波音747重将近400吨——差不多是200头大象的重量！这么重的铁疙瘩居然能飞在天上。我想先问你：要让一个东西不掉下来，至少需要什么条件？',
        phase: 'exploration',
      },
      {
        id: 'ap2',
        speaker: 'user',
        content: '需要一个向上的力，至少要跟重力一样大。',
        options: [
          '需要向上的力抵消重力',
          '需要速度够快',
          '不太确定',
        ],
        phase: 'exploration',
      },
      {
        id: 'ap3',
        speaker: 'ai',
        content:
          '说得对！要有一个向上的力来对抗重力。在飞行中，这个向上的力有个专门的名字叫"升力"。\n\n那升力从哪来呢？飞机是靠发动机的力向上推的吗？仔细想想——发动机的喷气方向是往后面喷的，那向上的力是谁提供的？提示：飞机上有个部件的形状非常特别……',
        phase: 'scaffolding',
      },
      {
        id: 'ap4',
        speaker: 'user',
        content: '是机翼？机翼的形状好像上面弧形、下面比较平？',
        options: ['机翼的特殊形状', '发动机向上推', '螺旋桨'],
        conceptDiscovered: '升力',
        phase: 'scaffolding',
      },
      {
        id: 'ap5',
        speaker: 'ai',
        content:
          '没错！关键就在机翼！如果你把机翼横截面切开看，上面是弧形鼓起来的，下面相对平。当飞机高速前进时，空气从机翼的上下两面同时流过。\n\n现在想象一下：上面的路径是弧形的（更长），下面的路径是平的（更短）。空气要同时通过上下两面——走更长路的空气，需要怎样才能"不掉队"？',
        hints: [
          '提示1：空气在上面走的路更长，在下面走的路更短，但它们要同时到达机翼后面',
          '提示2：走更长的路、用同样的时间——那速度必须怎样？',
          '提示3：上面的空气必须流得更快！',
        ],
        phase: 'guided_discovery',
      },
      {
        id: 'ap6',
        speaker: 'user',
        content: '上面的空气必须流得更快才能赶上下面的空气！',
        options: [
          '上面的空气流速更快',
          '下面的空气流速更快',
          '速度一样',
        ],
        conceptDiscovered: '流速与压强',
        phase: 'guided_discovery',
      },
      {
        id: 'ap7',
        speaker: 'ai',
        content:
          '完全正确！上面的空气流速更快。现在到了最关键的一步——流速和压力之间有什么关系呢？\n\n你做过这样的实验吗：拿两张纸竖着拿在面前，中间留一点空隙，然后往中间吹气。按照直觉，两张纸应该被吹开——但实际上它们会怎样？',
        isAha: true,
        phase: 'guided_discovery',
      },
      {
        id: 'ap8',
        speaker: 'user',
        content: '两张纸反而会靠拢！因为中间气流快、压力反而小了？',
        options: [
          '两张纸靠拢——流速快压力小',
          '两张纸被吹开',
          '不动',
        ],
        conceptDiscovered: '伯努利原理',
        phase: 'guided_discovery',
      },
      {
        id: 'ap9',
        speaker: 'ai',
        content:
          '你发现了！这就是大名鼎鼎的"伯努利原理"：流速越快的地方，压强越小。\n\n现在你能把整个逻辑串起来了吗？机翼上方空气流速快→压强小，下方空气流速慢→压强大。那上下的压强差会产生什么效果？',
        isAha: true,
        phase: 'consolidation',
      },
      {
        id: 'ap10',
        speaker: 'user',
        content:
          '下面压力大、上面压力小，就会有一个向上的合力把机翼"推"上去——这就是升力！所以飞机能飞！',
        options: [
          '压力差产生向上的升力',
          '空气把飞机推上去',
          '还是不太明白',
        ],
        conceptDiscovered: '牛顿第三定律',
        phase: 'consolidation',
      },
      {
        id: 'ap11',
        speaker: 'ai',
        content:
          '太漂亮了！你完美地推导出了飞机飞行的核心原理！让我们回顾你的思维链条：\n\n1. 飞机需要向上的升力来对抗重力\n2. 升力来自机翼的特殊形状\n3. 机翼上方空气路径长→流速快→压强小\n4. 机翼下方空气路径短→流速慢→压强大\n5. 上下压力差→产生升力\n6. 核心原理：伯努利原理（流速快→压强小）\n\n其实这个原理在生活中到处都是——你在站台上等地铁时为什么要站在黄线后面？快速的列车经过时空气流速大、压力小，你可能会被"吸"过去。同一个原理！你觉得哪一步对你启发最大？',
        isAha: true,
        phase: 'reflection',
      },
      {
        id: 'ap12',
        speaker: 'user',
        content:
          '两张纸靠拢的实验最让我惊讶！完全颠覆直觉——吹气竟然不是把东西吹开，而是让它们靠拢。一下子就理解了伯努利原理。',
        options: [
          '两张纸实验颠覆直觉',
          '机翼形状导致流速不同那一步',
          '联系到地铁站安全线那一步',
        ],
        phase: 'reflection',
      },
    ],
    mindMapNodes: [
      { id: 'ap_n1', label: '飞机为什么能飞', discoveredByStudent: false, x: 300, y: 0 },
      { id: 'ap_n2', label: '需要升力', discoveredByStudent: true, x: 150, y: 80 },
      { id: 'ap_n3', label: '重力(400吨)', discoveredByStudent: false, x: 450, y: 80 },
      { id: 'ap_n4', label: '机翼形状', discoveredByStudent: true, x: 300, y: 150 },
      { id: 'ap_n5', label: '上方流速快', discoveredByStudent: true, x: 150, y: 230 },
      { id: 'ap_n6', label: '下方流速慢', discoveredByStudent: false, x: 450, y: 230 },
      { id: 'ap_n7', label: '伯努利原理', discoveredByStudent: true, x: 300, y: 310 },
      { id: 'ap_n8', label: '压力差=升力', discoveredByStudent: true, x: 300, y: 390 },
    ],
    mindMapEdges: [
      { source: 'ap_n1', target: 'ap_n2', label: '条件' },
      { source: 'ap_n1', target: 'ap_n3', label: '挑战' },
      { source: 'ap_n2', target: 'ap_n4', label: '来源' },
      { source: 'ap_n4', target: 'ap_n5', label: '弧形路径长' },
      { source: 'ap_n4', target: 'ap_n6', label: '平坦路径短' },
      { source: 'ap_n5', target: 'ap_n7', label: '流速快→压强小' },
      { source: 'ap_n6', target: 'ap_n7', label: '流速慢→压强大' },
      { source: 'ap_n7', target: 'ap_n8', label: '产生' },
    ],
  },

  // ============================================================
  // 4. 光是波还是粒子？
  // ============================================================
  {
    id: 'physics-wave-particle',
    subject: '物理',
    subjectColor: '#F59E0B',
    title: '光是波还是粒子？',
    question: '光是波还是粒子？',
    description: '踏入量子世界的大门，感受波粒二象性带来的思维震撼',
    targetConcepts: ['波动性', '粒子性', '双缝实验', '波粒二象性'],
    steps: [
      {
        id: 'wp1',
        speaker: 'ai',
        content:
          '这个问题困扰了物理学家几百年，而且答案可能会颠覆你对"存在"的认知！在开始之前，我先问你：你觉得光更像什么？像一颗一颗飞出去的子弹？还是像水面上一圈一圈扩散的波纹？',
        phase: 'exploration',
      },
      {
        id: 'wp2',
        speaker: 'user',
        content: '我觉得光像子弹？因为手电筒射出来的光是一条直线。',
        options: [
          '像子弹，走直线',
          '像波，会扩散',
          '不太确定',
        ],
        phase: 'exploration',
      },
      {
        id: 'wp3',
        speaker: 'ai',
        content:
          '有道理！光看起来确实走直线。但让我们做一个思想实验——你往平静的湖里扔一块石头，水波碰到一堵有两个小缺口的墙，另一边会发生什么？两道波会怎样互相影响？',
        phase: 'scaffolding',
      },
      {
        id: 'wp4',
        speaker: 'user',
        content: '两道水波会互相交叉，有的地方波浪加强，有的地方互相抵消变平。',
        options: [
          '会互相干涉，有加强有减弱',
          '各走各的',
          '不太确定',
        ],
        conceptDiscovered: '波动性',
        phase: 'scaffolding',
      },
      {
        id: 'wp5',
        speaker: 'ai',
        content:
          '没错！这种"有的地方加强、有的地方抵消"的现象叫做"干涉"，是波的独特标志。子弹是做不到这一点的——两颗子弹碰到一起不会互相"抵消消失"对吧？\n\n1801年，一个叫托马斯·杨的科学家做了一个著名实验：他让光通过两条非常窄的缝——就像我们说的水波穿过两个缺口。如果光是子弹（粒子），屏幕上应该看到两条亮线。但实际上看到了什么呢？',
        hints: [
          '提示1：如果光是波，通过两条缝后会像水波一样干涉',
          '提示2：干涉会产生有的地方亮（加强）、有的地方暗（抵消）的条纹',
          '提示3：屏幕上出现了明暗相间的条纹——说明光发生了干涉！',
        ],
        phase: 'guided_discovery',
      },
      {
        id: 'wp6',
        speaker: 'user',
        content: '屏幕上出现了明暗条纹？那说明光是波啊！因为只有波才能干涉！',
        options: [
          '出现了明暗条纹——光是波',
          '只有两条亮线——光是粒子',
          '不太确定',
        ],
        conceptDiscovered: '双缝实验',
        phase: 'guided_discovery',
      },
      {
        id: 'wp7',
        speaker: 'ai',
        content:
          '漂亮！双缝实验完美地证明了光是波。故事到这里似乎结束了——但1905年，爱因斯坦发现了一件诡异的事情。\n\n他研究"光电效应"：用光照射金属，能把电子打出来。按照波的理论，光越亮（能量越大），打出的电子应该越快。但实际上，只有颜色变了（频率高了）电子才会变快，光变亮只是打出更多电子。这更像什么——海浪冲击沙滩？还是一颗一颗弹珠撞球？',
        isAha: true,
        phase: 'guided_discovery',
      },
      {
        id: 'wp8',
        speaker: 'user',
        content: '更像弹珠撞球！一颗一颗地把电子撞出来。所以光又是粒子了？',
        options: [
          '像弹珠撞球——光是粒子',
          '还是像波',
          '好矛盾啊',
        ],
        conceptDiscovered: '粒子性',
        phase: 'guided_discovery',
      },
      {
        id: 'wp9',
        speaker: 'ai',
        content:
          '你感受到矛盾了！双缝实验说光是波，光电效应说光是粒子——两个实验都铁证如山，但结论互相矛盾。物理学家们也纠结了很久。\n\n最终的答案是什么？光既不是纯粹的波，也不是纯粹的粒子。它同时具有两种性质——在某些实验中表现出波的特征，在另一些实验中表现出粒子的特征。这叫做"波粒二象性"。就像一个人可以既是父亲又是儿子——取决于你从什么角度看。\n\n你能接受这个"两者都是"的答案吗？',
        isAha: true,
        phase: 'consolidation',
      },
      {
        id: 'wp10',
        speaker: 'user',
        content:
          '虽然有点奇怪，但逻辑上说得通。不是光"变来变去"，而是它本来就同时是两者，只是不同实验看到不同面。',
        options: [
          '接受——光本来就两者都是',
          '还是觉得不可思议',
          '需要再想想',
        ],
        conceptDiscovered: '波粒二象性',
        phase: 'consolidation',
      },
      {
        id: 'wp11',
        speaker: 'ai',
        content:
          '你的理解非常深刻！让我们回顾一下这趟疯狂的思维之旅：\n\n1. 水波通过双缝→干涉条纹→波的特征\n2. 双缝实验→光也产生干涉条纹→光是波\n3. 光电效应→光一颗一颗打出电子→光是粒子\n4. 两个铁证矛盾→光同时具有两种性质→波粒二象性\n\n更疯狂的是，后来科学家发现不光是光——电子、质子、甚至你和我这样的物质粒子，在微观层面都有波粒二象性！整个量子世界都是如此。你觉得这个探索过程中，哪一刻让你最"烧脑"？',
        isAha: true,
        phase: 'reflection',
      },
      {
        id: 'wp12',
        speaker: 'user',
        content:
          '两个实验都正确但结论矛盾的那一刻最烧脑！逼着你必须跳出"非此即彼"的思维，接受"两者都是"。这真的改变了我看问题的方式。',
        options: [
          '两个实验矛盾那一刻最烧脑',
          '光电效应颠覆了刚建立的认知',
          '波粒二象性推广到所有物质那一步',
        ],
        phase: 'reflection',
      },
    ],
    mindMapNodes: [
      { id: 'wp_n1', label: '光是波还是粒子？', discoveredByStudent: false, x: 300, y: 0 },
      { id: 'wp_n2', label: '水波干涉', discoveredByStudent: false, x: 100, y: 80 },
      { id: 'wp_n3', label: '双缝实验', discoveredByStudent: true, x: 100, y: 170 },
      { id: 'wp_n4', label: '光有波动性', discoveredByStudent: true, x: 100, y: 260 },
      { id: 'wp_n5', label: '光电效应', discoveredByStudent: false, x: 500, y: 80 },
      { id: 'wp_n6', label: '光打出电子', discoveredByStudent: true, x: 500, y: 170 },
      { id: 'wp_n7', label: '光有粒子性', discoveredByStudent: true, x: 500, y: 260 },
      { id: 'wp_n8', label: '矛盾！', discoveredByStudent: true, x: 300, y: 300 },
      { id: 'wp_n9', label: '波粒二象性', discoveredByStudent: true, x: 300, y: 390 },
    ],
    mindMapEdges: [
      { source: 'wp_n1', target: 'wp_n2', label: '类比' },
      { source: 'wp_n2', target: 'wp_n3', label: '用光做实验' },
      { source: 'wp_n3', target: 'wp_n4', label: '明暗条纹' },
      { source: 'wp_n1', target: 'wp_n5', label: '另一个实验' },
      { source: 'wp_n5', target: 'wp_n6', label: '发现' },
      { source: 'wp_n6', target: 'wp_n7', label: '说明' },
      { source: 'wp_n4', target: 'wp_n8', label: '与' },
      { source: 'wp_n7', target: 'wp_n8', label: '矛盾' },
      { source: 'wp_n8', target: 'wp_n9', label: '解决' },
    ],
  },

  // ============================================================
  // 5. 为什么会有四季？
  // ============================================================
  {
    id: 'geo-seasons',
    subject: '地理',
    subjectColor: '#2DD4BF',
    title: '为什么会有四季？',
    question: '为什么会有四季？',
    description: '从南北半球的差异出发，揭开地球倾斜与四季更替的关系',
    targetConcepts: ['地轴倾斜', '公转', '太阳直射角', '昼夜长短'],
    steps: [
      {
        id: 'ss1',
        speaker: 'ai',
        content:
          '你知道吗？当我们在中国过冬天、穿厚棉袄的时候，澳大利亚的人正在海边穿泳衣过圣诞节呢！这说明什么问题？',
        phase: 'exploration',
      },
      {
        id: 'ss2',
        speaker: 'user',
        content: '说明南半球和北半球的季节是相反的！',
        options: [
          '南北半球季节相反',
          '澳大利亚总是夏天',
          '不太确定',
        ],
        phase: 'exploration',
      },
      {
        id: 'ss3',
        speaker: 'ai',
        content:
          '没错！这是一个非常重要的线索。很多人以为四季变化是因为地球绕太阳转的时候，有时候离太阳近（夏天）、有时候离太阳远（冬天）。但如果是这个原因的话——南北半球应该同时热、同时冷才对啊！因为整个地球一起靠近或远离太阳。可事实是南北半球季节相反，这就推翻了"远近"的说法。\n\n那真正的原因是什么呢？让我给你一个提示：你拿一个地球仪看看——地球是"正"着转的吗？',
        phase: 'scaffolding',
      },
      {
        id: 'ss4',
        speaker: 'user',
        content: '地球不是竖直的，是斜着转的！好像歪了一个角度。',
        options: [
          '地球是斜着转的',
          '地球是竖直转的',
          '不太确定角度',
        ],
        conceptDiscovered: '地轴倾斜',
        phase: 'scaffolding',
      },
      {
        id: 'ss5',
        speaker: 'ai',
        content:
          '对！地球的自转轴不是竖直的，而是倾斜了大约23.5度。就像一个歪着脑袋旋转的陀螺。\n\n现在想象一下：这个歪着脑袋的地球在绕太阳公转。在公转的某个位置，北半球"歪向"太阳那边，南半球"歪离"太阳。半年后地球走到对面的位置，情况就反过来了。\n\n当北半球歪向太阳时，太阳光是更"直射"还是更"斜射"北半球？你可以想象一下，中午的太阳高挂在头顶和下午太阳斜挂在西边，哪个时候更热？',
        hints: [
          '提示1：手电筒正对着照墙壁，和斜着照墙壁，哪个光斑更集中、更亮？',
          '提示2：正对着照（直射）的时候光更集中、能量更强',
          '提示3：北半球歪向太阳→太阳更直射→同样面积接收更多能量→更热→夏天',
        ],
        phase: 'guided_discovery',
      },
      {
        id: 'ss6',
        speaker: 'user',
        content: '直射更热！就像手电筒正对着照更亮。所以北半球歪向太阳时太阳直射→夏天！',
        options: [
          '直射更热，所以是夏天',
          '斜射更热',
          '没什么区别',
        ],
        conceptDiscovered: '太阳直射角',
        phase: 'guided_discovery',
      },
      {
        id: 'ss7',
        speaker: 'ai',
        content:
          '完美！你理解了最核心的机制！手电筒正对着照，光斑小而集中→能量密度大→更热。太阳直射同理。\n\n但还有一个加强效果——当北半球歪向太阳的时候，不仅太阳照射角度更直，而且白天的时间也会发生变化。你有没有注意过，夏天天黑得晚、冬天天黑得早？\n\n想想看，如果北半球倾向太阳，太阳在天空中走的弧线会更长还是更短？',
        isAha: true,
        phase: 'guided_discovery',
      },
      {
        id: 'ss8',
        speaker: 'user',
        content: '弧线更长！所以白天更长！夏天白天长，不仅直射而且照的时间还更长，双重加热！',
        options: [
          '白天更长，双重加热',
          '白天更短',
          '长短差不多',
        ],
        conceptDiscovered: '昼夜长短',
        phase: 'guided_discovery',
      },
      {
        id: 'ss9',
        speaker: 'ai',
        content:
          '太棒了！你找到了四季变化的两个关键因素：\n1. 太阳直射角度→能量更集中\n2. 白天时间更长→接收能量更多\n\n这两个因素叠加在一起，就造成了夏天热、冬天冷。而因为地轴倾斜方向不变，当北半球歪向太阳时南半球就歪离太阳——所以南北半球季节永远相反！\n\n现在你能完整解释一开始的问题了吗——为什么澳大利亚圣诞节是夏天？',
        isAha: true,
        phase: 'consolidation',
      },
      {
        id: 'ss10',
        speaker: 'user',
        content:
          '12月的时候地球公转到了南半球歪向太阳的位置，南半球受到更直射的阳光、白天更长，所以澳大利亚是夏天。而同时北半球歪离太阳，我们就是冬天！',
        options: [
          '南半球倾向太阳→夏天，北半球远离→冬天',
          '因为12月离太阳近',
          '不太能解释',
        ],
        conceptDiscovered: '公转',
        phase: 'consolidation',
      },
      {
        id: 'ss11',
        speaker: 'ai',
        content:
          '完美的解释！让我们回顾你的推理之旅：\n\n1. 南北半球季节相反→不是因为离太阳远近\n2. 地球自转轴倾斜23.5度→像歪脑袋的陀螺\n3. 公转中倾向太阳的半球→太阳直射→能量集中\n4. 同时白天更长→接收更多能量\n5. 两个因素叠加→夏天热，冬天冷\n6. 南北半球倾斜方向相反→季节相反\n\n有趣的是，如果地球的自转轴是竖直的（不倾斜），就不会有四季了——全年都是一样的温度。区区23.5度的倾斜，造就了春夏秋冬！你觉得这个探索中哪一步最关键？',
        isAha: true,
        phase: 'reflection',
      },
      {
        id: 'ss12',
        speaker: 'user',
        content:
          '用"南北半球季节相反"来推翻"离太阳远近"那一步最关键！排除了错误答案之后，正确答案就自然浮出来了。',
        options: [
          '排除"远近"假说那一步',
          '理解直射和斜射的能量差别',
          '发现白天长度也受影响',
        ],
        phase: 'reflection',
      },
    ],
    mindMapNodes: [
      { id: 'ss_n1', label: '为什么有四季', discoveredByStudent: false, x: 300, y: 0 },
      { id: 'ss_n2', label: '南北半球季节相反', discoveredByStudent: true, x: 100, y: 70 },
      { id: 'ss_n3', label: '不是远近原因', discoveredByStudent: true, x: 500, y: 70 },
      { id: 'ss_n4', label: '地轴倾斜23.5°', discoveredByStudent: true, x: 300, y: 140 },
      { id: 'ss_n5', label: '公转', discoveredByStudent: true, x: 150, y: 220 },
      { id: 'ss_n6', label: '太阳直射角', discoveredByStudent: true, x: 300, y: 220 },
      { id: 'ss_n7', label: '昼夜长短', discoveredByStudent: true, x: 450, y: 220 },
      { id: 'ss_n8', label: '能量集中', discoveredByStudent: true, x: 220, y: 310 },
      { id: 'ss_n9', label: '照射时间长', discoveredByStudent: true, x: 400, y: 310 },
      { id: 'ss_n10', label: '四季更替', discoveredByStudent: true, x: 300, y: 390 },
    ],
    mindMapEdges: [
      { source: 'ss_n1', target: 'ss_n2', label: '线索' },
      { source: 'ss_n2', target: 'ss_n3', label: '推翻' },
      { source: 'ss_n3', target: 'ss_n4', label: '真正原因' },
      { source: 'ss_n4', target: 'ss_n5', label: '在公转中' },
      { source: 'ss_n4', target: 'ss_n6', label: '决定' },
      { source: 'ss_n4', target: 'ss_n7', label: '影响' },
      { source: 'ss_n6', target: 'ss_n8', label: '直射更集中' },
      { source: 'ss_n7', target: 'ss_n9', label: '白天更长' },
      { source: 'ss_n8', target: 'ss_n10', label: '叠加' },
      { source: 'ss_n9', target: 'ss_n10', label: '叠加' },
    ],
  },

  // ============================================================
  // 6. 沙漠是怎么形成的？
  // ============================================================
  {
    id: 'geo-desert',
    subject: '地理',
    subjectColor: '#2DD4BF',
    title: '沙漠是怎么形成的？',
    question: '沙漠是怎么形成的？',
    description: '从"干"字出发，探索大气环流、副热带高压和雨影效应',
    targetConcepts: ['蒸发与降水', '大气环流', '副热带高压', '地形阻挡'],
    steps: [
      {
        id: 'ds1',
        speaker: 'ai',
        content:
          '说到沙漠，你脑海里第一个浮现的画面是什么？烈日、黄沙、仙人掌？那你觉得沙漠最最核心的特征是什么？不是沙子哦——有些沙漠甚至没有沙，比如南极也是"沙漠"！',
        phase: 'exploration',
      },
      {
        id: 'ds2',
        speaker: 'user',
        content: '最核心的特征是干？缺水？南极也算沙漠的话那就不是热的问题，是干的问题！',
        options: [
          '干、缺水',
          '热、温度高',
          '全是沙子',
        ],
        phase: 'exploration',
      },
      {
        id: 'ds3',
        speaker: 'ai',
        content:
          '太对了！你一下子抓住了本质——沙漠的定义就是年降水量极少的地方（通常不到250毫米）。那下一个问题：一个地方要变得很"干"，从水循环的角度想，需要满足什么条件？\n\n想象一下你在晾衣服——什么时候衣服干得快？',
        phase: 'scaffolding',
      },
      {
        id: 'ds4',
        speaker: 'user',
        content: '蒸发大于降水！就像晾衣服时水蒸发掉了，但没有新的水来补充。',
        options: [
          '蒸发大于降水',
          '不下雨',
          '地下水干了',
        ],
        conceptDiscovered: '蒸发与降水',
        phase: 'scaffolding',
      },
      {
        id: 'ds5',
        speaker: 'ai',
        content:
          '完全正确！蒸发大于降水——水出去得多、进来得少，就越来越干。\n\n那关键问题是：为什么有些地方就是不怎么下雨呢？你有没有注意到一个有趣的现象——如果你看世界地图上沙漠的分布，撒哈拉沙漠、阿拉伯沙漠、澳大利亚内陆沙漠……它们几乎都在差不多的纬度上——南北纬30度左右。这是巧合吗？',
        hints: [
          '提示1：赤道附近热空气上升，到了高空会向南北两边流动',
          '提示2：这些热空气在大约纬度30度的地方冷却下沉',
          '提示3：下沉的空气是干燥的、高压的——把云和水汽"压"走了，叫做"副热带高压"',
        ],
        phase: 'guided_discovery',
      },
      {
        id: 'ds6',
        speaker: 'user',
        content:
          '不是巧合！是因为大气环流——赤道的热空气上升后，到30度附近下沉，下沉的气流是干的！',
        options: [
          '大气环流导致30度附近气流下沉',
          '纯属巧合',
          '因为那里日照强',
        ],
        conceptDiscovered: '副热带高压',
        phase: 'guided_discovery',
      },
      {
        id: 'ds7',
        speaker: 'ai',
        content:
          '太棒了！你发现了全球沙漠分布的秘密——副热带高压带！赤道的湿热空气上升、在高空向南北流动、到了30度附近冷却下沉。下沉的气流又干又稳定，像一口大锅盖压在那里，不让云形成，所以很少下雨。\n\n但还有一种沙漠不在30度——比如中国的塔克拉玛干沙漠，它在大约40度的位置。这又是为什么呢？看看地图上它的周围有什么特殊的地形？',
        isAha: true,
        phase: 'guided_discovery',
      },
      {
        id: 'ds8',
        speaker: 'user',
        content:
          '塔克拉玛干周围全是高山！天山、昆仑山、帕米尔高原……山把湿润的空气挡住了！',
        options: [
          '高山挡住了湿润气流',
          '离海太远',
          '两个原因都有',
        ],
        conceptDiscovered: '地形阻挡',
        phase: 'guided_discovery',
      },
      {
        id: 'ds9',
        speaker: 'ai',
        content:
          '你说的两个原因其实都对！高山把带水汽的风挡住——湿空气爬坡时冷却降雨，翻过山后水汽已经耗尽了，山的另一边就干旱了。这叫做"雨影效应"。再加上离海远，水汽本身就少。\n\n现在你来总结一下：沙漠的形成主要有哪些原因？',
        isAha: true,
        phase: 'consolidation',
      },
      {
        id: 'ds10',
        speaker: 'user',
        content:
          '主要有三种原因：一是副热带高压让空气下沉（像撒哈拉）；二是山脉阻挡水汽形成雨影效应（像塔克拉玛干）；三是离海太远水汽到不了。它们的共同点都是降水少、蒸发大！',
        options: [
          '三种原因都找到了',
          '主要是因为热',
          '只有一种原因',
        ],
        conceptDiscovered: '大气环流',
        phase: 'consolidation',
      },
      {
        id: 'ds11',
        speaker: 'ai',
        content:
          '完美的总结！你把三种不同的成因都找到了，而且准确地指出了它们的共同本质——降水少于蒸发。\n\n让我们回顾你的推理之旅：\n1. 沙漠的本质是"干"而不是"热"\n2. 干=蒸发大于降水\n3. 全球沙漠集中在30度→副热带高压（大气环流下沉）\n4. 内陆沙漠→山脉阻挡（雨影效应）+距海远\n5. 共同本质：水汽到不了或留不住\n\n你一开始就抓住了"干"这个本质，后面的推理就势如破竹。在这个过程中，哪个发现最让你眼前一亮？',
        isAha: true,
        phase: 'reflection',
      },
      {
        id: 'ds12',
        speaker: 'user',
        content:
          '发现全世界沙漠都在纬度30度那一刻！原来看起来是"巧合"的事情背后有大气环流这样宏大的原因。地理太有意思了！',
        options: [
          '30度纬度的规律最惊艳',
          '雨影效应的概念很有趣',
          '南极也是沙漠最意外',
        ],
        phase: 'reflection',
      },
    ],
    mindMapNodes: [
      { id: 'ds_n1', label: '沙漠怎么形成', discoveredByStudent: false, x: 300, y: 0 },
      { id: 'ds_n2', label: '本质：干', discoveredByStudent: true, x: 300, y: 70 },
      { id: 'ds_n3', label: '蒸发 > 降水', discoveredByStudent: true, x: 300, y: 140 },
      { id: 'ds_n4', label: '副热带高压', discoveredByStudent: true, x: 100, y: 230 },
      { id: 'ds_n5', label: '大气环流', discoveredByStudent: true, x: 100, y: 310 },
      { id: 'ds_n6', label: '地形阻挡', discoveredByStudent: true, x: 500, y: 230 },
      { id: 'ds_n7', label: '雨影效应', discoveredByStudent: false, x: 500, y: 310 },
      { id: 'ds_n8', label: '距海远', discoveredByStudent: true, x: 300, y: 310 },
      { id: 'ds_n9', label: '水汽到不了', discoveredByStudent: true, x: 300, y: 390 },
    ],
    mindMapEdges: [
      { source: 'ds_n1', target: 'ds_n2', label: '核心' },
      { source: 'ds_n2', target: 'ds_n3', label: '水循环' },
      { source: 'ds_n3', target: 'ds_n4', label: '原因一' },
      { source: 'ds_n4', target: 'ds_n5', label: '原理' },
      { source: 'ds_n3', target: 'ds_n6', label: '原因二' },
      { source: 'ds_n6', target: 'ds_n7', label: '产生' },
      { source: 'ds_n3', target: 'ds_n8', label: '原因三' },
      { source: 'ds_n7', target: 'ds_n9', label: '结果' },
      { source: 'ds_n8', target: 'ds_n9', label: '结果' },
    ],
  },

  // ============================================================
  // 7. 为什么地球板块会移动？
  // ============================================================
  {
    id: 'geo-plates',
    subject: '地理',
    subjectColor: '#2DD4BF',
    title: '为什么地球板块会移动？',
    question: '为什么地球板块会移动？',
    description: '从一张世界地图出发，探索板块构造、地幔对流和大陆漂移的证据',
    targetConcepts: ['板块构造', '地幔对流', '海底扩张', '大陆漂移'],
    steps: [
      {
        id: 'pt1',
        speaker: 'ai',
        content:
          '我先给你一个小挑战：去看一张世界地图，把南美洲的东海岸和非洲的西海岸对比一下。你发现了什么？',
        phase: 'exploration',
      },
      {
        id: 'pt2',
        speaker: 'user',
        content: '它们的形状好像能拼在一起！就像拼图一样！',
        options: [
          '形状能拼在一起，像拼图',
          '看不出什么',
          '大小差不多',
        ],
        phase: 'exploration',
      },
      {
        id: 'pt3',
        speaker: 'ai',
        content:
          '没错！这个发现你不是第一个——1912年，一个叫魏格纳的德国气象学家也注意到了这一点。他大胆提出：也许它们以前就是连在一起的！后来慢慢"漂"开了。这就是著名的"大陆漂移说"。\n\n不过当时很多科学家嘲笑他：就算大陆以前连在一起，那么重的陆地怎么可能"漂"？漂在什么上面？你觉得地球的内部结构是什么样的？是一个实心的大石头球吗？',
        phase: 'scaffolding',
      },
      {
        id: 'pt4',
        speaker: 'user',
        content: '不是实心的！地球内部有地壳、地幔、地核，地幔好像是岩浆？可以流动的？',
        options: [
          '有分层，地幔可以流动',
          '是实心的石头球',
          '里面是空心的',
        ],
        conceptDiscovered: '大陆漂移',
        phase: 'scaffolding',
      },
      {
        id: 'pt5',
        speaker: 'ai',
        content:
          '非常好！地球像一颗巨大的"溏心蛋"——外壳（地壳）薄而硬，中间的蛋白（地幔）是高温高压下非常缓慢流动的岩石，核心（地核）极热。\n\n地壳被分成了好几大块——就像一个碎了的蛋壳，每一块叫做"板块"。这些板块"浮"在能流动的地幔上面。\n\n那关键问题来了：地幔为什么会流动呢？给你一个提示——想想你烧开水的时候，锅底的水和上面的水是怎么运动的？',
        hints: [
          '提示1：锅底的水被加热后温度升高——热的水会怎样？',
          '提示2：热水密度小会往上升，上面的冷水密度大会往下沉——形成一个循环',
          '提示3：这叫"热对流"！地幔也一样——底部被地核加热上升，上面冷却下沉',
        ],
        phase: 'guided_discovery',
      },
      {
        id: 'pt6',
        speaker: 'user',
        content: '热对流！地幔底部被地核加热上升，上面冷了下沉，形成循环——就像烧开水！',
        options: [
          '热对流——像烧开水',
          '地震推动的',
          '月球引力拉动的',
        ],
        conceptDiscovered: '地幔对流',
        phase: 'guided_discovery',
      },
      {
        id: 'pt7',
        speaker: 'ai',
        content:
          '太棒了！就是地幔的热对流！地核温度高达5000多度，不断加热地幔底部。热的地幔物质上升，冷的下沉，形成巨大的环流圈。板块就像放在传送带上的行李箱，被地幔的缓慢流动"搬运"着移动。\n\n虽然每年只移动几厘米——和你指甲长的速度差不多——但经过几亿年，就能把连在一起的大陆搬到地球两端。\n\n那科学家怎么证明板块确实在移动呢？有一个非常有力的证据来自海底。在大洋中间有一条巨大的"裂缝"叫做洋中脊，你猜那里在发生什么？',
        isAha: true,
        phase: 'guided_discovery',
      },
      {
        id: 'pt8',
        speaker: 'user',
        content: '洋中脊是不是有岩浆从裂缝里冒出来，形成新的海底？板块就是从这里被推开的！',
        options: [
          '岩浆涌出形成新海底',
          '海水从这里流进地球',
          '不太确定',
        ],
        conceptDiscovered: '海底扩张',
        phase: 'guided_discovery',
      },
      {
        id: 'pt9',
        speaker: 'ai',
        content:
          '完全正确！这就是"海底扩张"理论。洋中脊就像一条超长的拉链，地幔物质从这里涌上来，凝固成新的海底岩石，然后慢慢向两侧推开。科学家发现离洋中脊越远的岩石年龄越老——这就是海底在扩张的铁证！\n\n那你现在能把整个故事串起来了吗？从魏格纳看地图开始，到板块为什么会移动。',
        isAha: true,
        phase: 'consolidation',
      },
      {
        id: 'pt10',
        speaker: 'user',
        content:
          '地球的地壳分成了好几块板块，浮在能流动的地幔上。地幔因为热对流而缓慢流动，就像传送带一样带动板块移动。洋中脊是新地壳诞生的地方，也是板块被推开的地方。所以南美洲和非洲以前连在一起，被慢慢推开了！',
        options: [
          '完整串起来了',
          '大概理解了',
          '还有些不太清楚',
        ],
        conceptDiscovered: '板块构造',
        phase: 'consolidation',
      },
      {
        id: 'pt11',
        speaker: 'ai',
        content:
          '太精彩了！你刚才把整个板块构造理论完美地重建了一遍！让我们回顾这段思维旅程：\n\n1. 南美和非洲像拼图→以前可能连在一起\n2. 魏格纳的大陆漂移说→但漂在什么上面？\n3. 地球分层→地壳"浮"在地幔上\n4. 地幔热对流→像烧开水，带动板块\n5. 海底扩张→洋中脊涌出新岩石，推开板块\n6. 每年几厘米→亿万年的累积\n\n你从一张地图出发，走到了地球最深处的秘密。而且板块运动不只解释了大陆漂移——地震、火山、山脉形成，全都和它有关！你觉得哪一步最让你觉得"原来如此"？',
        isAha: true,
        phase: 'reflection',
      },
      {
        id: 'pt12',
        speaker: 'user',
        content:
          '用烧开水来理解地幔对流那一步最妙！一个厨房里天天见到的事情，居然和大陆漂移的原理一样。还有"指甲生长速度"这个类比，让板块移动变得可以想象了。',
        options: [
          '烧开水的比喻最妙',
          '南美非洲拼图那一刻',
          '海底扩张的证据最有说服力',
        ],
        phase: 'reflection',
      },
    ],
    mindMapNodes: [
      { id: 'pt_n1', label: '板块为什么移动', discoveredByStudent: false, x: 300, y: 0 },
      { id: 'pt_n2', label: '南美+非洲像拼图', discoveredByStudent: true, x: 100, y: 60 },
      { id: 'pt_n3', label: '大陆漂移说', discoveredByStudent: true, x: 500, y: 60 },
      { id: 'pt_n4', label: '地球分层结构', discoveredByStudent: false, x: 300, y: 130 },
      { id: 'pt_n5', label: '板块浮在地幔上', discoveredByStudent: true, x: 150, y: 200 },
      { id: 'pt_n6', label: '地幔热对流', discoveredByStudent: true, x: 450, y: 200 },
      { id: 'pt_n7', label: '像烧开水', discoveredByStudent: false, x: 550, y: 270 },
      { id: 'pt_n8', label: '海底扩张', discoveredByStudent: true, x: 300, y: 290 },
      { id: 'pt_n9', label: '洋中脊', discoveredByStudent: false, x: 150, y: 350 },
      { id: 'pt_n10', label: '板块构造理论', discoveredByStudent: true, x: 300, y: 390 },
    ],
    mindMapEdges: [
      { source: 'pt_n1', target: 'pt_n2', label: '线索' },
      { source: 'pt_n2', target: 'pt_n3', label: '魏格纳提出' },
      { source: 'pt_n3', target: 'pt_n4', label: '漂在什么上' },
      { source: 'pt_n4', target: 'pt_n5', label: '地壳=板块' },
      { source: 'pt_n4', target: 'pt_n6', label: '驱动力' },
      { source: 'pt_n7', target: 'pt_n6', label: '类比' },
      { source: 'pt_n6', target: 'pt_n8', label: '表现' },
      { source: 'pt_n9', target: 'pt_n8', label: '证据' },
      { source: 'pt_n5', target: 'pt_n10', label: '整合' },
      { source: 'pt_n8', target: 'pt_n10', label: '整合' },
    ],
  },
];
