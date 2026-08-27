import { ChatMessage } from '../types';

export const assistantService = {
  async sendMessage(userText: string): Promise<ChatMessage> {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText }),
      });

      if (!response.ok) throw new Error('API communication error');
      
      const data = await response.json();
      return {
        id: `msg_${Date.now()}`,
        sender: 'assistant',
        text: data.reply,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      // Graceful AI Fallback response
      return {
        id: `msg_fallback_${Date.now()}`,
        sender: 'assistant',
        text: "I'm having trouble connecting to Gemini AI right now. Based on your profile, focusing on your high-priority debt payoff yields the highest return!",
        timestamp: new Date().toISOString(),
        isFallback: true,
      };
    }
  },
};