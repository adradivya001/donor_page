/**
 * Sakhi SLM Service
 * Communicates with the local Ollama instance running the 'sakhi' model.
 */

const OLLAMA_URL = "http://localhost:11434/api/generate";

export const askSakhi = async (prompt) => {
  try {
    const response = await fetch(OLLAMA_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "sakhi",
        prompt: prompt,
        stream: false,
      }),
    });

    if (!response.ok) {
      throw new Error(`Ollama error: ${response.statusText}`);
    }

    const data = await response.json();
    const fullResponse = data.response;

    // Parse the response using the ###SPLIT### delimiter defined in Modelfile
    const [answer, followUpsRaw] = fullResponse.split("###SPLIT###");

    return {
      answer: answer?.trim() || "I'm sorry, I couldn't process that.",
      suggestions: followUpsRaw 
        ? followUpsRaw.trim().split("\n").map(q => q.replace(/^\d+\.\s*/, "").trim()) 
        : []
    };
  } catch (error) {
    console.error("Sakhi SLM Connection Error:", error);
    return {
      answer: "I am sorry, I am having trouble connecting to my healthcare database right now. Please try again later.",
      suggestions: ["What are your clinic locations?", "Tell me about IVF", "How can I contact a doctor?"]
    };
  }
};
