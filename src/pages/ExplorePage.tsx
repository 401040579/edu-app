import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Calculator,
  Atom,
  FlaskConical,
  Leaf,
  Landmark,
  Globe,
  Search,
  TrendingUp,
  Users,
  Sparkles,
} from 'lucide-react';
import { subjects, hotTopics, allDialogueScripts } from '../data/dialogues';
import { useStore } from '../store/useStore';
import { useI18n } from '../i18n';

const iconMap: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  Calculator,
  Atom,
  FlaskConical,
  Leaf,
  Landmark,
  Globe,
};

// Topic ID mapping: subject-id + topic index -> translation key
const topicIdMap: Record<string, Record<string, string>> = {
  math: {
    '为什么0.999...等于1？': 'math-t-1',
    '负数相乘为什么得正数？': 'math-t-2',
    '勾股定理是怎么来的？': 'math-t-3',
    '概率为什么反直觉？': 'math-t-4',
    '为什么不能除以零？': 'math-t-5',
  },
  physics: {
    '为什么月亮不会掉下来？': 'physics-t-1',
    '为什么天是蓝色的？': 'physics-t-2',
    '为什么冰会浮在水面上？': 'physics-t-3',
    '为什么飞机能飞起来？': 'physics-t-4',
    '光是波还是粒子？': 'physics-t-5',
  },
  chemistry: {
    '为什么铁会生锈？': 'chemistry-t-1',
    '水为什么能灭火？': 'chemistry-t-2',
    '化学反应为什么有快有慢？': 'chemistry-t-3',
  },
  biology: {
    '为什么我们会做梦？': 'biology-t-1',
    'DNA如何决定我们的样子？': 'biology-t-2',
    '为什么要睡觉？': 'biology-t-3',
    '细胞如何"知道"该做什么？': 'biology-t-4',
  },
  history: {
    '为什么罗马帝国会衰落？': 'history-t-1',
    '丝绸之路改变了什么？': 'history-t-2',
    '文艺复兴为什么发生在意大利？': 'history-t-3',
    '工业革命为什么发生在英国？': 'history-t-4',
    '印刷术如何改变世界？': 'history-t-5',
  },
  geography: {
    '为什么会有四季？': 'geography-t-1',
    '沙漠是怎么形成的？': 'geography-t-2',
    '为什么地球板块会移动？': 'geography-t-3',
  },
};

