const en = {
  // ─── Common ─────────────────────────────────────────
  common: {
    appName: 'EduApp',
    brandName: 'ThinkBuddy',
    tagline: 'AI Socratic Learning Companion',
    slogan: "Don't give answers, give you the superpower of thinking",
    back: 'Back',
    share: 'Share',
    viewAll: 'View all',
    startChallenge: 'Start challenge',
    continueExplore: 'Continue exploring',
    progress: 'Progress',
    all: 'All',
  },

  // ─── Navigation ─────────────────────────────────────
  nav: {
    home: 'Home',
    explore: 'Explore',
    graph: 'Graph',
    data: 'Data',
    achievements: 'Achieve',
    socraticDialogue: 'Socratic Dialogue',
    mindDiscoveryMap: 'Mind Discovery Map',
  },

  // ─── Landing Page ───────────────────────────────────
  landing: {
    badge: 'AI Socratic Learning Companion',
    heroTitle: 'ThinkBuddy',
    heroSubtitle: 'EduApp',
    heroHeadline: "Don't give answers, give you the superpower of thinking",
    heroDescription:
      "In the AI era, the most valuable ability is not getting answers, but asking good questions.\nThinkBuddy guides you to discover answers yourself through Socratic dialogue, building real thinking skills.",
    ctaButton: 'Start your thinking journey',

    // Core features
    featureSocratic: 'Socratic Dialogue',
    featureSocraticDesc:
      'Never gives direct answers; guides you to discover truth through questions',
    featureMindMap: 'Mind Discovery Map',
    featureMindMapDesc:
      'Visualize your thinking paths, see your intellectual growth',
    featureKnowledgeGraph: 'Knowledge Graph',
    featureKnowledgeGraphDesc:
      'Explored knowledge forms a network, see your knowledge universe',

    // Demo conversation
    demoTitle: 'Experience Socratic Dialogue',
    demoSubtitle:
      "See how ThinkBuddy guides students to discover the mystery of gravity",
    demoCtaLink: 'Experience the full dialogue yourself',

    // Comparison table
    comparisonTitle: 'Difference from traditional AI education',
    comparisonSubtitle:
      'Most AI education products help you get answers; ThinkBuddy helps you learn to think',
    comparisonTraditional: 'Traditional AI Education',
    comparisonEduApp: 'ThinkBuddy EduApp',
    comparisonFeatures: [
      {
        feature: 'When a student asks a question',
        traditional: 'Gives the answer directly',
        eduapp: 'Uses questions to guide self-discovery',
      },
      {
        feature: 'Learning process',
        traditional: 'Passively receiving information',
        eduapp: 'Actively exploring and constructing knowledge',
      },
      {
        feature: 'Thinking ability',
        traditional: 'Memorize answers',
        eduapp: 'Learn how to think',
      },
      {
        feature: 'Learning records',
        traditional: 'Number of exercises / accuracy',
        eduapp: 'Mind maps / Knowledge graphs',
      },
      {
        feature: 'Learning motivation',
        traditional: 'Scores and rankings',
        eduapp: 'Joy of discovery and visible growth',
      },
    ],

    // Pricing
    pricingTitle: 'Choose your thinking journey',
    pricingSubtitle: 'Start free, upgrade anytime to unlock more features',
    mostPopular: 'Most Popular',
    freeExperience: 'Free trial',
    startTrial: 'Start trial',
    plans: [
      {
        name: 'Free',
        price: '$0',
        period: '',
        features: [
          '3 dialogues per day',
          'Basic subjects (Math, Physics, Chemistry)',
          'Basic mind map',
        ],
      },
      {
        name: 'Explorer',
        price: '$3.99',
        period: '/mo',
        features: [
          'Unlimited dialogues',
          'All subjects',
          'Complete knowledge graph',
          'Learning data analytics',
          'AI companion personality selection',
        ],
      },
      {
        name: 'Family',
        price: '$6.99',
        period: '/mo',
        features: [
          'Up to 3 child accounts',
          'Parent learning reports',
          'Parent-child exploration mode',
          'All Explorer features',
        ],
      },
    ],

    // CTA
    ctaTitle_1: 'Ready to start your',
    ctaTitle_highlight: ' thinking journey',
    ctaTitle_2: '?',
    ctaDescription:
      '2400 years ago, Socrates changed the world with questions. Today, let an AI companion change your learning the same way.',
    ctaButtonBottom: 'Start your thinking journey',

    // Footer
    footerLine1: 'ThinkBuddy EduApp -- AI Socratic Learning Companion',
    footerLine2: "Don't give answers, give you the superpower of thinking",
  },

  // ─── Explore Page ───────────────────────────────────
  explore: {
    title: 'Explore New Knowledge',
    subtitle: 'Choose a subject, or enter your own question',
    searchPlaceholder: 'What do you want to explore today?',
    selectSubject: 'Select a subject',
    recommendedTopics: 'Recommended topics',
    fullDialogueAvailable: 'Full dialogue available',
    hotExplore: 'Trending Explorations',
    generalSubject: 'General',
  },

  // ─── Subjects ───────────────────────────────────────
  subjects: {
    math: 'Math',
    physics: 'Physics',
    chemistry: 'Chemistry',
    biology: 'Biology',
    history: 'History',
    geography: 'Geography',
  },

  // ─── Topics (by id) ────────────────────────────────
  topics: {
    // Math
    'math-t-1': "Why does 0.999... equal 1?",
    'math-t-2': 'Why does multiplying negatives give a positive?',
    'math-t-3': 'How was the Pythagorean theorem derived?',
    'math-t-4': 'Why is probability counterintuitive?',
    'math-t-5': "Why can't you divide by zero?",
    // Physics
    'physics-t-1': "Why doesn't the moon fall down?",
    'physics-t-2': 'Why is the sky blue?',
    'physics-t-3': 'Why does ice float on water?',
    'physics-t-4': 'Why can airplanes fly?',
    'physics-t-5': 'Is light a wave or a particle?',
    // Chemistry
    'chemistry-t-1': 'Why does iron rust?',
    'chemistry-t-2': 'Why can water put out fire?',
    'chemistry-t-3': 'Why do chemical reactions have different speeds?',
    // Biology
    'biology-t-1': 'Why do we dream?',
    'biology-t-2': 'How does DNA determine what we look like?',
    'biology-t-3': 'Why do we need to sleep?',
    'biology-t-4': 'How does a cell "know" what to do?',
    // History
    'history-t-1': 'Why did the Roman Empire decline?',
    'history-t-2': 'What did the Silk Road change?',
    'history-t-3': 'Why did the Renaissance happen in Italy?',
    'history-t-4': 'Why did the Industrial Revolution happen in Britain?',
    'history-t-5': 'How did printing change the world?',
    // Geography
    'geography-t-1': 'Why are there four seasons?',
    'geography-t-2': 'How are deserts formed?',
    'geography-t-3': "Why do the Earth's tectonic plates move?",
  },

  // ─── Hot topics (by id) ─────────────────────────────
  hotTopics: {
    'physics-moon': "Why doesn't the moon fall down?",
    'math-infinity': 'Why does 0.999... equal 1?',
    'history-rome': 'Why did the Roman Empire decline?',
    'physics-blue-sky': 'Why is the sky blue?',
    'bio-dna': 'How does DNA determine what we look like?',
    'chem-rust': 'Why does iron rust?',
    'math-probability': 'Why is probability counterintuitive?',
    'history-printing': 'How did printing change the world?',
    'physics-airplane': 'Why can airplanes fly?',
    'bio-dreams': 'Why do we dream?',
    'geo-seasons': 'Why are there four seasons?',
    'chem-water-fire': 'Why can water put out fire?',
  },

  // ─── Dialogue Page ──────────────────────────────────
  dialogue: {
    phases: {
      exploration: 'Exploration',
      scaffolding: 'Scaffolding',
      guided_discovery: 'Discovery',
      consolidation: 'Consolidation',
      reflection: 'Reflection',
    },
    discoveredConcepts: 'Discovered {count} concepts',
    discoveredConceptsOf: 'Discovered {count}/{total} concepts',
    aiMode: 'AI Mode',
    switchToAiMode: 'Switch to real AI mode',
    aiLabel: 'ThinkBuddy AI',
    scriptLabel: 'ThinkBuddy',
    discovered: 'Discovered:',
    hintLabel: 'Hint',
    hintLabelN: 'Hint {level}/3',
    giveHint: 'Give me a hint',
    moreHint: 'One more hint',
    lastHint: 'Last hint',
    inputPlaceholder: 'Enter your thoughts...',
    aiThinking: 'ThinkBuddy is thinking...',
    endSession: 'End this dialogue',
    dialogueComplete: 'Dialogue complete! You discovered {count} concepts',
    viewMindMap: 'View mind discovery map',
    aiError: 'Cannot connect to AI service, please check your network',
    freeExplore: 'Free exploration',
  },

  // ─── Mind Map Page ──────────────────────────────────
  mindmap: {
    title: 'Mind Discovery Map',
    yourDiscovery: 'Your discoveries',
    aiGuided: 'AI guided',
    shareTitle: 'My Mind Map - {title}',
    shareText: 'Through Socratic dialogue, I discovered {count} concepts myself!',
    shareCopied: 'Mind map link copied to clipboard!',
    notFound: 'No matching dialogue record found',
  },

  // ─── Knowledge Graph Page ───────────────────────────
  knowledgeGraph: {
    title: 'My Knowledge Universe',
    stats: 'Explored {concepts} concepts | Average mastery {mastery}%',
    legendSize: 'Node size = mastery depth',
    legendCross: 'Cross-subject connection',
  },

  // ─── Dashboard Page ─────────────────────────────────
  dashboard: {
    title: 'Learning Dashboard',
    subtitle: 'Your thinking growth at a glance',
    stats: {
      totalTopics: 'Topics explored',
      totalDialogues: 'Dialogue rounds',
      totalConcepts: 'Concepts discovered',
      thinkingDepth: 'Thinking depth',
      streakDays: 'Streak days',
      totalMinutes: 'Learning time',
    },
    suffixDays: 'days',
    suffixHours: 'hours',
    depthTrend: 'Thinking Depth Trend',
    achievementBadges: 'Achievement Badges',
    dailyChallenge: 'Daily Thinking Challenge',
    dailyChallengeDesc:
      "Today's challenge: Why can music affect emotions? (Involves Physics + Biology + Psychology)",
    days: {
      mon: 'Mon',
      tue: 'Tue',
      wed: 'Wed',
      thu: 'Thu',
      fri: 'Fri',
      sat: 'Sat',
      sun: 'Sun',
    },
  },

  // ─── Achievements Page ──────────────────────────────
  achievements: {
    title: 'Achievement System',
    earned: 'Earned {earned}/{total} achievements',
    overallProgress: 'Overall progress',
    categories: {
      thinking: 'Thinking Quality',
      exploration: 'Exploration Spirit',
      milestone: 'Milestones',
    },
    earnedOn: 'Earned on {date}',
    items: {
      'deep-thinker': {
        name: 'Deep Thinker',
        description: 'Independently derived 3+ concepts in a single dialogue',
        condition: 'Derive 3+ concepts independently in one dialogue',
      },
      'curious-explorer': {
        name: 'Curious Explorer',
        description: 'Explored 5 different subjects',
        condition: 'Explore 5 different subjects',
      },
      'streak-thinker': {
        name: 'Streak Thinker',
        description: 'Studied 7 consecutive days',
        condition: '7 consecutive days of learning dialogues',
      },
      'first-discovery': {
        name: 'First Discovery',
        description: 'Completed first concept discovery',
        condition: 'Complete first concept discovery',
      },
      'self-corrector': {
        name: 'Self Corrector',
        description: 'Proactively found and corrected own reasoning errors',
        condition: 'Proactively correct 5 reasoning errors',
      },
      questioner: {
        name: 'Questioner',
        description: 'Asked 10 high-quality questions to the AI',
        condition: 'Ask 10 high-quality questions to the AI',
      },
      'knowledge-pioneer': {
        name: 'Knowledge Pioneer',
        description: 'Knowledge graph reached 100 concept nodes',
        condition: 'Reach 100 concept nodes in knowledge graph',
      },
      'night-philosopher': {
        name: 'Night Philosopher',
        description: 'Completed a deep dialogue after 10 PM',
        condition: 'Complete a deep dialogue after 10 PM',
      },
      'analogy-master': {
        name: 'Analogy Master',
        description: 'Proactively connected concepts from 2 different subjects',
        condition: 'Connect concepts from 2 different subjects',
      },
      'knowledge-network': {
        name: 'Knowledge Network',
        description: 'First cross-subject connection in knowledge graph',
        condition: 'First cross-subject connection in knowledge graph',
      },
      metamorphosis: {
        name: 'Thinking Metamorphosis',
        description:
          'Cognitive level first reached "Evaluation" or "Creation"',
        condition:
          "Bloom's cognitive level first reached \"Evaluation\" or \"Creation\"",
      },
    },
  },

  // ─── AhaEffect ──────────────────────────────────────
  aha: {
    conceptDiscovered: 'Concept discovered!',
  },
};

// Recursive translation type: string leaves and object/array branches
type DeepShape<T> = T extends string
  ? string
  : T extends readonly (infer U)[]
  ? DeepShape<U>[]
  : T extends Record<string, unknown>
  ? { [K in keyof T]: DeepShape<T[K]> }
  : T;

export type Translations = DeepShape<typeof en>;
export default en as Translations;
