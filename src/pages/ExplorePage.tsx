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

const iconMap: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  Calculator,
  Atom,
  FlaskConical,
  Leaf,
  Landmark,
  Globe,
};

export default function ExplorePage() {
  const navigate = useNavigate();
  const startDialogue = useStore((s) => s.startDialogue);

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
        <h1 className="text-2xl font-bold mb-1">探索新知</h1>
        <p className="text-muted text-sm">选择一个学科，或输入你自己的问题</p>
      </div>

      {/* Search */}
      <div className="relative mb-8">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
        <input
          type="text"
          placeholder="今天想探索什么？"
          className="w-full bg-card border border-border rounded-2xl pl-12 pr-4 py-4 text-focus-white placeholder:text-muted focus:outline-none focus:border-warm-amber/50 transition-colors"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              const value = (e.target as HTMLInputElement).value.trim();
              if (value) {
                // Default to the first script as a demo
                const script = allDialogueScripts[0];
                startDialogue(script);
                navigate('/dialogue');
              }
            }
          }}
        />
      </div>

      {/* Subject Grid */}
      <div className="mb-10">
        <h2 className="text-lg font-semibold mb-4">选择学科</h2>
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
                <span className="text-sm">{subject.name}</span>
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
              <h3 className="font-semibold">{subject.name} 推荐话题</h3>
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
                      <span className="text-sm">{topic}</span>
                      {hasScript && (
                        <Sparkles className="w-4 h-4 text-warm-amber shrink-0 mt-0.5" />
                      )}
                    </div>
                    {hasScript && (
                      <span className="text-xs text-warm-amber mt-1 block">
                        可体验完整对话
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
          <h2 className="text-lg font-semibold">热门探索</h2>
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
                <div className="text-sm font-medium">{topic.title}</div>
                <div className="text-xs text-muted mt-0.5">{topic.subject}</div>
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
