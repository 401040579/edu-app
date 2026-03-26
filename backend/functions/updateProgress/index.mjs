import { UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { docClient } from "/opt/nodejs/dynamo-client.mjs";
import { success, error, getUserId } from "/opt/nodejs/response.mjs";

export async function handler(event) {
  try {
    const userId = getUserId(event);
    if (!userId) {
      return error(401, "Missing X-User-Id header");
    }

    const body = JSON.parse(event.body || "{}");
    const { conceptId, subject, conceptName, thinkingDepth, discoveredIn } = body;

    if (!conceptId || !conceptName) {
      return error(400, "Missing required fields: conceptId, conceptName");
    }

    const now = new Date().toISOString();

    const result = await docClient.send(
      new UpdateCommand({
        TableName: process.env.PROGRESS_TABLE,
        Key: { userId, conceptId },
        UpdateExpression:
          "SET conceptName = :name, subject = :subj, thinkingDepth = :depth, " +
          "discoveredIn = :disc, updatedAt = :now, " +
          "discoveryCount = if_not_exists(discoveryCount, :zero) + :one, " +
          "createdAt = if_not_exists(createdAt, :now)",
        ExpressionAttributeValues: {
          ":name": conceptName,
          ":subj": subject || "unknown",
          ":depth": thinkingDepth || 5,
          ":disc": discoveredIn || null,
          ":now": now,
          ":zero": 0,
          ":one": 1,
        },
        ReturnValues: "ALL_NEW",
      })
    );

    return success({
      message: "Progress updated",
      progress: result.Attributes,
    });
  } catch (err) {
    console.error("updateProgress error:", err);
    return error(500, "Internal server error");
  }
}
