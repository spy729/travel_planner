import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY, // make sure to use VITE_ prefix for Vite
});

export const generateTripPlan = async (formData) => {
  const { location, noOfDays, traveler, budget } = formData;

  const userPrompt = `Generate Travel Plan for Location: ${location}, for ${noOfDays} Days for ${traveler} with a ${budget} budget. 
Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions 
and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time travel each 
of the location for ${noOfDays} days with each day plan with best time to visit in JSON format.`;

  const contents = [
    {
      role: "user",
      parts: [{ text: userPrompt }],
    },
  ];

  try {
    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash", // or "gemini-2.5-flash" if available
      contents,
    });

    // const textResponse = response.response.parts[0].text;

    // // Optionally parse JSON if you want structured data
    // const jsonStart = textResponse.indexOf('{');
    // const jsonEnd = textResponse.lastIndexOf('}');
    // const jsonString = textResponse.substring(jsonStart, jsonEnd + 1);

    return response;

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
