import axios from "axios";

export const Instance = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_BASE_URL ??
    "https://app-api.eventhex.ai/api/v1/i",
  headers: {
    "Content-Type": "application/json",
  },
});


