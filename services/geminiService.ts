import { GoogleGenAI } from "@google/genai";
import { TelemetryData } from "../types";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API_KEY is not defined in the environment.");
  }
  return new GoogleGenAI({ apiKey });
};

export const analyzeTelemetry = async (
  data: TelemetryData, 
  predictedGear: number
): Promise<string> => {
  try {
    const ai = getClient();
    const prompt = `
      You are an expert automotive engineer and driving instructor.
      Analyze the following telemetry snapshot from a vehicle:
      
      - Speed: ${data.speedKmh} km/h
      - RPM: ${data.rpm}
      - Throttle: ${data.throttlePct}%
      - Engine Load: ${data.engineLoadPct}%
      - Current Gear (Predicted): ${predictedGear}

      Provide a concise 2-3 sentence analysis. 
      1. Is the gear selection appropriate for this speed and RPM?
      2. Briefly describe the likely driving scenario (e.g., "Aggressive highway merge", "Efficient cruising", "Struggling up an incline").
      
      Keep the tone professional but accessible.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Analysis unavailable.";
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return "Unable to generate analysis at this time. Please check your API key.";
  }
};
