import { useEffect, useRef, useState, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, Sparkles, Send, Map, Zap } from 'lucide-react';
import { useStore } from '../store/useStore';
import AhaEffect from '../components/AhaEffect';
import { socraticChat, updateProgress, saveSession } from '../api/client';
import type { ChatMessage } from '../api/client';
import { useI18n } from '../i18n';

const phaseOrder = ['exploration', 'scaffolding', 'guided_discovery', 'consolidation', 'reflection'];

function TypewriterText({ text, onComplete }: { text: string; onComplete?: () => void }) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed('');
    setDone(false);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(interval);
        setDone(true);
        onComplete?.();
      }
    }, 30);
    return () => clearInterval(interval);
  }, [text]);

  return (
    <span>
      {displayed}
      {!done && <span className="inline-block w-0.5 h-4 bg-warm-amber ml-0.5 animate-pulse" />}
    </span>
  );
}

// ─── AI Mode Components ─────────────────────────────

interface AiMessage {
  id: string;
  speaker: 'ai' | 'user';
  content: string;
  conceptDiscovered?: string | null;
  isAha?: boolean;
  phase?: string;
}

function AiModeDialogue({
  subject,
  topic,
  subjectColor,
}: {
  subject: string;
  topic: string;
  subjectColor: string;
}) {
  const navigate = useNavigate();
  const { t, locale } = useI18n();
  const [messages, setMessages] = useState<AiMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [aiTypingComplete, setAiTypingComplete] = useState(true);
  const [showAha, setShowAha] = useState(false);
  const [ahaConcept, setAhaConcept] = useState('');
  const [currentPhase, setCurrentPhase] = useState('exploration');
  const [discoveredConcepts, setDiscoveredConcepts] = useState<string[]>([]);
  const [suggestedHints, setSuggestedHints] = useState<string[] | null>(null);
  const [hintIndex, setHintIndex] = useState(0);
  const [hintText, setHintText] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [sessionId] = useState(() => `session-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentPhaseIndex = phaseOrder.indexOf(currentPhase);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Initial AI greeting
  useEffect(() => {
    const greeting = locale === 'zh'
      ? `学生想探索这个话题：${topic}\n\n请开始引导对话。`
      : `The student wants to explore this topic: ${topic}\n\nPlease begin the guided dialogue.`;
    sendToAi(greeting, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const buildHistory = useCallback((): ChatMessage[] => {
    return messages.map((m) => ({
      speaker: m.speaker,
      content: m.content,
    }));
  }, [messages]);

  const sendToAi = useCallback(
    async (userText: string, isInitial = false) => {
      setIsLoading(true);
      setError(null);
      setAiTypingComplete(false);

      // Add user message (skip for initial greeting)
      if (!isInitial) {
        setMessages((prev) => [
          ...prev,
          {
            id: `user-${Date.now()}`,
            speaker: 'user',
            content: userText,
          },
        ]);
      }

      try {
        const history = isInitial ? [] : buildHistory();
        const response = await socraticChat({
          subject,
          topic,
          userMessage: userText,
          history,
        });

        const aiMsg: AiMessage = {
          id: `ai-${Date.now()}`,
          speaker: 'ai',
          content: response.reply,
          conceptDiscovered: response.conceptDiscovered,
          isAha: response.isAha,
          phase: response.phase,
        };

        setMessages((prev) => [...prev, aiMsg]);
        setCurrentPhase(response.phase || 'exploration');
        setSuggestedHints(response.suggestedHints);
        setHintIndex(0);
        setHintText(null);

        // Handle concept discovery
        if (response.conceptDiscovered) {
          setDiscoveredConcepts((prev) => {
            if (prev.includes(response.conceptDiscovered!)) return prev;
            return [...prev, response.conceptDiscovered!];
          });

          // Show aha effect
          if (response.isAha) {
            setTimeout(() => {
              setShowAha(true);
              setAhaConcept(response.conceptDiscovered!);
              setTimeout(() => setShowAha(false), 2500);
            }, 500);
          }

          // Save concept progress to backend (fire-and-forget)
          updateProgress({
            conceptId: response.conceptDiscovered.replace(/\s+/g, '-').toLowerCase(),
            conceptName: response.conceptDiscovered,
            subject,
            thinkingDepth: response.thinkingDepth,
            discoveredIn: sessionId,
          }).catch(() => {
            // Silently ignore progress save errors
          });
        }
      } catch (err) {
        console.error('AI chat error:', err);
        setError(
          err instanceof Error ? err.message : t('dialogue.aiError')
        );
        setAiTypingComplete(true);
      } finally {
        setIsLoading(false);
      }
    },
    [buildHistory, subject, topic, sessionId, t, locale]
  );

  const handleSend = () => {
    const text = input.trim();
    if (!text || isLoading || !aiTypingComplete) return;
    setInput('');
    sendToAi(text);
  };

  const handleHint = () => {
    if (suggestedHints && hintIndex < suggestedHints.length) {
      setHintText(suggestedHints[hintIndex]);
      setHintIndex((prev) => prev + 1);
    }
  };

  const handleEndSession = () => {
    // Save session to backend (fire-and-forget)
    saveSession({
      sessionId,
      subject,
      topic,
      messages: messages.map((m) => ({
        speaker: m.speaker,
        content: m.content,
      })),
      discoveredConcepts,
      thinkingDepth: 0,
    }).catch(() => {
      // Silently ignore save errors
    });
    navigate('/explore');
  };

  const canHint = suggestedHints && hintIndex < suggestedHints.length;

  return (
    <div className="flex flex-col h-[calc(100dvh-56px)]">
      <AhaEffect show={showAha} concept={ahaConcept} />

      {/* Phase Indicator */}
      <div className="px-4 py-3 border-b border-border">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium" style={{ color: subjectColor }}>
            {subject} -- {topic}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted">
              {t('dialogue.discoveredConcepts', { count: discoveredConcepts.length })}
            </span>
            <span className="inline-flex items-center gap-1 bg-wisdom-purple/20 text-wisdom-purple text-[10px] px-2 py-0.5 rounded-full">
              <Zap className="w-3 h-3" />
              AI
            </span>
          </div>
        </div>
        <div className="flex gap-1">
          {phaseOrder.map((phase, i) => (
            <div key={phase} className="flex-1 flex flex-col items-center gap-1">
              <div
                className={`h-1 w-full rounded-full transition-all duration-500 ${
                  i <= currentPhaseIndex ? 'bg-warm-amber' : 'bg-deep-blue-lighter'
                }`}
              />
              <span
                className={`text-[10px] ${
                  i === currentPhaseIndex ? 'text-warm-amber' : 'text-muted/50'
                }`}
              >
                {t(`dialogue.phases.${phase}`)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        <AnimatePresence>
          {messages.map((msg, i) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${msg.speaker === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                  msg.speaker === 'user'
                    ? 'bg-wisdom-purple/20 border border-wisdom-purple/30'
                    : msg.isAha
                    ? 'bg-card border border-warm-amber/30 animate-pulse-glow'
                    : 'bg-card border border-border'
                }`}
              >
                {msg.speaker === 'ai' && (
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-warm-amber" />
                    <span className="text-xs text-warm-amber">{t('dialogue.aiLabel')}</span>
                  </div>
                )}
                <div className="text-sm leading-relaxed whitespace-pre-line">
                  {msg.speaker === 'ai' && i === messages.length - 1 && !aiTypingComplete ? (
                    <TypewriterText
                      text={msg.content}
                      onComplete={() => setAiTypingComplete(true)}
                    />
                  ) : (
                    msg.content
                  )}
                </div>
                {msg.conceptDiscovered && (
                  <div className="mt-2 inline-flex items-center gap-1 bg-warm-amber/10 text-warm-amber text-xs px-2 py-1 rounded-full">
                    <Sparkles className="w-3 h-3" />
                    {t('dialogue.discovered')} {msg.conceptDiscovered}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* AI loading indicator */}
        {isLoading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
            <div className="bg-card border border-border rounded-2xl px-4 py-3">
              <div className="flex items-center gap-1.5 mb-1.5">
                <Sparkles className="w-3.5 h-3.5 text-warm-amber" />
                <span className="text-xs text-warm-amber">{t('dialogue.aiLabel')}</span>
              </div>
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-muted rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-muted rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-muted rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </motion.div>
        )}

        {/* Error display */}
        {error && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-center">
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-2 text-sm text-red-400 max-w-[85%]">
              {error}
            </div>
          </motion.div>
        )}

        {/* Hint display */}
        {hintText && (
          <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="flex justify-center">
            <div className="bg-warm-amber/10 border border-warm-amber/20 rounded-xl px-4 py-2 text-sm text-warm-amber max-w-[85%]">
              <div className="flex items-center gap-1.5 mb-1">
                <Lightbulb className="w-3.5 h-3.5" />
                <span className="text-xs font-medium">{t('dialogue.hintLabel')}</span>
              </div>
              {hintText}
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-border p-4 space-y-3">
        {canHint && aiTypingComplete && !isLoading && (
          <button
            onClick={handleHint}
            className="flex items-center gap-1.5 text-sm text-warm-amber hover:text-warm-amber-light transition-colors"
          >
            <Lightbulb className="w-4 h-4" />
            {t('dialogue.giveHint')}
          </button>
        )}
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder={isLoading ? t('dialogue.aiThinking') : t('dialogue.inputPlaceholder')}
            disabled={isLoading || !aiTypingComplete}
            className="flex-1 bg-deep-blue-lighter border border-border rounded-xl px-4 py-3 text-sm placeholder:text-muted focus:outline-none focus:border-warm-amber/50 transition-colors disabled:opacity-50"
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim() || !aiTypingComplete}
            className="bg-warm-amber text-deep-blue rounded-xl px-4 py-3 hover:bg-warm-amber-light transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <button
          onClick={handleEndSession}
          className="w-full text-center text-xs text-muted hover:text-warm-amber transition-colors py-1"
        >
          {t('dialogue.endSession')}
        </button>
      </div>
    </div>
  );
}

