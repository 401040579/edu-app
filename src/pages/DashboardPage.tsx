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

const statCards = [
  {
    label: '探索主题',
    value: dashboardStats.totalTopics,
    icon: BookOpen,
    color: '#60A5FA',
  },
  {
    label: '对话轮次',
    value: dashboardStats.totalDialogues,
    icon: MessageCircle,
    color: '#7C5CFC',
  },
  {
    label: '发现概念',
    value: dashboardStats.totalConcepts,
    icon: Lightbulb,
    color: '#F59E0B',
  },
  {
    label: '思维深度',
    value: dashboardStats.thinkingDepth,
    icon: Brain,
    color: '#34D399',
    suffix: '/10',
  },
  {
    label: '连续天数',
    value: dashboardStats.streakDays,
    icon: Flame,
    color: '#FB923C',
    suffix: '天',
  },
  {
    label: '学习时长',
    value: Math.round(dashboardStats.totalMinutes / 60),
    icon: Clock,
    color: '#2DD4BF',
    suffix: '小时',
  },
];

export default function DashboardPage() {
  const navigate = useNavigate();
  const maxScore = Math.max(...depthTrend.map((d) => d.score));
  const earnedBadges = achievements.filter((a) => a.earned);

  return (
    <div className="pb-24 px-4 max-w-4xl mx-auto">
      {/* Header */}
      <div className="pt-8 pb-6">
        <h1 className="text-2xl font-bold mb-1">学习仪表盘</h1>
        <p className="text-muted text-sm">你的思维成长一目了然</p>
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
          <h2 className="text-lg font-semibold">思维深度趋势</h2>
        </div>
        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="flex items-end gap-3 h-40">
            {depthTrend.map((d, i) => {
              const height = (d.score / maxScore) * 100;
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
                  <span className="text-xs text-muted">{d.day}</span>
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
            <h2 className="text-lg font-semibold">成就徽章</h2>
          </div>
          <button
            onClick={() => navigate('/achievements')}
            className="text-sm text-warm-amber hover:text-warm-amber-light"
          >
            查看全部
          </button>
        </div>
        <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
          {earnedBadges.map((badge) => (
            <motion.div
              key={badge.id}
              whileHover={{ scale: 1.1 }}
              className="flex flex-col items-center gap-2 bg-card border border-warm-amber/20 rounded-2xl p-3"
            >
              <div className="w-10 h-10 rounded-full bg-warm-amber/20 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-warm-amber" />
              </div>
              <span className="text-[10px] text-center text-muted leading-tight">
                {badge.name}
              </span>
            </motion.div>
          ))}
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
          <h3 className="font-semibold">每日思维挑战</h3>
        </div>
        <p className="text-sm text-muted mb-3">
          今天的挑战：为什么音乐能影响情绪？（涉及物理 + 生物 + 心理学）
        </p>
        <span className="text-sm text-warm-amber">开始挑战 →</span>
      </motion.div>
    </div>
  );
}
