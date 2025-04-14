import { db } from "../prisma";
import { inngest } from "./client";
import { GoogleGenerativeAI } from "@google/generative-ai";

const ai = new GoogleGenerativeAI(process.env.GEMINAI_API_KEY);
const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });

export const generateIndustryInsights = inngest.createFunction(
  {
    id: "generate-industry-insights",
    name: "Generate Industry Insights",
  },
  { cron: "0 0 * * 0" }, // Every Sunday at midnight}
  async ({ step }) => {
    const industries = await step.run("fetch industry", async () => {
      return await db.industryInsight.findMany({
        select: { industry: true },
      });
    });
    for (const { industry } of industries) {
      const prompt = `
      Analyze the current state of the ${industry} industry and provide insights in ONLY the following JSON format without any additional notes or explanations:
      {
        "salaryRanges": [
          { "role": "string", "min": number, "max": number, "median": number, "location": "string" }
        ],
        "growthRate": number,
        "demandLevel": "High" | "Medium" | "Low",
        "topSkills": ["skill1", "skill2"],
        "marketOutlook": "Positive" | "Neutral" | "Negative",
        "keyTrends": ["trend1", "trend2"],
        "recommendedSkills": ["skill1", "skill2"]
      }
      
      IMPORTANT: Return ONLY the JSON. No additional text, notes, or markdown formatting.
      Include at least 5 common roles for salary ranges.
      Growth rate should be a percentage.
      Include at least 5 skills and trends.
    `;
      const res = await step.ai.wrap(
        "gemini",
        async (p) => {
          return await model.generateContent(p);
        },
        prompt
      );

      const parts = res?.response?.candidates?.[0]?.content?.parts;

      const rawText =
        parts &&
        Array.isArray(parts) &&
        typeof parts[0] === "object" &&
        "text" in parts[0]
          ? (parts[0]).text
          : "";
      const cleanedText = rawText.replace(/```(?:json)?\n?|```/g, "").trim();

      const insights = JSON.parse(cleanedText);

      step.run(`store insights for ${industry}`, async () => {
        await db.industryInsight.update({
          where: { industry },
          data: {
            ...insights,
            lastUpdated: new Date(),
            nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          },
        });
      });
    }
  }
);