// ─── Main DialoguePage (with mode switch) ─────────────

export default function DialoguePage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { t } = useI18n();
  const {
    activeDialogue,
    messages,
    currentStepIndex,
    hintLevel,
    dialogueComplete,
    discoveredConcepts,
    addMessage,
    requestHint,
    completeDialogue,
    addCompletedDialogue,
  } = useStore();

  // AI mode: enabled via search param ?ai=1, or toggled manually
  const aiParam = searchParams.get('ai');
  const aiSubject = searchParams.get('subject') || '';
  const aiTopic = searchParams.get('topic') || '';
  const [aiMode, setAiMode] = useState(aiParam === '1');

  const [isAiTyping, setIsAiTyping] = useState(false);
  const [showAha, setShowAha] = useState(false);
  const [ahaConcept, setAhaConcept] = useState('');
  const [hintText, setHintText] = useState<string | null>(null);
  const [aiTypingComplete, setAiTypingComplete] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // If not in AI mode and no active dialogue, redirect
    if (!aiMode && !activeDialogue) {
      navigate('/explore');
    }
  }, [activeDialogue, navigate, aiMode]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isAiTyping]);

  // ─── AI Mode ────────────────────────────────────────
  if (aiMode) {
    const sub = activeDialogue?.subject || aiSubject || t('explore.generalSubject');
    const top = activeDialogue?.title || aiTopic || t('dialogue.freeExplore');
    const color = activeDialogue?.subjectColor || '#F59E0B';
    return <AiModeDialogue subject={sub} topic={top} subjectColor={color} />;
  }

  // ─── Script Mode (existing behaviour) ───────────────

  const currentStep = activeDialogue?.steps[currentStepIndex];
  const currentPhase = currentStep?.phase || 'exploration';
  const currentPhaseIndex = phaseOrder.indexOf(currentPhase);

  // Get available options for the current user step
  const getOptions = () => {
    if (!activeDialogue || isAiTyping || !aiTypingComplete) return null;
    const step = activeDialogue.steps[currentStepIndex];
    if (step?.speaker === 'user' && step.options) {
      return step.options;
    }
    const nextStep = activeDialogue.steps[currentStepIndex + 1];
    if (nextStep?.speaker === 'user' && nextStep?.options) {
      return nextStep.options;
    }
    return null;
  };

  const handleSelectOption = (option: string) => {
    if (!activeDialogue || isAiTyping) return;

    let userStepIndex = currentStepIndex;
    if (activeDialogue.steps[currentStepIndex]?.speaker !== 'user') {
      userStepIndex = currentStepIndex + 1;
    }

    const userStep = activeDialogue.steps[userStepIndex];
    const nextAiStepIndex = userStepIndex + 1;
    const nextAiStep = activeDialogue.steps[nextAiStepIndex];

    addMessage({
      id: `user-${Date.now()}`,
      speaker: 'user',
      content: option,
      conceptDiscovered: userStep?.conceptDiscovered,
    });

    if (userStep?.conceptDiscovered) {
      setTimeout(() => {
        setShowAha(true);
        setAhaConcept(userStep.conceptDiscovered!);
        setTimeout(() => setShowAha(false), 2500);
      }, 500);
    }

    if (nextAiStep && nextAiStep.speaker === 'ai') {
      setIsAiTyping(true);
      setAiTypingComplete(false);
      setTimeout(() => {
        setIsAiTyping(false);
        addMessage({
          id: nextAiStep.id,
          speaker: 'ai',
          content: nextAiStep.content,
          isAha: nextAiStep.isAha,
          conceptDiscovered: nextAiStep.conceptDiscovered,
        });

        if (nextAiStep.isAha && nextAiStep.conceptDiscovered) {
          setTimeout(() => {
            setShowAha(true);
            setAhaConcept(nextAiStep.conceptDiscovered!);
            setTimeout(() => setShowAha(false), 2500);
          }, 1000);
        }

        const stepAfterAi = nextAiStepIndex + 1;
        if (stepAfterAi < activeDialogue.steps.length) {
          useStore.setState({ currentStepIndex: stepAfterAi });
        } else {
          completeDialogue();
          addCompletedDialogue(activeDialogue.id);
        }
      }, 1200 + Math.random() * 800);
    } else {
      completeDialogue();
      addCompletedDialogue(activeDialogue.id);
    }

    setHintText(null);
  };

  const handleHint = () => {
    const hint = requestHint();
    if (hint) {
      setHintText(hint);
    }
  };

  if (!activeDialogue) return null;

  const options = getOptions();
  const currentHints = activeDialogue.steps.find(
    (s, i) => i >= currentStepIndex && s.hints
  )?.hints;
  const canHint = currentHints && hintLevel < currentHints.length;

  return (
    <div className="flex flex-col h-[calc(100dvh-56px)]">
      <AhaEffect show={showAha} concept={ahaConcept} />

      {/* Phase Indicator */}
      <div className="px-4 py-3 border-b border-border">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium" style={{ color: activeDialogue.subjectColor }}>
            {activeDialogue.subject} -- {activeDialogue.title}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted">
              {t('dialogue.discoveredConceptsOf', {
                count: discoveredConcepts.length,
                total: activeDialogue.targetConcepts.length,
              })}
            </span>
            {/* AI Mode Toggle */}
            <button
              onClick={() => setAiMode(true)}
              className="inline-flex items-center gap-1 text-[10px] text-muted hover:text-wisdom-purple border border-border hover:border-wisdom-purple/50 px-2 py-0.5 rounded-full transition-colors"
              title={t('dialogue.switchToAiMode')}
            >
              <Zap className="w-3 h-3" />
              {t('dialogue.aiMode')}
            </button>
          </div>
        </div>
        <div className="flex gap-1">
          {phaseOrder.map((phase, i) => (
            <div key={phase} className="flex-1 flex flex-col items-center gap-1">
              <div
                className={`h-1 w-full rounded-full transition-all duration-500 ${
                  i <= currentPhaseIndex
                    ? 'bg-warm-amber'
                    : 'bg-deep-blue-lighter'
                }`}
              />
              <span
                className={`text-[10px] ${
                  i === currentPhaseIndex ? 'text-warm-amber' : 'text-muted/50'
                }`}
              >
                {t(`dialogue.phases.${phase}`)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        <AnimatePresence>
          {messages.map((msg, i) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${msg.speaker === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                  msg.speaker === 'user'
                    ? 'bg-wisdom-purple/20 border border-wisdom-purple/30'
                    : msg.isAha
                    ? 'bg-card border border-warm-amber/30 animate-pulse-glow'
                    : 'bg-card border border-border'
                }`}
              >
                {msg.speaker === 'ai' && (
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-warm-amber" />
                    <span className="text-xs text-warm-amber">{t('dialogue.scriptLabel')}</span>
                  </div>
                )}
                <div className="text-sm leading-relaxed whitespace-pre-line">
                  {msg.speaker === 'ai' && i === messages.length - 1 && !aiTypingComplete ? (
                    <TypewriterText
                      text={msg.content}
                      onComplete={() => setAiTypingComplete(true)}
                    />
                  ) : (
                    msg.content
                  )}
                </div>
                {msg.conceptDiscovered && (
                  <div className="mt-2 inline-flex items-center gap-1 bg-warm-amber/10 text-warm-amber text-xs px-2 py-1 rounded-full">
                    <Sparkles className="w-3 h-3" />
                    {t('dialogue.discovered')} {msg.conceptDiscovered}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* AI Typing indicator */}
        {isAiTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-card border border-border rounded-2xl px-4 py-3">
              <div className="flex items-center gap-1.5 mb-1.5">
                <Sparkles className="w-3.5 h-3.5 text-warm-amber" />
                <span className="text-xs text-warm-amber">{t('dialogue.scriptLabel')}</span>
              </div>
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-muted rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-muted rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-muted rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </motion.div>
        )}

        {/* Hint display */}
        {hintText && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center"
          >
            <div className="bg-warm-amber/10 border border-warm-amber/20 rounded-xl px-4 py-2 text-sm text-warm-amber max-w-[85%]">
              <div className="flex items-center gap-1.5 mb-1">
                <Lightbulb className="w-3.5 h-3.5" />
                <span className="text-xs font-medium">{t('dialogue.hintLabelN', { level: hintLevel })}</span>
              </div>
              {hintText}
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-border p-4 space-y-3">
        {/* Dialogue complete */}
        {dialogueComplete && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-3"
          >
            <p className="text-sm text-muted">{t('dialogue.dialogueComplete', { count: discoveredConcepts.length })}</p>
            <button
              onClick={() => navigate(`/mindmap/${activeDialogue.id}`)}
              className="inline-flex items-center gap-2 bg-warm-amber text-deep-blue font-semibold px-6 py-3 rounded-xl hover:bg-warm-amber-light transition-colors"
            >
              <Map className="w-4 h-4" />
              {t('dialogue.viewMindMap')}
            </button>
          </motion.div>
        )}

        {/* Options and hints */}
        {!dialogueComplete && options && aiTypingComplete && !isAiTyping && (
          <>
            {canHint && (
              <button
                onClick={handleHint}
                className="flex items-center gap-1.5 text-sm text-warm-amber hover:text-warm-amber-light transition-colors"
              >
                <Lightbulb className="w-4 h-4" />
                {hintLevel === 0 ? t('dialogue.giveHint') : hintLevel === 1 ? t('dialogue.moreHint') : t('dialogue.lastHint')}
              </button>
            )}
            <div className="flex flex-col gap-2">
              {options.map((option, i) => (
                <motion.button
                  key={option}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => handleSelectOption(option)}
                  className="text-left bg-deep-blue-lighter border border-border rounded-xl px-4 py-3 text-sm hover:border-wisdom-purple/50 hover:bg-wisdom-purple/10 transition-colors flex items-center justify-between"
                >
                  <span>{option}</span>
                  <Send className="w-3.5 h-3.5 text-muted" />
                </motion.button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
