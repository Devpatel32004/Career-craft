import { Inngest } from "inngest";

// Create a client to send and receive events
export const inngest = new Inngest({
  id: "sensai-ai-carrer-coach",
  name: "sensai-ai-carrer-coach",
  credentials: {
    gemini: {
      apiKey: process.env.GEMINI_API_KEY,
    },
  },
});
