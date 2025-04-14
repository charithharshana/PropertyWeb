// OpenAI client configuration
// This file sets up the connection to the OpenAI API for ad text generation

// Import OpenAI SDK (you would need to install it with: npm install openai)
// import OpenAI from 'openai';

/**
 * Generates ad text for a property based on highlights provided by the user
 * @param highlights - Keywords and highlights about the property
 * @returns Generated ad text
 */
export async function generateAdText(highlights: string): Promise<string> {
  // Check if API key is configured
  const apiKey = process.env.OPENAI_API_KEY;
  
  if (!apiKey) {
    console.warn('OpenAI API key not configured. Using fallback generation method.');
    return fallbackGeneration(highlights);
  }
  
  try {
    // This is a placeholder for the actual OpenAI API call
    // In a real implementation, you would:
    
    /*
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    
    const response = await openai.chat.completions.create({
      model: "gpt-4", // or another appropriate model
      messages: [
        {
          role: "system", 
          content: "You are a professional real estate copywriter. Create a compelling property description based on the highlights provided."
        },
        {
          role: "user",
          content: `Create a professional and appealing property listing description based on these highlights: ${highlights}`
        }
      ],
      max_tokens: 300,
    });
    
    return response.choices[0].message.content || fallbackGeneration(highlights);
    */
    
    // For now, return the fallback
    return fallbackGeneration(highlights);
    
  } catch (error) {
    console.error('Error generating ad text with OpenAI:', error);
    return fallbackGeneration(highlights);
  }
}

/**
 * Fallback generation method when OpenAI API isn't available
 * @param highlights - Keywords and highlights about the property
 * @returns Basic generated ad text
 */
function fallbackGeneration(highlights: string): string {
  // Simple text generation based on keywords
  const sentences = [
    `Discover this wonderful property! Key features include: ${highlights}.`,
    `Located in a desirable area, this property offers tremendous value.`,
    `Don't miss this opportunity to own such a charming property.`,
    `Contact us today to schedule a viewing of this exceptional home.`
  ];
  
  // Add conditional sentences based on keywords
  if (highlights.toLowerCase().includes('sunny') || highlights.toLowerCase().includes('bright')) {
    sentences.splice(1, 0, 'Enjoy bright, sunlit rooms throughout the day.');
  }
  
  if (highlights.toLowerCase().includes('renovated') || highlights.toLowerCase().includes('modern')) {
    sentences.splice(1, 0, 'The property benefits from recent renovations, offering modern comforts.');
  }
  
  if (highlights.toLowerCase().includes('quiet') || highlights.toLowerCase().includes('peaceful')) {
    sentences.splice(1, 0, 'Located on a peaceful street, ensuring a tranquil living environment.');
  }
  
  if (highlights.toLowerCase().includes('transport') || highlights.toLowerCase().includes('commute')) {
    sentences.splice(2, 0, 'Excellent transport links nearby make commuting a breeze.');
  }
  
  // Join the sentences into a paragraph
  return sentences.join(' ');
}