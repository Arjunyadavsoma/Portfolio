import { ChatResponse } from '@/types/portfolio';

export class GroqClient {
  private baseUrl = '/api';

  async sendMessage(message: string): Promise<ChatResponse> {
    const response = await fetch(`${this.baseUrl}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      throw new Error('Failed to send message');
    }

    return response.json();
  }

  async getPortfolioData() {
    const response = await fetch(`${this.baseUrl}/portfolio-data`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch portfolio data');
    }

    return response.json();
  }
}

export const groqClient = new GroqClient();
