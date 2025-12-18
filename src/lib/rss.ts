export interface ResearchArticle {
  title: string;
  link: string;
  pubDate: string;
  description: string;
}

export async function fetchResearchArticles(url: string): Promise<ResearchArticle[]> {
  try {
    const response = await fetch(url);
    const xml = await response.text();
    
    // Minimal XML parsing using regex for the sake of simplicity and zero-deps
    // In a real production app, use an actual XML parser like 'rss-parser'
    const items = xml.match(/<item>([\s\S]*?)<\/item>/g) || [];
    
    return items.slice(0, 5).map(item => {
      const title = item.match(/<title><!\[CDATA\[([\s\S]*?)\]\]><\/title>/)?.[1] || 
                    item.match(/<title>([\s\S]*?)<\/title>/)?.[1] || "";
      const link = item.match(/<link>([\s\S]*?)<\/link>/)?.[1] || "";
      const pubDate = item.match(/<pubDate>([\s\S]*?)<\/pubDate>/)?.[1] || "";
      const description = item.match(/<description><!\[CDATA\[([\s\S]*?)\]\]><\/description>/)?.[1] || 
                          item.match(/<description>([\s\S]*?)<\/description>/)?.[1] || "";
      
      return { 
        title: title.trim(), 
        link: link.trim(), 
        pubDate: new Date(pubDate).toLocaleDateString('en-GB', { year: 'numeric', month: 'short' }),
        description: description.replace(/<[^>]*>/g, '').slice(0, 160) + '...'
      };
    });
  } catch (error) {
    console.error("Error fetching RSS:", error);
    return [];
  }
}
