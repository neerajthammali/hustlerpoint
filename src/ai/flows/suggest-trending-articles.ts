'use server';

/**
 * @fileOverview An AI agent for suggesting trending articles based on user engagement metrics and content similarity.
 *
 * - suggestTrendingArticles - A function that suggests trending articles for the sidebar.
 * - SuggestTrendingArticlesInput - The input type for the suggestTrendingArticles function.
 * - SuggestTrendingArticlesOutput - The return type for the suggestTrendingArticles function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestTrendingArticlesInputSchema = z.object({
  articleTitles: z.array(z.string()).describe('A list of article titles.'),
  articleExcerpts: z.array(z.string()).describe('A list of short excerpts from each article.'),
  engagementMetrics: z.array(z.number()).describe('A list of engagement scores for each article.'),
  numberOfSuggestions: z.number().describe('The number of trending articles to suggest.'),
});
export type SuggestTrendingArticlesInput = z.infer<typeof SuggestTrendingArticlesInputSchema>;

const SuggestTrendingArticlesOutputSchema = z.object({
  suggestedArticles: z.array(z.string()).describe('A list of suggested trending article titles.'),
});
export type SuggestTrendingArticlesOutput = z.infer<typeof SuggestTrendingArticlesOutputSchema>;

export async function suggestTrendingArticles(input: SuggestTrendingArticlesInput): Promise<SuggestTrendingArticlesOutput> {
  return suggestTrendingArticlesFlow(input);
}

const suggestTrendingArticlesPrompt = ai.definePrompt({
  name: 'suggestTrendingArticlesPrompt',
  input: {schema: SuggestTrendingArticlesInputSchema},
  output: {schema: SuggestTrendingArticlesOutputSchema},
  prompt: `You are an expert blog curator who suggests trending articles for a website sidebar.

  Given the following articles with their titles, excerpts, and engagement metrics, select the top {{numberOfSuggestions}} most trending articles.

  Do not suggest articles that are not in the provided list.

  Article Titles: {{articleTitles}}
  Article Excerpts: {{articleExcerpts}}
  Engagement Metrics: {{engagementMetrics}}

  Output only a JSON array of the article titles that you recommend.
  `,
});

const suggestTrendingArticlesFlow = ai.defineFlow(
  {
    name: 'suggestTrendingArticlesFlow',
    inputSchema: SuggestTrendingArticlesInputSchema,
    outputSchema: SuggestTrendingArticlesOutputSchema,
  },
  async input => {
    const {output} = await suggestTrendingArticlesPrompt(input);
    return output!;
  }
);
