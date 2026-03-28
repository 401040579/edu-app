import { motion } from 'framer-motion';
import {
  BookOpen,
  MessageCircle,
  Lightbulb,
  Brain,
  Flame,
  Clock,
  TrendingUp,
  Trophy,
  Sparkles,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { dashboardStats, depthTrend, achievements } from '../data/mockData';
import { useI18n } from '../i18n';

export default function DashboardPage() {
  const navigate = useNavigate();
  const { t, translations } = useI18n();
  const maxScore = Math.max(...depthTrend.map((d) => d.score));
  const earnedBadges = achievements.filter((a) => a.earned);

  const dayKeys = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'] as const;

  const statCards = [
    {
      label: t('dashboard.stats.totalTopics'),
      value: dashboardStats.totalTopics,
      icon: BookOpen,
      color: '#60A5FA',
    },
    {
      label: t('dashboard.stats.totalDialogues'),
      value: dashboardStats.totalDialogues,
      icon: MessageCircle,
      color: '#7C5CFC',
    },
    {
      label: t('dashboard.stats.totalConcepts'),
      value: dashboardStats.totalConcepts,
      icon: Lightbulb,
      color: '#F59E0B',
    },
    {
      label: t('dashboard.stats.thinkingDepth'),
      value: dashboardStats.thinkingDepth,
      icon: Brain,
      color: '#34D399',
      suffix: '/10',
    },
    {
      label: t('dashboard.stats.streakDays'),
      value: dashboardStats.streakDays,
      icon: Flame,
      color: '#FB923C',
      suffix: t('dashboard.suffixDays'),
    },
    {
      label: t('dashboard.stats.totalMinutes'),
      value: Math.round(dashboardStats.totalMinutes / 60),
      icon: Clock,
      color: '#2DD4BF',
      suffix: t('dashboard.suffixHours'),
    },
  ];

  return (
    <div className="pb-24 px-4 max-w-4xl mx-auto">
      {/* Header */}
      <div className="pt-8 pb-6">
        <h1 className="text-2xl font-bold mb-1">{t('dashboard.title')}</h1>
        <p className="text-muted text-sm">{t('dashboard.subtitle')}</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
        {statCards.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-card border border-border rounded-2xl p-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <stat.icon className="w-4 h-4" style={{ color: stat.color }} />
              <span className="text-xs text-muted">{stat.label}</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold">{stat.value}</span>
              {stat.suffix && (
                <span className="text-sm text-muted">{stat.suffix}</span>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Depth Trend Chart */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-warm-amber" />
          <h2 className="text-lg font-semibold">{t('dashboard.depthTrend')}</h2>
        </div>
        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="flex items-end gap-3 h-40">
            {depthTrend.map((d, i) => {
              const height = (d.score / maxScore) * 100;
              const dayKey = dayKeys[i];
              return (
                <motion.div
                  key={d.day}
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="flex-1 flex flex-col items-center gap-2"
                >
                  <span className="text-xs text-muted">{d.score}</span>
                  <div
                    className="w-full rounded-t-lg transition-all"
                    style={{
                      height: `${height}%`,
                      background: `linear-gradient(to top, #F59E0B, #FBBF24)`,
                      minHeight: 4,
                    }}
                  />
                  <span className="text-xs text-muted">{t(`dashboard.days.${dayKey}`)}</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Achievement Badges */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-warm-amber" />
            <h2 className="text-lg font-semibold">{t('dashboard.achievementBadges')}</h2>
          </div>
          <button
            onClick={() => navigate('/achievements')}
            className="text-sm text-warm-amber hover:text-warm-amber-light"
          >
            {t('common.viewAll')}
          </button>
        </div>
        <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
          {earnedBadges.map((badge) => {
            const itemKey = badge.id as keyof typeof translations.achievements.items;
            const translatedName = translations.achievements.items[itemKey]?.name || badge.name;
            return (
              <motion.div
                key={badge.id}
                whileHover={{ scale: 1.1 }}
                className="flex flex-col items-center gap-2 bg-card border border-warm-amber/20 rounded-2xl p-3"
              >
                <div className="w-10 h-10 rounded-full bg-warm-amber/20 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-warm-amber" />
                </div>
                <span className="text-[10px] text-center text-muted leading-tight">
                  {translatedName}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Daily Challenge */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        onClick={() => navigate('/explore')}
        className="bg-gradient-to-r from-wisdom-purple/20 to-warm-amber/20 border border-wisdom-purple/30 rounded-2xl p-6 cursor-pointer"
      >
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-5 h-5 text-warm-amber" />
          <h3 className="font-semibold">{t('dashboard.dailyChallenge')}</h3>
        </div>
        <p className="text-sm text-muted mb-3">
          {t('dashboard.dailyChallengeDesc')}
        </p>
        <span className="text-sm text-warm-amber">{t('common.startChallenge')} →</span>
      </motion.div>
    </div>
  );
}
