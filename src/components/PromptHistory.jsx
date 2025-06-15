import React, { useState } from 'react';

const PromptHistory = ({ history }) => {
  const [openId, setOpenId] = useState(history?.[0]?.id || null);

  const toggleAccordion = (id) => {
    setOpenId(openId === id ? null : id);
  };

  if (!history || history.length === 0) return null;

  return (
    <div className="w-full max-w-4xl mx-auto mt-10">
      <h2 className="text-lg font-semibold mb-4">🕘 Prompt History</h2>
      <div className="space-y-3">
        {history.map((item) => (
          <div key={item.id} className="border border-gray-600 rounded-md">
            <button
              onClick={() => toggleAccordion(item.id)}
              className="w-full text-left px-4 py-3 bg-gray-700 hover:bg-gray-600 text-white font-mono text-sm flex justify-between items-center"
            >
              <span>[{item.taskType}] {item.input.slice(0, 50)}...</span>
              <span>{openId === item.id ? '▲' : '▼'}</span>
            </button>

            {openId === item.id && (
              <div className="bg-gray-800 p-4 text-sm text-gray-200 whitespace-pre-wrap">
                <p className="text-gray-400 font-semibold mb-2">📝 Prompt:</p>
                {item.input}

                <hr className="my-3 border-gray-600" />

                <p className="text-gray-400 font-semibold mb-2">💡 Response:</p>
                {item.result}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PromptHistory;
