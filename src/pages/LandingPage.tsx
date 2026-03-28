import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Brain,
  MessageCircle,
  Network,
  ChevronRight,
  Check,
  X,
  ArrowRight,
  Star,
  Globe,
} from 'lucide-react';
import { useI18n } from '../i18n';

// Demo conversation kept in Chinese (educational content)
const demoConversation = [
  { speaker: 'user', text: '为什么月亮不会掉下来？' },
  { speaker: 'ai', text: '好问题！你觉得月亮在天上是静止的，还是在做某种运动？' },
  { speaker: 'user', text: '月亮在绕地球转。' },
  { speaker: 'ai', text: '对！那想想你骑车转弯时——是什么让你能转弯而不是走直线？' },
  { speaker: 'user', text: '要有个力把我拉向弯道内侧？' },
  {
    speaker: 'ai',
    text: '太棒了！这种指向圆心的力叫"向心力"。那月亮绕地球转需要的向心力，由什么提供？',
  },
  { speaker: 'user', text: '地球的引力！所以引力就是月亮的向心力！' },
  {
    speaker: 'ai',
    text: '你自己推导出来了！🌟 月亮不会掉，是因为引力恰好充当了向心力，让它沿轨道运行。',
  },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const { t, locale, toggleLocale, translations } = useI18n();

  const features = [
    {
      icon: MessageCircle,
      title: t('landing.featureSocratic'),
      desc: t('landing.featureSocraticDesc'),
      color: 'text-warm-amber',
    },
    {
      icon: Brain,
      title: t('landing.featureMindMap'),
      desc: t('landing.featureMindMapDesc'),
      color: 'text-wisdom-purple',
    },
    {
      icon: Network,
      title: t('landing.featureKnowledgeGraph'),
      desc: t('landing.featureKnowledgeGraphDesc'),
      color: 'text-growth-green',
    },
  ];

  const comparisonData = translations.landing.comparisonFeatures;
  const plans = translations.landing.plans;

  return (
    <div className="min-h-dvh">
      {/* Language Switcher - floating top right */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={toggleLocale}
          className="flex items-center gap-1.5 bg-deep-blue-light border border-border rounded-full px-3 py-1.5 text-sm text-muted hover:text-focus-white transition-colors"
        >
          <Globe className="w-3.5 h-3.5" />
          {locale === 'en' ? '中文' : 'EN'}
        </button>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 pt-16 pb-20">
        {/* Background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-warm-amber/5 blur-[120px]" />
        <div className="absolute top-40 right-0 w-[400px] h-[400px] rounded-full bg-wisdom-purple/5 blur-[100px]" />

        <div className="relative max-w-4xl mx-auto text-center">
          {/* Logo / Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-deep-blue-light border border-border rounded-full px-4 py-2 mb-8">
              <Sparkles className="w-4 h-4 text-warm-amber" />
              <span className="text-sm text-muted">{t('landing.badge')}</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-2">
              <span className="text-gradient">{t('landing.heroTitle')}</span>
            </h1>
            <p className="text-lg text-muted mb-4">{t('landing.heroSubtitle')}</p>
            <h2 className="text-2xl md:text-3xl font-medium text-focus-white mb-6">
              {t('landing.heroHeadline')}
            </h2>
            <p className="text-lg text-muted max-w-2xl mx-auto mb-10 whitespace-pre-line">
              {t('landing.heroDescription')}
            </p>

            <button
              onClick={() => navigate('/explore')}
              className="inline-flex items-center gap-2 bg-warm-amber hover:bg-warm-amber-light text-deep-blue font-semibold px-8 py-4 rounded-2xl text-lg transition-all glow-amber hover:scale-105"
            >
              {t('landing.ctaButton')}
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Core Features */}
      <section className="px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-card border border-border rounded-2xl p-6 hover:border-warm-amber/20 transition-colors"
              >
                <feature.icon className={`w-10 h-10 ${feature.color} mb-4`} />
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Conversation */}
      <section className="px-6 py-16 bg-deep-blue-light/50">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-center mb-2">
              {t('landing.demoTitle')}
            </h2>
            <p className="text-muted text-center mb-10">
              {t('landing.demoSubtitle')}
            </p>
          </motion.div>

          <div className="space-y-4">
            {demoConversation.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: msg.speaker === 'user' ? 20 : -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className={`flex ${msg.speaker === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-5 py-3 ${
                    msg.speaker === 'user'
                      ? 'bg-wisdom-purple/20 border border-wisdom-purple/30 text-focus-white'
                      : 'bg-card border border-border text-focus-white'
                  }`}
                >
                  {msg.speaker === 'ai' && (
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-warm-amber" />
                      <span className="text-xs text-warm-amber">{t('common.brandName')}</span>
                    </div>
                  )}
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button
              onClick={() => navigate('/explore')}
              className="inline-flex items-center gap-2 text-warm-amber hover:text-warm-amber-light transition-colors"
            >
              {t('landing.demoCtaLink')}
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-2">
            {t('landing.comparisonTitle')}
          </h2>
          <p className="text-muted text-center mb-10">
            {t('landing.comparisonSubtitle')}
          </p>

          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="grid grid-cols-3 border-b border-border">
              <div className="p-4 text-sm text-muted"></div>
              <div className="p-4 text-sm text-center text-muted border-x border-border">
                {t('landing.comparisonTraditional')}
              </div>
              <div className="p-4 text-sm text-center text-warm-amber font-medium">
                {t('landing.comparisonEduApp')}
              </div>
            </div>
            {comparisonData.map((row, i) => (
              <div
                key={i}
                className="grid grid-cols-3 border-b border-border last:border-0"
              >
                <div className="p-4 text-sm">{row.feature}</div>
                <div className="p-4 text-sm text-center text-muted border-x border-border flex items-center justify-center gap-2">
                  <X className="w-4 h-4 text-danger shrink-0" />
                  <span>{row.traditional}</span>
                </div>
                <div className="p-4 text-sm text-center flex items-center justify-center gap-2">
                  <Check className="w-4 h-4 text-growth-green shrink-0" />
                  <span>{row.eduapp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="px-6 py-16 bg-deep-blue-light/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-2">{t('landing.pricingTitle')}</h2>
          <p className="text-muted text-center mb-10">
            {t('landing.pricingSubtitle')}
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan, idx) => {
              const highlighted = idx === 1;
              return (
                <motion.div
                  key={plan.name}
                  whileHover={{ y: -4 }}
                  className={`rounded-2xl p-6 ${
                    highlighted
                      ? 'bg-card border-2 border-warm-amber glow-amber'
                      : 'bg-card border border-border'
                  }`}
                >
                  {highlighted && (
                    <div className="flex items-center gap-1 text-warm-amber text-xs font-medium mb-3">
                      <Star className="w-3 h-3" />
                      {t('landing.mostPopular')}
                    </div>
                  )}
                  <h3 className="text-lg font-semibold mb-1">{plan.name}</h3>
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <span className="text-sm text-muted">{plan.period}</span>
                  </div>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm">
                        <Check className="w-4 h-4 text-growth-green shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => navigate('/explore')}
                    className={`w-full py-3 rounded-xl font-medium transition-colors ${
                      highlighted
                        ? 'bg-warm-amber text-deep-blue hover:bg-warm-amber-light'
                        : 'bg-deep-blue-lighter text-focus-white hover:bg-deep-blue-light border border-border'
                    }`}
                  >
                    {idx === 0
                      ? t('landing.freeExperience')
                      : t('landing.startTrial')}
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            {t('landing.ctaTitle_1')}
            <span className="text-gradient">{t('landing.ctaTitle_highlight')}</span>
            {t('landing.ctaTitle_2')}
          </h2>
          <p className="text-muted mb-8">
            {t('landing.ctaDescription')}
          </p>
          <button
            onClick={() => navigate('/explore')}
            className="inline-flex items-center gap-2 bg-warm-amber hover:bg-warm-amber-light text-deep-blue font-semibold px-8 py-4 rounded-2xl text-lg transition-all glow-amber hover:scale-105"
          >
            {t('landing.ctaButtonBottom')}
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-6 py-8">
        <div className="max-w-4xl mx-auto text-center text-sm text-muted">
          <p>{t('landing.footerLine1')}</p>
          <p className="mt-1">{t('landing.footerLine2')}</p>
        </div>
      </footer>
    </div>
  );
}
