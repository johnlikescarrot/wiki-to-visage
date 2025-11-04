import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { content, title, duration = 60, style = 'informative' } = await req.json();
    
    if (!content) {
      throw new Error('Content is required');
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    console.log('Generating script for:', title);
    console.log('Target duration:', duration, 'seconds');
    console.log('Style:', style);

    const stylePrompts = {
      informative: 'Create an informative, educational narration suitable for learning.',
      engaging: 'Create an engaging, dynamic narration that captures attention.',
      documentary: 'Create a documentary-style narration with dramatic pauses and emphasis.',
      casual: 'Create a casual, conversational narration as if explaining to a friend.'
    };

    const systemPrompt = `You are a professional video script writer specializing in converting Wikipedia articles into compelling video narrations.

Your task:
1. Convert the provided content into a natural, engaging video script
2. Target duration: approximately ${duration} seconds (roughly ${Math.floor(duration / 2.5)} words)
3. Style: ${stylePrompts[style as keyof typeof stylePrompts] || stylePrompts.informative}
4. Structure the script with clear narrative flow
5. Include natural pauses and emphasis points marked with [pause]
6. Make it engaging for viewers while remaining factually accurate

Format your response as a JSON object with:
{
  "script": "the complete narration script",
  "estimatedDuration": number in seconds,
  "wordCount": number of words,
  "scenes": [
    {
      "text": "narration for this scene",
      "duration": seconds,
      "visualSuggestion": "description of what should be shown"
    }
  ]
}`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Title: ${title}\n\nContent:\n${content.substring(0, 5000)}` }
        ],
        response_format: { type: "json_object" }
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'AI credits depleted. Please add credits to continue.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      const errorText = await response.text();
      console.error('AI Gateway error:', response.status, errorText);
      throw new Error('Failed to generate script');
    }

    const data = await response.json();
    const generatedContent = JSON.parse(data.choices[0].message.content);

    console.log('Script generated successfully');
    console.log('Word count:', generatedContent.wordCount);
    console.log('Estimated duration:', generatedContent.estimatedDuration);

    return new Response(
      JSON.stringify(generatedContent),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error generating script:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