export default function ExplorePage() {
  const navigate = useNavigate();
  const startDialogue = useStore((s) => s.startDialogue);
  const { t } = useI18n();

  const getSubjectName = (subject: typeof subjects[number]) => {
    return t(`subjects.${subject.id}`);
  };

  const getTopicText = (subjectId: string, topicZh: string) => {
    const topicKey = topicIdMap[subjectId]?.[topicZh];
    if (topicKey) return t(`topics.${topicKey}`);
    return topicZh;
  };

  const getHotTopicTitle = (topicId: string | undefined, titleZh: string) => {
    if (topicId) {
      const translated = t(`hotTopics.${topicId}`);
      if (translated !== `hotTopics.${topicId}`) return translated;
    }
    return titleZh;
  };

  const getHotTopicSubject = (subjectZh: string) => {
    const subjectMap: Record<string, string> = {
      '物理': 'physics',
      '数学': 'math',
      '历史': 'history',
      '化学': 'chemistry',
      '生物': 'biology',
      '地理': 'geography',
    };
    const key = subjectMap[subjectZh];
    if (key) return t(`subjects.${key}`);
    return subjectZh;
  };

  const handleTopicClick = (topic: string) => {
    const script = allDialogueScripts.find((s) => s.question === topic);
    if (script) {
      startDialogue(script);
      navigate('/dialogue');
    }
  };

  const handleHotTopicClick = (topicId?: string) => {
    if (topicId) {
      const script = allDialogueScripts.find((s) => s.id === topicId);
      if (script) {
        startDialogue(script);
        navigate('/dialogue');
      }
    }
  };

  return (
    <div className="pb-24 px-4 max-w-4xl mx-auto">
      {/* Header */}
      <div className="pt-8 pb-6">
        <h1 className="text-2xl font-bold mb-1">{t('explore.title')}</h1>
        <p className="text-muted text-sm">{t('explore.subtitle')}</p>
      </div>

      {/* Search */}
      <div className="relative mb-8">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
        <input
          type="text"
          placeholder={t('explore.searchPlaceholder')}
          className="w-full bg-card border border-border rounded-2xl pl-12 pr-4 py-4 text-focus-white placeholder:text-muted focus:outline-none focus:border-warm-amber/50 transition-colors"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              const value = (e.target as HTMLInputElement).value.trim();
              if (value) {
                // Check if a scripted dialogue matches
                const script = allDialogueScripts.find((s) => s.question === value);
                if (script) {
                  startDialogue(script);
                  navigate('/dialogue');
                } else {
                  // Use AI mode for free-form topics
                  const subjectLabel = t('explore.generalSubject');
                  navigate(`/dialogue?ai=1&topic=${encodeURIComponent(value)}&subject=${encodeURIComponent(subjectLabel)}`);
                }
              }
            }
          }}
        />
      </div>

      {/* Subject Grid */}
      <div className="mb-10">
        <h2 className="text-lg font-semibold mb-4">{t('explore.selectSubject')}</h2>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {subjects.map((subject, i) => {
            const Icon = iconMap[subject.icon] || Globe;
            return (
              <motion.button
                key={subject.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className="flex flex-col items-center gap-2 bg-card border border-border rounded-2xl p-4 hover:border-warm-amber/30 transition-all hover:scale-105"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: subject.color + '20' }}
                >
                  <Icon className="w-6 h-6" style={{ color: subject.color }} />
                </div>
                <span className="text-sm">{getSubjectName(subject)}</span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Recommended Topics */}
      {subjects.slice(0, 3).map((subject) => {
        const Icon = iconMap[subject.icon] || Globe;
        return (
          <div key={subject.id} className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <Icon className="w-5 h-5" style={{ color: subject.color }} />
              <h3 className="font-semibold">{getSubjectName(subject)} {t('explore.recommendedTopics')}</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              {subject.topics.map((topic) => {
                const hasScript = allDialogueScripts.some((s) => s.question === topic);
                return (
                  <motion.button
                    key={topic}
                    whileHover={{ x: 4 }}
                    onClick={() => handleTopicClick(topic)}
                    className={`text-left bg-card border border-border rounded-xl p-4 transition-colors ${
                      hasScript
                        ? 'hover:border-warm-amber/30 cursor-pointer'
                        : 'opacity-60 cursor-default'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-sm">{getTopicText(subject.id, topic)}</span>
                      {hasScript && (
                        <Sparkles className="w-4 h-4 text-warm-amber shrink-0 mt-0.5" />
                      )}
                    </div>
                    {hasScript && (
                      <span className="text-xs text-warm-amber mt-1 block">
                        {t('explore.fullDialogueAvailable')}
                      </span>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* Hot Topics */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-warm-amber" />
          <h2 className="text-lg font-semibold">{t('explore.hotExplore')}</h2>
        </div>
        <div className="space-y-2">
          {hotTopics.map((topic, i) => (
            <motion.button
              key={topic.title}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => handleHotTopicClick(topic.id)}
              className={`w-full flex items-center gap-4 bg-card border border-border rounded-xl p-4 text-left transition-colors ${
                topic.id
                  ? 'hover:border-warm-amber/30 cursor-pointer'
                  : 'opacity-70 cursor-default'
              }`}
            >
              <span className="text-xl font-bold text-muted w-8">
                {i + 1}
              </span>
              <div className="flex-1">
                <div className="text-sm font-medium">{getHotTopicTitle(topic.id, topic.title)}</div>
                <div className="text-xs text-muted mt-0.5">{getHotTopicSubject(topic.subject)}</div>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted">
                <Users className="w-3.5 h-3.5" />
                {topic.participants.toLocaleString()}
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
