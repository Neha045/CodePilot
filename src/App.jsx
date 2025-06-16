import "./App.css";
import { useState } from "react";
import PromptForm from "./components/PromptForm";
import ResultDisplay from "./components/ResultDisplay";
import PromptHistory from './components/PromptHistory';

const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;

function App() {
  const [result, setResult] = useState("");
  const [history, setHistory] = useState([]);

  const handleSubmit = async ({ taskType, input }) => {
    setResult("⏳ Thinking...");
    try {
      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization:
              `Bearer ${apiKey}`,
              "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "deepseek/deepseek-chat-v3-0324:free",
            messages: [
              {
                role: "system",
                content: `You are CodePilot, an expert developer assistant. Help the user with the task: "${taskType}".`,
              },
              {
                role: "user",
                content: input,
              },
            ],
          }),
        }
      );

      const data = await response.json();
      console.log("API Response:", data); // 👈 Add this

      const message = data?.choices?.[0]?.message?.content;
      setResult(message || "⚠️ No response received.");

      setHistory((prev) => [
        {
          id: Date.now(),
          taskType,
          input,
          result: data.choices[0].message.content,
        },
        ...prev,
      ]);
    } catch (error) {
      console.error("API Error:", error);
      setResult("❌ Error: Could not fetch result.");
    }
  };

  return (
    <div className="w-full h-screen bg-gradient-to-tr from-gray-50 to-blue-100 flex items-center justify-center">
      <div className="w-full h-full max-w-[1400px] px-8 py-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <PromptForm onSubmit={handleSubmit} />
        <ResultDisplay result={result} />
        <PromptHistory history={history} />
      </div>
    </div>
  );
}

export default App;
