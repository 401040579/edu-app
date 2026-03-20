import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { DialogueScript } from '../data/dialogues';

interface DialogueMessage {
  id: string;
  speaker: 'ai' | 'user';
  content: string;
  isTyping?: boolean;
  conceptDiscovered?: string;
  isAha?: boolean;
}

interface AppState {
  // Navigation
  currentPage: string;
  setCurrentPage: (page: string) => void;

  // Dialogue
  activeDialogue: DialogueScript | null;
  currentStepIndex: number;
  messages: DialogueMessage[];
  hintLevel: number;
  dialogueComplete: boolean;
  discoveredConcepts: string[];

  startDialogue: (script: DialogueScript) => void;
  addMessage: (message: DialogueMessage) => void;
  advanceStep: () => void;
  selectOption: (option: string) => void;
  requestHint: () => string | null;
  completeDialogue: () => void;
  resetDialogue: () => void;

  // Stats
  completedDialogues: string[];
  addCompletedDialogue: (id: string) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      currentPage: 'landing',
      setCurrentPage: (page) => set({ currentPage: page }),

      activeDialogue: null,
      currentStepIndex: 0,
      messages: [],
      hintLevel: 0,
      dialogueComplete: false,
      discoveredConcepts: [],

      startDialogue: (script) => {
        const firstStep = script.steps[0];
        set({
          activeDialogue: script,
          currentStepIndex: 0,
          messages: [{
            id: firstStep.id,
            speaker: 'ai',
            content: firstStep.content,
          }],
          hintLevel: 0,
          dialogueComplete: false,
          discoveredConcepts: [],
          currentPage: 'dialogue',
        });
      },

      addMessage: (message) => set((state) => ({
        messages: [...state.messages, message],
      })),

      advanceStep: () => {
        const state = get();
        if (!state.activeDialogue) return;
        const nextIndex = state.currentStepIndex + 1;
        if (nextIndex >= state.activeDialogue.steps.length) {
          set({ dialogueComplete: true });
          return;
        }
        set({ currentStepIndex: nextIndex, hintLevel: 0 });
      },

      selectOption: (option) => {
        const state = get();
        if (!state.activeDialogue) return;

        const currentStep = state.activeDialogue.steps[state.currentStepIndex];
        const nextStepIndex = state.currentStepIndex + 1;

        // Add user message
        const userMessage: DialogueMessage = {
          id: `user-${Date.now()}`,
          speaker: 'user',
          content: option,
        };

        // Check if this step has a concept discovery
        if (currentStep?.conceptDiscovered) {
          userMessage.conceptDiscovered = currentStep.conceptDiscovered;
        }

        const newMessages = [...state.messages, userMessage];

        if (nextStepIndex < state.activeDialogue.steps.length) {
          const nextStep = state.activeDialogue.steps[nextStepIndex];
          if (nextStep.speaker === 'ai') {
            // We'll add the AI message after a delay (handled in component)
            set({
              messages: newMessages,
              currentStepIndex: nextStepIndex,
              hintLevel: 0,
              discoveredConcepts: currentStep?.conceptDiscovered
                ? [...state.discoveredConcepts, currentStep.conceptDiscovered]
                : state.discoveredConcepts,
            });
            return;
          }
        }

        // Check if dialogue is complete
        if (nextStepIndex >= state.activeDialogue.steps.length) {
          set({
            messages: newMessages,
            currentStepIndex: nextStepIndex,
            dialogueComplete: true,
            discoveredConcepts: currentStep?.conceptDiscovered
              ? [...state.discoveredConcepts, currentStep.conceptDiscovered]
              : state.discoveredConcepts,
          });
          return;
        }

        set({
          messages: newMessages,
          currentStepIndex: nextStepIndex,
          discoveredConcepts: currentStep?.conceptDiscovered
            ? [...state.discoveredConcepts, currentStep.conceptDiscovered]
            : state.discoveredConcepts,
        });
      },

      requestHint: () => {
        const state = get();
        if (!state.activeDialogue) return null;

        // Find the next AI step that has hints
        const steps = state.activeDialogue.steps;
        for (let i = state.currentStepIndex; i < steps.length; i++) {
          const step = steps[i];
          if (step.hints && state.hintLevel < step.hints.length) {
            const hint = step.hints[state.hintLevel];
            set({ hintLevel: state.hintLevel + 1 });
            return hint;
          }
        }
        return null;
      },

      completeDialogue: () => {
        const state = get();
        if (state.activeDialogue) {
          set({
            dialogueComplete: true,
            completedDialogues: [...state.completedDialogues, state.activeDialogue.id],
          });
        }
      },

      resetDialogue: () => set({
        activeDialogue: null,
        currentStepIndex: 0,
        messages: [],
        hintLevel: 0,
        dialogueComplete: false,
        discoveredConcepts: [],
      }),

      completedDialogues: [],
      addCompletedDialogue: (id) => set((state) => ({
        completedDialogues: [...new Set([...state.completedDialogues, id])],
      })),
    }),
    {
      name: 'edu-app-store',
      partialize: (state) => ({
        completedDialogues: state.completedDialogues,
      }),
    }
  )
);
