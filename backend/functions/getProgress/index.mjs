import { QueryCommand } from "@aws-sdk/lib-dynamodb";
import { docClient } from "/opt/nodejs/dynamo-client.mjs";
import { success, error, getUserId } from "/opt/nodejs/response.mjs";

export async function handler(event) {
  try {
    const userId = getUserId(event);
    if (!userId) {
      return error(401, "Missing X-User-Id header");
    }

    const subject = event.queryStringParameters?.subject;

    let params = {
      TableName: process.env.PROGRESS_TABLE,
      KeyConditionExpression: "userId = :uid",
      ExpressionAttributeValues: {
        ":uid": userId,
      },
    };

    // Optional filter by subject
    if (subject) {
      params.FilterExpression = "subject = :subj";
      params.ExpressionAttributeValues[":subj"] = subject;
    }

    const result = await docClient.send(new QueryCommand(params));

    const concepts = result.Items || [];

    // Calculate summary stats
    const totalConcepts = concepts.length;
    const avgThinkingDepth =
      totalConcepts > 0
        ? concepts.reduce((sum, c) => sum + (c.thinkingDepth || 0), 0) / totalConcepts
        : 0;

    const bySubject = {};
    for (const c of concepts) {
      const subj = c.subject || "unknown";
      if (!bySubject[subj]) {
        bySubject[subj] = { count: 0, concepts: [] };
      }
      bySubject[subj].count++;
      bySubject[subj].concepts.push(c.conceptName);
    }

    return success({
      concepts,
      summary: {
        totalConcepts,
        avgThinkingDepth: Math.round(avgThinkingDepth * 10) / 10,
        bySubject,
      },
    });
  } catch (err) {
    console.error("getProgress error:", err);
    return error(500, "Internal server error");
  }
}
