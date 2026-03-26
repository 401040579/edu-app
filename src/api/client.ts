import { config } from "../config";

// ─── Types ────────────────────────────────────────────

export interface ChatMessage {
  speaker: "ai" | "user";
  content: string;
}

export interface ChatRequest {
  subject: string;
  topic: string;
  userMessage: string;
  history: ChatMessage[];
}

export interface ChatResponse {
  reply: string;
  conceptDiscovered: string | null;
  isAha: boolean;
  suggestedHints: string[] | null;
  phase: string;
  thinkingDepth: number;
  usage?: {
    inputTokens: number;
    outputTokens: number;
  };
}

export interface SessionData {
  sessionId: string;
  subject: string;
  topic: string;
  messages: ChatMessage[];
  discoveredConcepts: string[];
  thinkingDepth: number;
}

export interface ProgressEntry {
  conceptId: string;
  conceptName: string;
  subject: string;
  thinkingDepth: number;
  discoveredIn: string | null;
  discoveryCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProgressSummary {
  totalConcepts: number;
  avgThinkingDepth: number;
  bySubject: Record<string, { count: number; concepts: string[] }>;
}

// ─── API Client ───────────────────────────────────────

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${config.apiEndpoint}${path}`;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "X-User-Id": config.getUserId(),
    ...(options.headers as Record<string, string> || {}),
  };

  const res = await fetch(url, { ...options, headers });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(
      (body as Record<string, string>).error ||
        `API error: ${res.status} ${res.statusText}`
    );
  }

  return res.json() as Promise<T>;
}

// ─── Exported API methods ─────────────────────────────

export async function socraticChat(
  data: ChatRequest
): Promise<ChatResponse> {
  return request<ChatResponse>("/api/chat", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function saveSession(data: SessionData): Promise<{ message: string; sessionId: string }> {
  return request("/api/sessions", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getSessions(
  limit = 20
): Promise<{ sessions: SessionData[]; count: number }> {
  return request(`/api/sessions?limit=${limit}`);
}

export async function updateProgress(data: {
  conceptId: string;
  conceptName: string;
  subject?: string;
  thinkingDepth?: number;
  discoveredIn?: string;
}): Promise<{ message: string; progress: ProgressEntry }> {
  return request("/api/progress", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getProgress(
  subject?: string
): Promise<{ concepts: ProgressEntry[]; summary: ProgressSummary }> {
  const qs = subject ? `?subject=${encodeURIComponent(subject)}` : "";
  return request(`/api/progress${qs}`);
}
