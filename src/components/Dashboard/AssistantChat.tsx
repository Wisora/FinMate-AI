import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, FinancialSummary } from '../../types';
import { useLanguage } from '../../i18n/LanguageContext';
import { sendChatMessage } from '../../services/assistantService';
import { Spinner } from '../common/Spinner';
import { Bot, User, Send, Sparkles, RefreshCw, Zap } from 'lucide-react';

interface AssistantChatProps {
  financialSummary: FinancialSummary;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'msg_welcome',
    sender: 'assistant',
    text: 'Hello! I am **FinMate AI**, your personal financial assistant. How can I help you today? You can ask me to analyze your savings, debt strategy, or generate an expense report!',
    timestamp: new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    }),
  },
];

const PROMPT_SUGGESTIONS = [
  'How much did I save last month?',
  'Generate a July expense report.',
  'How can I pay off my credit card faster?',
  'Recommend an investment strategy for my surplus.',
];

export const AssistantChat: React.FC<AssistantChatProps> = ({
  financialSummary,
}) => {
  const { t, language, currency } = useLanguage();
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = localStorage.getItem('finmate_chat_history');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to load chat history', e);
    }
    return INITIAL_MESSAGES;
  });

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    try {
      localStorage.setItem(
        'finmate_chat_history',
        JSON.stringify(messages.slice(-20))
      );
    } catch (e) {
      console.warn('Failed to save chat history', e);
    }
  }, [messages]);

  const handleSend = async (textToSend?: string) => {
    const messageText = textToSend || input;
    if (!messageText.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: 'usr_' + Date.now(),
      sender: 'user',
      text: messageText,
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      const result = await sendChatMessage(
        messageText,
        messages,
        financialSummary,
        language,
        currency
      );

      const botMsg: ChatMessage = {
        id: 'bot_' + Date.now(),
        sender: 'assistant',
        text: result.text,
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
        isFallback: result.isFallback,
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error('Chat error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setMessages(INITIAL_MESSAGES);
    localStorage.removeItem('finmate_chat_history');
  };

  return (
    <div className="flex flex-col h-[520px] rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 bg-slate-900 text-white border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-emerald-500 text-white shadow-md">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-base flex items-center gap-2">
              <span>{t('assistantChatTitle')}</span>
              <span className="px-2 py-0.5 text-[10px] font-extrabold uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full">
                Gemini 3.6
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Contextual financial guidance in {language.toUpperCase()}
            </p>
          </div>
        </div>

        <button
          onClick={handleClear}
          title="Reset conversation"
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50 dark:bg-slate-900/40">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 max-w-[88%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                msg.sender === 'user'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-emerald-600 text-white'
              }`}
            >
              {msg.sender === 'user' ? (
                <User className="w-4 h-4" />
              ) : (
                <Bot className="w-4 h-4" />
              )}
            </div>

            <div
              className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                msg.sender === 'user'
                  ? 'bg-indigo-600 text-white rounded-tr-none'
                  : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 rounded-tl-none'
              }`}
            >
              <div className="whitespace-pre-line font-sans">{msg.text}</div>
              <div
                className={`text-[10px] mt-2 flex items-center justify-end gap-1 ${
                  msg.sender === 'user' ? 'text-indigo-200' : 'text-slate-400'
                }`}
              >
                <span>{msg.timestamp}</span>
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex gap-3 max-w-[80%] mr-auto items-center text-slate-500 dark:text-slate-400 text-xs p-3">
            <Bot className="w-5 h-5 text-emerald-500 animate-bounce" />
            <Spinner size="sm" label="FinMate AI is thinking..." />
            <span>
              FinMate AI is generating personalized financial advice...
            </span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompt Chips */}
      <div className="px-4 py-2.5 bg-white dark:bg-slate-800 border-t border-slate-100 dark:border-slate-700/80 flex items-center gap-2 overflow-x-auto no-scrollbar">
        <Sparkles className="w-4 h-4 text-emerald-500 shrink-0" />
        {PROMPT_SUGGESTIONS.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(prompt)}
            disabled={loading}
            className="whitespace-nowrap px-3 py-1 text-xs font-medium rounded-full bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 dark:bg-slate-700 dark:hover:bg-emerald-950/60 dark:hover:text-emerald-300 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600 transition-colors shrink-0"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="p-3 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 flex items-center gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t('askAnything')}
          disabled={loading}
          className="flex-1 px-4 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          aria-label={t('send')}
          className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-semibold transition-colors focus:ring-2 focus:ring-emerald-500 focus:outline-none"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
