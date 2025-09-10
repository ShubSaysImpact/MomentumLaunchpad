// src/ai/flows/generate-key-learning-points-from-reflections.ts
'use server';
/**
 * @fileOverview This file defines a Genkit flow for generating key learning points from weekly reflections.
 *
 * The flow takes weekly goals, successes, and outcomes as input, analyzes them using an AI prompt,
 * and generates key learning points. These learning points can then be added to the user's learnings board.
 *
 * @exports {generateKeyLearningPoints} - The main function to trigger the flow.
 * @exports {GenerateKeyLearningPointsInput} - The input type for the generateKeyLearningPoints function.
 * @exports {GenerateKeyLearningPointsOutput} - The output type for the generateKeyLearningPoints function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Define the input schema for the flow
const GenerateKeyLearningPointsInputSchema = z.object({
  weeklyGoals: z.string().describe("The user's intended goals for the week."),
  successes: z.string().describe('The successes and wins the user reported for the week.'),
  outcomes: z.string().describe('The actual outcomes, challenges, and surprises of the week.'),
});

export type GenerateKeyLearningPointsInput = z.infer<
  typeof GenerateKeyLearningPointsInputSchema
>;

// Define the output schema for the flow
const GenerateKeyLearningPointsOutputSchema = z.object({
  keyLearningPoints: z
    .string()
    .describe('A list of 1-3 key learning points, formatted as a simple list separated by newlines. Do not include markdown like "-" or numbers.'),
});

export type GenerateKeyLearningPointsOutput = z.infer<
  typeof GenerateKeyLearningPointsOutputSchema
>;

// Define the main function to trigger the flow
export async function generateKeyLearningPoints(
  input: GenerateKeyLearningPointsInput
): Promise<GenerateKeyLearningPointsOutput> {
  return generateKeyLearningPointsFlow(input);
}

// Define the AI prompt
const prompt = ai.definePrompt({
  name: 'generateKeyLearningPointsPrompt',
  input: {schema: GenerateKeyLearningPointsInputSchema},
  output: {schema: GenerateKeyLearningPointsOutputSchema},
  prompt: `You are an expert AI coach for founders. Your task is to analyze a founder's weekly reflection and synthesize 1-3 key learning points. Do not just summarize the inputs; instead, analyze the relationship between their intended goals, their reported successes, and the actual outcomes (including challenges). Extract the most significant pattern, insight, or area for improvement. The output should be a clear, easy-to-read list. Each learning point must be on a new line. Do not use any markdown formatting like "-" or numbering.

For example, if a goal was "Onboard 3 clients," a success was "Had great conversations," and an outcome was "Onboarded 1 client, but discovered my pricing is too low," a good key learning would be: "Your conversations are effective at building rapport, but there's a disconnect between the value you communicate and your pricing structure that's hindering final conversions."

Analyze the following reflection:

Weekly Goals: {{{weeklyGoals}}}
Successes: {{{successes}}}
Outcomes & Challenges: {{{outcomes}}}

Synthesize the Key Learning Points based on your analysis:`,
});

// Define the Genkit flow
const generateKeyLearningPointsFlow = ai.defineFlow(
  {
    name: 'generateKeyLearningPointsFlow',
    inputSchema: GenerateKeyLearningPointsInputSchema,
    outputSchema: GenerateKeyLearningPointsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
