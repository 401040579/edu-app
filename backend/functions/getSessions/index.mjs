import { QueryCommand } from "@aws-sdk/lib-dynamodb";
import { docClient } from "/opt/nodejs/dynamo-client.mjs";
import { success, error, getUserId } from "/opt/nodejs/response.mjs";

export async function handler(event) {
  try {
    const userId = getUserId(event);
    if (!userId) {
      return error(401, "Missing X-User-Id header");
    }

    const limit = parseInt(event.queryStringParameters?.limit || "20", 10);

    const result = await docClient.send(
      new QueryCommand({
        TableName: process.env.SESSIONS_TABLE,
        KeyConditionExpression: "userId = :uid",
        ExpressionAttributeValues: {
          ":uid": userId,
        },
        ScanIndexForward: false,
        Limit: Math.min(limit, 100),
      })
    );

    return success({
      sessions: result.Items || [],
      count: result.Count || 0,
    });
  } catch (err) {
    console.error("getSessions error:", err);
    return error(500, "Internal server error");
  }
}
