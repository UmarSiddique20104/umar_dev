import { NextResponse } from 'next/server';

// Function to check if a query is portfolio-relevant or a common conversational question
function isRelevantOrConversational(query: string): boolean {
  const relevantTopics = [
    'portfolio', 'project', 'skill', 'experience', 'education', 
    'contact', 'email', 'phone', 'umar', 'technology', 'work', 
    'background', 'expertise', 'python', 'django', 'react', 'next', 
    'typescript', 'development', 'linkedin', 'github', 'resume', 
    'cv', 'qualification', 'tech stack', 'location', 'lahore',
    'pakistan', 'hire', 'developer', 'web', 'programming'
  ];
  
  // Common conversational queries that should be allowed
  const conversationalQueries = [
    'hello', 'hi', 'hey', 'greetings', 'good morning', 'good afternoon', 
    'good evening', 'how are you', 'nice to meet you', 'who are you',
    'what can you do', 'help me', 'what should i ask', 'thanks', 
    'thank you', 'goodbye', 'bye', 'see you', 'talk later'
  ];
  
  const lowercaseQuery = query.toLowerCase();
  
  return relevantTopics.some(topic => lowercaseQuery.includes(topic)) || 
         conversationalQueries.some(phrase => lowercaseQuery.includes(phrase));
}

export async function POST(req: Request) {
  try {
    // Get API key and base URL from environment variables
    const apiKey = process.env.CHAT_API_KEY;
    const apiUrl = process.env.CHAT_API_URL;

    // Check if environment variables are set
    if (!apiKey || !apiUrl) {
      throw new Error('API key or URL not configured');
    }

    const body = await req.json();
    
    // Check if the query is relevant or conversational
    if (!isRelevantOrConversational(body.prompt)) {
      return NextResponse.json({ 
        notRelevant: true,
        response: "I can only answer questions about Umar's portfolio or assist with general inquiries about how I can help you navigate the portfolio."
      });
    }

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{
          role: 'system',
          content: `You are a helpful portfolio assistant for Umar Shafique, a Python Developer with expertise in Python, JavaScript, Django, React.js, Next.js, and TypeScript. 

When asked "who are you" or similar questions about your identity, respond: "I'm Umar's portfolio assistant, designed to help visitors learn about his skills and experience as a Python Developer."

Profile information:
- Location: Lahore, Pakistan
- Contact: Email (umer.shafiq0008@gmail.com), Phone (+923166622820), LinkedIn (umarxdev)

Technical Skills:
- Programming Languages: Python, JavaScript
- Frameworks: React.js, Next.js, Django, Flask, FastAPI
- Databases: PostgreSQL, MongoDB
- Cloud Computing: AWS, Azure
- Strong problem-solving and debugging abilities

Honors and Awards:
- HTML, CSS, and Javascript certification from Johns Hopkins University (Coursera) - February 2024
- Frontend Development using React certification from Board Infinity - July 2024

Keep responses brief, professional, and focused on Umar's professional portfolio information. Always be helpful and conversational.`
        }, {
          role: 'user',
          content: body.prompt
        }],
        temperature: 0.7,
        max_tokens: 150
      }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json({ response: data.choices[0].message.content.trim() });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to get response' }, { status: 500 });
  }
}
