import "./App.css";
import { useState } from "react";
import PromptForm from "./components/PromptForm";
import ResultDisplay from "./components/ResultDisplay";
import PromptHistory from "./components/PromptHistory";

function App() {
  const [result, setResult] = useState("");
  const [history, setHistory] = useState([]);

  const handleSubmit = async ({ taskType, input }) => {
    setResult("⏳ Thinking...");
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ taskType, input }),
      });

      const data = await response.json();
      console.log("API Response:", data);

      const message = data?.choices?.[0]?.message?.content;
      setResult(message || "⚠️ No response received.");

      setHistory((prev) => [
        {
          id: Date.now(),
          taskType,
          input,
          result: message,
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
