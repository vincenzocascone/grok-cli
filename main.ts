// Import environment variables from .env file
import "jsr:@std/dotenv/load";

const API_URL = "https://api.x.ai/v1/chat/completions";
const API_KEY = Deno.env.get("GROK_API_KEY");

// Ensure the API key is present
if (!API_KEY) {
  console.error(
    "API key missing. Set GROK_API_KEY in the environment variables.",
  );
  Deno.exit(1);
}

// Stores the conversation history to pass context with each message.
const conversationHistory: { role: string; content: string }[] = [];

/**
 * Fetches a response from the Grok API based on user input.
 * @param prompt The user's input message
 */
async function fetchGrokResponse(prompt: string): Promise<void> {
  conversationHistory.push({ role: "user", content: prompt });

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "grok-beta",
        messages: conversationHistory,
      }),
    });

    if (!response.ok) {
      console.error(`API Error: ${response.status} ${response.statusText}`);
      const errorText = await response.text();
      console.error(`Details: ${errorText}`);
      return;
    }

    const data = await response.json();
    const botMessage =
      data.choices[0]?.message.content || "No response from Grok.";

    console.log("Grok:", botMessage);

    // Add Grok's response to the conversation history
    conversationHistory.push({ role: "assistant", content: botMessage });
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

/**
 * Initiates a conversational loop with the user.
 */
async function startConversation() {
  console.log(
    "You can start chatting with Grok! Type 'exit' to end the conversation.\n",
  );

  while (true) {
    const prompt = promptUser();

    if (prompt.toLowerCase() === "exit") {
      console.log("Ending conversation. Goodbye!");
      break;
    }

    await fetchGrokResponse(prompt);
  }
}

/**
 * Captures user input from the terminal.
 * @returns The input provided by the user
 */
function promptUser(): string {
  return prompt("You:")?.trim() || "";
}

// Start the conversation
await startConversation();
