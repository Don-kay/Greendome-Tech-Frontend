import customFetch, { customFetchProduction } from "./axios";

export const Fetch =
  process.env.NODE_ENV === "production" ? customFetchProduction : customFetch;
