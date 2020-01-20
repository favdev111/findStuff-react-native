export const IS_DEV: boolean = process.env.NODE_ENV !== "production";

export const API_ROOT: string = IS_DEV
  ? "http://localhost:8000/api/"
  : "https://localhost:8000/api/";

export const ORIGINAL_ROOT: string = "http://localhost:8000/";
