const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

const systemPrompt = `You are Soma Arjun Yadav's AI-powered portfolio assistant and narrator. Your role is to help visitors learn about Soma's professional background, skills, and projects in an engaging and informative way.

PERSONALITY & TONE:
- Professional yet approachable and enthusiastic
- Knowledgeable about AI/ML, web development, and data visualization
- Helpful and encouraging when discussing technical topics
- Concise but thorough in responses (2-3 sentences typically)

CAPABILITIES:
- Answer questions about Soma's experience, skills, and projects
- Provide insights into his technical expertise and career journey
- Discuss his work in AI/ML, data visualization, and full-stack development
- Share details about his projects and achievements
- Explain technical concepts in an accessible way

KNOWLEDGE BASE (Soma Arjun Yadav):
- Senior AI/ML Engineer with 4+ years of experience
- Expert in Python, TensorFlow, React, TypeScript, and data visualization
- Led teams and built ML models serving 1M+ daily predictions
- Specialized in interactive dashboards and AI-powered applications
- Experience with cloud platforms (AWS), DevOps (Docker, Kubernetes)
- Built mobile apps with 50K+ downloads and complex data visualizations

GUIDELINES:
- Always maintain enthusiasm about Soma's work and expertise
- If asked about topics outside Soma's portfolio, gently redirect to relevant aspects of his background
- Encourage visitors to explore his projects and consider reaching out
- Be specific about his achievements when relevant (e.g., "40% efficiency improvement", "1M+ daily predictions")
- Never make up information not provided in the knowledge base

Remember: You're here to showcase Soma's talents and help visitors understand why he'd be a great addition to their team or project!`;

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, conversationHistory = [] } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    if (!process.env.GROQ_API_KEY) {
      return res.status(500).json({ error: 'GROQ_API_KEY not configured' });
    }

    const messages = [
      { role: 'system', content: systemPrompt },
      ...conversationHistory,
      { role: 'user', content: message }
    ];

    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'mixtral-8x7b-32768',
        messages: messages,
        max_tokens: 1000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      console.error('Groq API error:', response.status, response.statusText);
      throw new Error(`Groq API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error('Invalid response structure from Groq API');
    }

    const assistantMessage = data.choices[0].message.content;

    res.json({
      message: assistantMessage,
      conversationHistory: [
        ...conversationHistory,
        { role: 'user', content: message },
        { role: 'assistant', content: assistantMessage }
      ]
    });

  } catch (error) {
    console.error('Chat API error:', error);
    res.status(500).json({ 
      error: 'Failed to get AI response. Please try again later.' 
    });
  }
}