import React, { useState, useRef, useEffect } from 'react';

export interface FinancialSummary {
  totalIncome?: number;
  totalExpenses?: number;
  netSavings?: number;
  savingsRate?: number;
  currency?: string;
}

export interface AssistantChatProps {
  financialSummary?: FinancialSummary;
}

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
}

export function AssistantChat({ financialSummary }: AssistantChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'assistant',
      text: 'Hello! How can I help you manage your finances today?',
    },
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView?.({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: input,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    // Simulated response incorporating financialSummary context if present
    setTimeout(() => {
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: financialSummary
          ? `I noticed your net savings rate is ${financialSummary.savingsRate}%. Let me help you optimize that!`
          : 'I received your message! Let me know if you need financial insights.',
      };
      setMessages((prev) => [...prev, assistantMsg]);
    }, 500);
  };

  return (
    <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '16px', maxWidth: '400px' }}>
      <h3>Financial Assistant</h3>
      <div style={{ height: '200px', overflowY: 'auto', marginBottom: '12px' }}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            style={{
              textAlign: msg.sender === 'user' ? 'right' : 'left',
              margin: '8px 0',
            }}
          >
            <span
              style={{
                background: msg.sender === 'user' ? '#0070f3' : '#e5e7eb',
                color: msg.sender === 'user' ? '#fff' : '#000',
                padding: '6px 12px',
                borderRadius: '12px',
                display: 'inline-block',
              }}
            >
              {msg.text}
            </span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSend} style={{ display: 'flex', gap: '8px' }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question..."
          aria-label="Chat input"
          style={{ flex: 1, padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <button type="submit" style={{ padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}>
          Send
        </button>
      </form>
    </div>
  );
}

export default AssistantChat;