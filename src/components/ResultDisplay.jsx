import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const ResultDisplay = ({ result }) => {
  if (!result) return null;

  const formatMessage = (message) => {
    const codeRegex = /```([a-z]*)\n([\s\S]*?)```/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = codeRegex.exec(message)) !== null) {
      const [full, lang, code] = match;
      const index = match.index;

      // Add non-code text
      if (index > lastIndex) {
        parts.push(<p key={index}>{message.slice(lastIndex, index)}</p>);
      }

      // Add code block
      parts.push(
        <SyntaxHighlighter
          key={index + '-code'}
          language={lang || 'javascript'}
          style={vscDarkPlus}
          customStyle={{
            borderRadius: '10px',
            marginTop: '1rem',
            fontSize: '0.875rem',
            lineHeight: 1.5,
          }}
        >
          {code.trim()}
        </SyntaxHighlighter>
      );

      lastIndex = index + full.length;
    }

    // Add remaining text
    if (lastIndex < message.length) {
      parts.push(<p key="last">{message.slice(lastIndex)}</p>);
    }

    return parts;
  };

  return (
    <div className="bg-gray-900 text-white p-4 rounded-md shadow-lg overflow-auto">
      {formatMessage(result)}
    </div>
  );
};

export default ResultDisplay;
