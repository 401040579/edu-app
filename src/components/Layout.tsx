import type { ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Compass, Network, BarChart3, Trophy, ArrowLeft, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { useI18n } from '../i18n';

export default function Layout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { t, locale, toggleLocale } = useI18n();
  const isDialogue = location.pathname.startsWith('/dialogue');
  const isMindMap = location.pathname.startsWith('/mindmap');
  const isLanding = location.pathname === '/';
  const hideNav = isDialogue || isMindMap;

  const navItems = [
    { path: '/', icon: Home, label: t('nav.home') },
    { path: '/explore', icon: Compass, label: t('nav.explore') },
    { path: '/knowledge', icon: Network, label: t('nav.graph') },
    { path: '/dashboard', icon: BarChart3, label: t('nav.data') },
    { path: '/achievements', icon: Trophy, label: t('nav.achievements') },
  ];

  return (
    <div className="flex flex-col min-h-dvh">
      {/* Header for dialogue pages */}
      {(isDialogue || isMindMap) && (
        <header className="sticky top-0 z-50 glass px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-lg hover:bg-deep-blue-lighter transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="text-sm text-muted flex-1">
            {isDialogue ? t('nav.socraticDialogue') : t('nav.mindDiscoveryMap')}
          </span>
          <button
            onClick={toggleLocale}
            className="flex items-center gap-1 text-xs text-muted hover:text-focus-white border border-border rounded-full px-2.5 py-1 transition-colors"
          >
            <Globe className="w-3 h-3" />
            {locale === 'en' ? 'CN' : 'EN'}
          </button>
        </header>
      )}

      {/* Main content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Bottom navigation - hide on landing, dialogue, mindmap */}
      {!hideNav && !isLanding && (
        <nav className="sticky bottom-0 z-50 glass border-t border-border">
          <div className="max-w-lg mx-auto flex justify-around py-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-lg transition-colors ${
                    isActive
                      ? 'text-warm-amber'
                      : 'text-muted hover:text-focus-white'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="text-xs">{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-0 w-8 h-0.5 bg-warm-amber rounded-full"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </nav>
      )}
    </div>
  );
}
