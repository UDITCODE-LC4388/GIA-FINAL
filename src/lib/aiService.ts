import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

/**
 * Robust AI Service to handle Gemini API calls with caching and rate-limiting.
 */

// In-memory cache for the session to prevent redundant calls
const aiCache: Record<string, string> = {};

// Simple cooldown mechanism to handle 429 Too Many Requests
let last429Time = 0;
const COOLDOWN_DURATION = 60000; // 60 seconds cooldown to be safe

/**
 * Fetches AI response with automatic fallback and caching.
 * @param prompt The prompt to send to Gemini
 * @param fallback The fallback string to return on error or rate-limit
 * @param cacheId Optional unique ID for caching (defaults to prompt)
 */
export async function getAiResponse(
  prompt: string, 
  fallback: string,
  cacheId?: string
): Promise<string> {
  const key = cacheId || prompt;

  // 1. Check cache first
  if (aiCache[key]) {
    return aiCache[key];
  }

  // 2. Check for active cooldown (prevent spamming after 429)
  const now = Date.now();
  if (now - last429Time < COOLDOWN_DURATION) {
    return fallback;
  }

  // 3. Check API Key
  if (!GEMINI_API_KEY) {
    console.warn("GIA Shield: Gemini API Key missing.");
    return fallback;
  }

  try {
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Store in cache
    aiCache[key] = text;
    return text;
  } catch (error: any) {
    const errorString = String(error);
    
    if (errorString.includes("429") || error?.status === 429) {
      last429Time = Date.now();
      console.warn("GIA Shield: Gemini API Rate Limit (429) detected. Throttling for 60s.");
    } else {
      console.warn("GIA Shield: AI Insight engine encountered an error.", error);
    }
    
    return fallback;
  }
}
