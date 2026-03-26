// API configuration for the EduApp backend.
// After deploying the SAM stack, replace the API_ENDPOINT value
// with the output from `sam deploy` (ApiEndpoint output).
// You can also set it via the VITE_API_ENDPOINT environment variable.

export const config = {
  apiEndpoint:
    import.meta.env.VITE_API_ENDPOINT ||
    "https://ygvo6s53j2.execute-api.us-east-1.amazonaws.com/prod",

  // A simple anonymous userId persisted in localStorage.
  // In production this would come from a proper auth system.
  getUserId(): string {
    const key = "edu-app-user-id";
    let id = localStorage.getItem(key);
    if (!id) {
      id = `user-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
      localStorage.setItem(key, id);
    }
    return id;
  },
};
