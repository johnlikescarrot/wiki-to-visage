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
    const { url } = await req.json();
    
    if (!url) {
      throw new Error('Wikipedia URL is required');
    }

    console.log('Parsing Wikipedia URL:', url);

    // Extract article title from URL
    const urlMatch = url.match(/\/wiki\/([^?#]+)/);
    if (!urlMatch) {
      throw new Error('Invalid Wikipedia URL format');
    }

    const articleTitle = decodeURIComponent(urlMatch[1]);
    
    // Fetch article content from Wikipedia API
    const apiUrl = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts|pageimages&titles=${encodeURIComponent(articleTitle)}&explaintext=1&exsectionformat=wiki&piprop=original&origin=*`;
    
    const response = await fetch(apiUrl);
    const data = await response.json();
    
    const pages = data.query.pages;
    const pageId = Object.keys(pages)[0];
    
    if (pageId === '-1') {
      throw new Error('Article not found');
    }
    
    const page = pages[pageId];
    const content = page.extract || '';
    const thumbnail = page.original?.source || null;
    
    // Extract sections (simplified - split by == Section == markers)
    const sections = [];
    const lines = content.split('\n');
    let currentSection = { title: 'Introduction', content: '' };
    
    for (const line of lines) {
      const sectionMatch = line.match(/^==+\s*(.+?)\s*==+$/);
      if (sectionMatch) {
        if (currentSection.content.trim()) {
          sections.push(currentSection);
        }
        currentSection = { title: sectionMatch[1], content: '' };
      } else {
        currentSection.content += line + '\n';
      }
    }
    
    if (currentSection.content.trim()) {
      sections.push(currentSection);
    }

    console.log('Successfully parsed article:', articleTitle);
    console.log('Found sections:', sections.length);

    return new Response(
      JSON.stringify({
        title: page.title,
        thumbnail,
        summary: content.substring(0, 500) + '...',
        sections: sections.map(s => ({
          ...s,
          content: s.content.substring(0, 1000) // Limit section content
        })),
        fullContent: content,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error parsing Wikipedia:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { 
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
