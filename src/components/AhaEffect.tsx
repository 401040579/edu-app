import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useI18n } from '../i18n';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  delay: number;
}

export default function AhaEffect({ show, concept }: { show: boolean; concept?: string }) {
  const { t } = useI18n();
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (show) {
      const newParticles: Particle[] = Array.from({ length: 24 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 6 + 3,
        color: ['#F59E0B', '#FBBF24', '#FDE68A', '#7C5CFC', '#34D399'][
          Math.floor(Math.random() * 5)
        ],
        delay: Math.random() * 0.5,
      }));
      setParticles(newParticles);
    }
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 pointer-events-none z-50"
        >
          {/* Particle effects */}
          {particles.map((p) => (
            <motion.div
              key={p.id}
              initial={{
                left: `${p.x}%`,
                top: '50%',
                scale: 0,
                opacity: 1,
              }}
              animate={{
                top: `${p.y - 30}%`,
                scale: [0, 1.5, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 1.5,
                delay: p.delay,
                ease: 'easeOut',
              }}
              className="absolute rounded-full"
              style={{
                width: p.size,
                height: p.size,
                backgroundColor: p.color,
                boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
              }}
            />
          ))}

          {/* Central glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: [0, 0.3, 0],
              scale: [0.5, 1.5, 2],
            }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div
              className="w-64 h-64 rounded-full"
              style={{
                background:
                  'radial-gradient(circle, rgba(245,158,11,0.3) 0%, transparent 70%)',
              }}
            />
          </motion.div>

          {/* Concept label */}
          {concept && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              <div className="bg-deep-blue-light border border-warm-amber/30 rounded-2xl px-8 py-4 glow-amber">
                <div className="text-warm-amber text-sm mb-1">{t('aha.conceptDiscovered')}</div>
                <div className="text-xl font-bold text-focus-white">{concept}</div>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
