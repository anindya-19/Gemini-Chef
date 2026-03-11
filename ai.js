import { GoogleGenerativeAI } from "@google/generative-ai";

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page
`
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-3.1-flash-lite-preview" });

export async function getRecipeFromGemini(ingredientsArr) {
    const ingredientsString = ingredientsArr.join(", ");
    const prompt = `${SYSTEM_PROMPT} I have: ${ingredientsString}. Please give me a recipe!`;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (err) {
        console.error("Gemini Error:", err);
        return "Chef Claude is having trouble thinking. Try again later!";
    }
}


