export const redirectURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/auth/google/callback"
    : `${process.env.VITE_BACKEND_URL}/auth/google/callback`;
export const baseUrl =
  import.meta.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : process.env.VITE_BACKEND_URL;
export const frontendBaseUrl =
  import.meta.env.NODE_ENV === "development"
    ? "http://localhost:4000"
    : process.env.VITE_BACKEND_URL;
