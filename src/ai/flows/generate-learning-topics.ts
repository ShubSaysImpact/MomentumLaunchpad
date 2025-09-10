'use server';
/**
 * @fileOverview Generates a list of recommended learning topics and resources based on a user's goals and tasks.
 *
 * - generateLearningTopics - A function that generates learning recommendations.
 * - GenerateLearningTopicsInput - The input type for the generateLearningTopics function.
 * - GenerateLearningTopicsOutput - The return type for the generateLearningTopics function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

export const GenerateLearningTopicsInputSchema = z.object({
  goals: z.array(z.string()).describe('A list of the user\'s current goals.'),
  tasks: z.array(z.string()).describe('A list of the user\'s current tasks.'),
});

export type GenerateLearningTopicsInput = z.infer<
  typeof GenerateLearningTopicsInputSchema
>;

const ResourceSchema = z.object({
    title: z.string().describe('The title of the article, video, or course.'),
    type: z.enum(['article', 'video', 'course']).describe('The type of the resource.'),
    url: z.string().url().describe('The URL link to the resource.'),
});

const LearningTopicSchema = z.object({
    topic: z.string().describe('The name of the learning topic.'),
    description: z.string().describe('A brief explanation of why this topic is relevant to the user\'s goals and tasks.'),
    resources: z.array(ResourceSchema).describe('A list of 2-3 recommended online resources for this topic.'),
});


export const GenerateLearningTopicsOutputSchema = z.object({
  learningTopics: z.array(LearningTopicSchema).describe('A list of recommended learning topics.'),
});

export type GenerateLearningTopicsOutput = z.infer<
  typeof GenerateLearningTopicsOutputSchema
>;

export async function generateLearningTopics(
  input: GenerateLearningTopicsInput
): Promise<GenerateLearningTopicsOutput> {
  return generateLearningTopicsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateLearningTopicsPrompt',
  input: {schema: GenerateLearningTopicsInputSchema},
  output: {schema: GenerateLearningTopicsOutputSchema},
  prompt: `You are an expert AI coach for founders. Your task is to analyze a founder's goals and tasks, identify knowledge gaps or areas for skill development, and recommend relevant learning topics.

For each topic, provide a brief description of its relevance and find 2-3 high-quality, real, and publicly accessible online resources (articles, videos, or courses). Do not suggest resources that are behind a paywall or require a subscription if a free alternative is available.

Analyze the following goals and tasks:

Goals:
{{#each goals}}
- {{{this}}}
{{/each}}

Tasks:
{{#each tasks}}
- {{{this}}}
{{/each}}

Based on this analysis, generate a list of recommended learning topics with relevant resources.`,
});

const generateLearningTopicsFlow = ai.defineFlow(
  {
    name: 'generateLearningTopicsFlow',
    inputSchema: GenerateLearningTopicsInputSchema,
    outputSchema: GenerateLearningTopicsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
