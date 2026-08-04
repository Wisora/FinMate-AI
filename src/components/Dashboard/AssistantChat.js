import React, { useState } from 'react';
import { getAssistantResponse } from '../../services/assistantService';

function AssistantChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    const userMessage = { type: "user", text: input };
    const aiMessage = { type: "ai", text: getAssistantResponse(input) };
    setMessages([...messages, userMessage, aiMessage]);
    setInput("");
  };

  return (
    <div className="assistant-chat" role="region" aria-label="AI Assistant Chat">
      <h3>💬 FinMate AI Assistant</h3>
      <div className="chat-window">
        {messages.map((msg, idx) => (
          <div key={idx} className={`chat-message ${msg.type}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input 
          type="text" 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          placeholder="Ask me about savings, reports, or goals..." 
          aria-label="Chat input"
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

export default AssistantChat;
