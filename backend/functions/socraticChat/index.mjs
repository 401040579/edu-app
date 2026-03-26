import { getClaudeClient, SOCRATIC_SYSTEM_PROMPT } from "/opt/nodejs/claude-client.mjs";
import { success, error, getUserId } from "/opt/nodejs/response.mjs";

export async function handler(event) {
  try {
    const userId = getUserId(event);
    if (!userId) {
      return error(401, "Missing X-User-Id header");
    }

    const body = JSON.parse(event.body || "{}");
    const { subject, topic, userMessage, history } = body;

    if (!subject || !topic || !userMessage) {
      return error(400, "Missing required fields: subject, topic, userMessage");
    }

    const claude = await getClaudeClient();

    // Build conversation messages from history
    const messages = [];

    if (history && Array.isArray(history)) {
      for (const msg of history) {
        messages.push({
          role: msg.speaker === "user" ? "user" : "assistant",
          content: msg.content,
        });
      }
    }

    // Add the current user message
    messages.push({
      role: "user",
      content: userMessage,
    });

    const contextualSystemPrompt = `${SOCRATIC_SYSTEM_PROMPT}

当前学科：${subject}
当前话题：${topic}`;

    const response = await claude.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      system: contextualSystemPrompt,
      messages,
    });

    const rawText = response.content[0]?.text || "";

    // Parse the JSON response from Claude
    let parsed;
    try {
      // Strip markdown code block if present
      const cleaned = rawText.replace(/^```(?:json)?\s*/, "").replace(/\s*```$/, "").trim();
      parsed = JSON.parse(cleaned);
    } catch {
      // If parsing fails, wrap the raw response
      parsed = {
        response: rawText,
        conceptDiscovered: null,
        isAha: false,
        suggestedHints: null,
        phase: "exploration",
        thinkingDepth: 5,
      };
    }

    return success({
      reply: parsed.response,
      conceptDiscovered: parsed.conceptDiscovered || null,
      isAha: parsed.isAha || false,
      suggestedHints: parsed.suggestedHints || null,
      phase: parsed.phase || "exploration",
      thinkingDepth: parsed.thinkingDepth || 5,
      usage: {
        inputTokens: response.usage?.input_tokens,
        outputTokens: response.usage?.output_tokens,
      },
    });
  } catch (err) {
    console.error("socraticChat error:", err);
    return error(500, "Internal server error");
  }
}
