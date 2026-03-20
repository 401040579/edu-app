import { useEffect, useRef, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, Sparkles, Send, Map } from 'lucide-react';
import { useStore } from '../store/useStore';
import AhaEffect from '../components/AhaEffect';

const phaseLabels: Record<string, string> = {
  exploration: '探索',
  scaffolding: '搭建',
  guided_discovery: '发现',
  consolidation: '巩固',
  reflection: '反思',
};

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

export default function DialoguePage() {
  const navigate = useNavigate();
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

  const [isAiTyping, setIsAiTyping] = useState(false);
  const [showAha, setShowAha] = useState(false);
  const [ahaConcept, setAhaConcept] = useState('');
  const [hintText, setHintText] = useState<string | null>(null);
  const [aiTypingComplete, setAiTypingComplete] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!activeDialogue) {
      navigate('/explore');
    }
  }, [activeDialogue, navigate]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isAiTyping]);

  const currentStep = activeDialogue?.steps[currentStepIndex];
  const currentPhase = currentStep?.phase || 'exploration';
  const currentPhaseIndex = phaseOrder.indexOf(currentPhase);

  // Get available options for the current user step
  const getOptions = () => {
    if (!activeDialogue || isAiTyping || !aiTypingComplete) return null;
    // The current step should be a user step with options
    const step = activeDialogue.steps[currentStepIndex];
    if (step?.speaker === 'user' && step.options) {
      return step.options;
    }
    // Check if the next step is a user step
    const nextStep = activeDialogue.steps[currentStepIndex + 1];
    if (nextStep?.speaker === 'user' && nextStep?.options) {
      return nextStep.options;
    }
    return null;
  };

  const handleSelectOption = useCallback((option: string) => {
    if (!activeDialogue || isAiTyping) return;

    // Find the current user step
    let userStepIndex = currentStepIndex;
    if (activeDialogue.steps[currentStepIndex]?.speaker !== 'user') {
      userStepIndex = currentStepIndex + 1;
    }

    const userStep = activeDialogue.steps[userStepIndex];
    const nextAiStepIndex = userStepIndex + 1;
    const nextAiStep = activeDialogue.steps[nextAiStepIndex];

    // Add user message
    addMessage({
      id: `user-${Date.now()}`,
      speaker: 'user',
      content: option,
      conceptDiscovered: userStep?.conceptDiscovered,
    });

    // Show aha effect if concept discovered
    if (userStep?.conceptDiscovered) {
      setTimeout(() => {
        setShowAha(true);
        setAhaConcept(userStep.conceptDiscovered!);
        setTimeout(() => setShowAha(false), 2500);
      }, 500);
    }

    if (nextAiStep && nextAiStep.speaker === 'ai') {
      // Show AI typing then reveal message
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

        // Show aha for AI step discoveries
        if (nextAiStep.isAha && nextAiStep.conceptDiscovered) {
          setTimeout(() => {
            setShowAha(true);
            setAhaConcept(nextAiStep.conceptDiscovered!);
            setTimeout(() => setShowAha(false), 2500);
          }, 1000);
        }

        // Move to the step after the AI step
        const stepAfterAi = nextAiStepIndex + 1;
        if (stepAfterAi < activeDialogue.steps.length) {
          useStore.setState({ currentStepIndex: stepAfterAi });
        } else {
          // Dialogue complete
          completeDialogue();
          addCompletedDialogue(activeDialogue.id);
        }
      }, 1200 + Math.random() * 800);
    } else {
      // No more steps
      completeDialogue();
      addCompletedDialogue(activeDialogue.id);
    }

    setHintText(null);
  }, [activeDialogue, currentStepIndex, isAiTyping, addMessage, completeDialogue, addCompletedDialogue]);

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
          <span className="text-xs text-muted">
            已发现 {discoveredConcepts.length}/{activeDialogue.targetConcepts.length} 个概念
          </span>
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
                {phaseLabels[phase]}
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
                    <span className="text-xs text-warm-amber">思伴</span>
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
                    发现: {msg.conceptDiscovered}
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
                <span className="text-xs text-warm-amber">思伴</span>
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
                <span className="text-xs font-medium">提示 {hintLevel}/3</span>
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
            <p className="text-sm text-muted">对话结束！你发现了 {discoveredConcepts.length} 个概念</p>
            <button
              onClick={() => navigate(`/mindmap/${activeDialogue.id}`)}
              className="inline-flex items-center gap-2 bg-warm-amber text-deep-blue font-semibold px-6 py-3 rounded-xl hover:bg-warm-amber-light transition-colors"
            >
              <Map className="w-4 h-4" />
              查看思维发现地图
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
                {hintLevel === 0 ? '给我一点提示' : hintLevel === 1 ? '再给一点提示' : '最后提示'}
                {' '}
                {'💡'.repeat(hintLevel + 1)}
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
