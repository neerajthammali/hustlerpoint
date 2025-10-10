

import { type Article, type Stat } from './types';

// This file now contains only static data for stats, as articles are fetched from Firestore.
const stats: Stat[] = [
  { label: 'Total Demographics', value: 6273, growth: 15.7 },
  { label: 'Total Engagements', value: 17, growth: 55.3 },
  { label: 'Article Views', value: 546, growth: 93 },
];

const articles: Article[] = [
  {
    id: '1',
    slug: 'the-future-of-work-is-hybrid',
    title: 'The Future of Work is Hybrid: Are You Ready?',
    excerpt: 'Explore the evolving landscape of work and how companies are adapting to a hybrid model for a more flexible and productive workforce.',
    category: 'Tech Culture',
    imageId: 'article-1',
    author: 'Hustler Point Editorial',
    publishedDate: 'July 15, 2024',
    content: 'The debate between remote and in-office work has dominated conversations for the past two years. But as the dust settles, a new model is emerging as the clear winner: hybrid work.\n\nCompanies big and small are realizing that flexibility is the key to attracting and retaining top talent. A hybrid model offers the best of both worlds: the collaboration and camaraderie of the office, combined with the autonomy and focus of remote work. But making it work requires more than just a policy change; it demands a fundamental shift in company culture and technology.\n\nSuccessful hybrid teams rely on asynchronous communication, robust digital tools, and a high level of trust. It\'s about focusing on output rather than hours logged. This transition is not without its challenges, including proximity bias and ensuring equitable experiences for all employees, regardless of their location. However, the organizations that navigate these challenges successfully will be the ones that thrive in the new era of work.',
    featured: true,
    engagement: 85,
    status: 'published',
  },
  {
    id: '2',
    slug: 'navigating-the-creator-economy',
    title: 'Navigating the Creator Economy: A Guide for Aspiring Influencers',
    excerpt: 'The creator economy is booming. Here’s how you can turn your passion into a profession and build a sustainable career online.',
    category: 'Creators',
    imageId: 'article-2',
    author: 'Hustler Point Editorial',
    publishedDate: 'July 10, 2024',
    content: 'The creator economy is no longer a niche industry; it\'s a global phenomenon valued at over $100 billion. From YouTubers to TikTokers, podcasters to newsletter writers, individuals are building empires from their bedrooms. But how do you go from a hobbyist to a professional creator?\n\nThe first step is finding your niche. What are you passionate about? What unique perspective can you offer? Once you\'ve identified your niche, consistency is key. Regularly producing high-quality content is non-negotiable for building an audience.\n\nMonetization is the next hurdle. While ad revenue is a common starting point, the most successful creators diversify their income streams. This can include brand partnerships, merchandise, affiliate marketing, and offering exclusive content through platforms like Patreon or Substack. Building a direct relationship with your audience is the most valuable asset you can have.',
    featured: true,
    engagement: 92,
    status: 'published',
  },
  {
    id: '3',
    slug: 'ai-tools-that-will-10x-your-productivity',
    title: '5 AI Tools That Will 10x Your Productivity',
    excerpt: 'Artificial intelligence is not just for tech giants. Discover five accessible AI tools that can automate tasks, spark creativity, and give you back hours in your day.',
    category: 'Tech',
    imageId: 'article-3',
    author: 'Hustler Point Editorial',
    publishedDate: 'July 5, 2024',
    content: 'Artificial Intelligence has moved from sci-fi to a practical tool that can revolutionize your daily workflow. You don\'t need to be a data scientist to leverage its power. Here are five AI tools that can dramatically boost your productivity.\n\n1. ChatGPT/Claude: For brainstorming, writing assistance, and summarizing long documents. 2. Midjourney/DALL-E: For generating unique images for presentations, blog posts, and social media. 3. Notion AI: For organizing your notes, projects, and creating summaries within your workspace. 4. Perplexity AI: A conversational search engine that provides direct answers with sources, saving you from sifting through search results. 5. Fireflies.ai: For automatically transcribing and summarizing your meetings.\n\nBy integrating these tools into your routine, you can offload repetitive tasks and focus on high-impact work that requires your unique human skills. The age of the AI-powered hustler is here.',
    featured: false,
    engagement: 98,
    status: 'published',
  },
  {
    id: '4',
    slug: 'from-side-hustle-to-main-gig',
    title: 'From Side Hustle to Main Gig: How to Scale Your Passion Project',
    excerpt: 'Is your side project showing signs of becoming something more? Here are the critical steps to take when scaling your side hustle into a full-time business.',
    category: 'Startups',
    imageId: 'article-4',
    author: 'Hustler Point Editorial',
    publishedDate: 'June 28, 2024',
    content: 'Every successful startup begins with an idea, and for many, that idea starts as a side hustle. Juggling a full-time job while building a business is demanding, but it\'s also a low-risk way to validate your concept. But what happens when your side project gains traction? How do you know when it\'s time to make the leap?\n\nThe key is to look for consistent revenue. Is your side hustle generating enough income to cover your basic living expenses? It\'s not just about one good month; you need to see a predictable pattern of growth. Beyond financials, consider demand. Are you turning away customers because you don\'t have enough time?\n\nBefore you quit your day job, make sure you have a solid business plan. Understand your target market, your operational needs, and have a clear strategy for growth. It\'s a daunting step, but with careful planning, your side hustle can become the main event.',
    featured: true,
    engagement: 75,
    status: 'published',
  },
  {
    id: '5',
    slug: 'the-art-of-the-pitch-deck',
    title: 'The Art of the Pitch Deck: Storytelling for Startups',
    excerpt: 'A great idea is not enough. To secure funding, you need a compelling story. Learn how to craft a pitch deck that captivates investors and tells the story of your startup.',
    category: 'Startups',
    imageId: 'article-5',
    author: 'Hustler Point Editorial',
    publishedDate: 'June 20, 2024',
    content: 'For early-stage founders, the pitch deck is the single most important document. It\'s your first impression on potential investors, and it needs to be perfect. But a common mistake is to fill it with dry data and technical jargon. A great pitch deck is not a report; it\'s a story.\n\nYour story should have a clear protagonist (your customer), a villain (the problem they face), and a hero (your solution). Start by clearly articulating the problem. Why is it significant? How are people dealing with it now? Then, introduce your solution and explain why it\'s uniquely positioned to win. Show, don\'t just tell. Use visuals, mockups, and early user testimonials to bring your vision to life.\n\nEnd with a clear ask. How much are you raising, and what will you use it for? A compelling story, backed by solid data on your team, market size, and traction, is the formula for a pitch deck that gets funded.',
    featured: true,
    engagement: 88,
    status: 'published',
  },
];


export function getStats(): Stat[] {
  return stats;
}

// These functions are now deprecated as we fetch articles from Firestore.
// They are kept here for reference or potential fallback.
export function getArticles(): Article[] {
  return articles.filter(a => a.status === 'published');
}

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}

export function getEditorsPicks(): Article[] {
    const editorsPicksSlugs = ['the-art-of-the-pitch-deck', 'ai-tools-that-will-10x-your-productivity', 'from-side-hustle-to-main-gig'];
    return articles.filter(article => editorsPicksSlugs.includes(article.slug));
}
