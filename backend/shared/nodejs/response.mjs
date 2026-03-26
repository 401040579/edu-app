export function success(body) {
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
}

export function error(statusCode, message) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ error: message }),
  };
}

export function getUserId(event) {
  // Read userId from X-User-Id header
  const userId =
    event.headers?.["x-user-id"] ||
    event.headers?.["X-User-Id"];

  return userId || null;
}
