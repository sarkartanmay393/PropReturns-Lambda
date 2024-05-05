import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const BACKEND_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8080"
    : "https://zvg2nyusw6.execute-api.ap-south-1.amazonaws.com/dev";
export const BACKEND_API_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8080/api"
    : "https://zvg2nyusw6.execute-api.ap-south-1.amazonaws.com/dev/api";
