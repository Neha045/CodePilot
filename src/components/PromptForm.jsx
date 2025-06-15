import React, { useState } from "react";

const PromptForm = ({ onSubmit }) => {
  const [input, setInput] = useState("");
  const [taskType, setTaskType] = useState("Explain");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSubmit({ taskType, input });
    setInput("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-3xl mx-auto"
    >
      <label className="text-white text-sm font-semibold">
        Select Task Type:
      </label>
      <select
        value={taskType}
        onChange={(e) => setTaskType(e.target.value)}
        className="p-2 rounded-md bg-gray-700 text-white focus:outline-none"
      >
        <option>Explain</option>
        <option>Debug</option>
        <option>Optimize</option>
        <option>Review</option>
        <option>Convert to TypeScript</option>
      </select>

      <label className="text-white text-sm font-semibold">
        Enter Your Prompt:
      </label>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Paste your code or ask a question..."
        rows={1}
        className="p-3 rounded-md bg-gray-700 text-white resize-none focus:outline-none overflow-hidden min-h-[3rem]"
        onInput={(e) => {
          e.target.style.height = "auto";
          e.target.style.height = `${e.target.scrollHeight}px`;
        }}
      />

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md self-end"
      >
        🚀 Run
      </button>
    </form>
  );
};

export default PromptForm;
