import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { docClient } from "/opt/nodejs/dynamo-client.mjs";
import { success, error, getUserId } from "/opt/nodejs/response.mjs";

export async function handler(event) {
  try {
    const userId = getUserId(event);
    if (!userId) {
      return error(401, "Missing X-User-Id header");
    }

    const body = JSON.parse(event.body || "{}");
    const { sessionId, subject, topic, messages, discoveredConcepts, thinkingDepth } = body;

    if (!sessionId || !subject || !topic) {
      return error(400, "Missing required fields: sessionId, subject, topic");
    }

    const now = new Date().toISOString();

    const item = {
      userId,
      sessionId,
      subject,
      topic,
      messages: messages || [],
      discoveredConcepts: discoveredConcepts || [],
      thinkingDepth: thinkingDepth || 0,
      createdAt: now,
      updatedAt: now,
    };

    await docClient.send(
      new PutCommand({
        TableName: process.env.SESSIONS_TABLE,
        Item: item,
      })
    );

    return success({ message: "Session saved", sessionId });
  } catch (err) {
    console.error("saveSession error:", err);
    return error(500, "Internal server error");
  }
}
