import { motion } from 'framer-motion';
import { Trophy, Lock, Check } from 'lucide-react';
import { achievements } from '../data/mockData';

const categoryLabels: Record<string, string> = {
  thinking: '思维品质',
  exploration: '探索精神',
  milestone: '里程碑',
};

const categoryColors: Record<string, string> = {
  thinking: '#7C5CFC',
  exploration: '#F59E0B',
  milestone: '#34D399',
};

export default function AchievementsPage() {
  const earned = achievements.filter((a) => a.earned).length;
  const total = achievements.length;
  const categories = ['thinking', 'exploration', 'milestone'] as const;

  return (
    <div className="pb-24 px-4 max-w-4xl mx-auto">
      {/* Header */}
      <div className="pt-8 pb-6">
        <h1 className="text-2xl font-bold mb-1">成就系统</h1>
        <p className="text-muted text-sm">
          已获得 {earned}/{total} 个成就
        </p>

        {/* Overall progress */}
        <div className="mt-4 bg-card border border-border rounded-2xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted">总进度</span>
            <span className="text-sm font-medium">
              {Math.round((earned / total) * 100)}%
            </span>
          </div>
          <div className="h-2 bg-deep-blue-lighter rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(earned / total) * 100}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-warm-amber to-warm-amber-light rounded-full"
            />
          </div>
        </div>
      </div>

      {/* Achievement categories */}
      {categories.map((category) => {
        const categoryAchievements = achievements.filter(
          (a) => a.category === category
        );
        const color = categoryColors[category];

        return (
          <div key={category} className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: color }}
              />
              <h2 className="text-lg font-semibold">{categoryLabels[category]}</h2>
            </div>

            <div className="space-y-3">
              {categoryAchievements.map((achievement, i) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`bg-card border rounded-2xl p-4 ${
                    achievement.earned
                      ? 'border-warm-amber/30'
                      : 'border-border opacity-70'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                        achievement.earned
                          ? 'bg-warm-amber/20'
                          : 'bg-deep-blue-lighter'
                      }`}
                    >
                      {achievement.earned ? (
                        <Trophy
                          className="w-6 h-6"
                          style={{ color }}
                        />
                      ) : (
                        <Lock className="w-5 h-5 text-muted" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <h3 className="font-semibold text-sm">
                          {achievement.name}
                        </h3>
                        {achievement.earned && (
                          <Check className="w-4 h-4 text-growth-green" />
                        )}
                      </div>
                      <p className="text-xs text-muted mb-1">
                        {achievement.description}
                      </p>
                      <p className="text-xs text-muted/60">
                        {achievement.condition}
                      </p>

                      {/* Progress bar for unearned */}
                      {!achievement.earned &&
                        achievement.progress !== undefined &&
                        achievement.maxProgress !== undefined && (
                          <div className="mt-2">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs text-muted">
                                进度
                              </span>
                              <span className="text-xs text-muted">
                                {achievement.progress}/{achievement.maxProgress}
                              </span>
                            </div>
                            <div className="h-1.5 bg-deep-blue-lighter rounded-full overflow-hidden">
                              <div
                                className="h-full rounded-full transition-all"
                                style={{
                                  width: `${
                                    (achievement.progress /
                                      achievement.maxProgress) *
                                    100
                                  }%`,
                                  backgroundColor: color,
                                }}
                              />
                            </div>
                          </div>
                        )}

                      {/* Earned date */}
                      {achievement.earned && achievement.earnedDate && (
                        <p className="text-xs text-warm-amber/60 mt-1">
                          获得于 {achievement.earnedDate}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
