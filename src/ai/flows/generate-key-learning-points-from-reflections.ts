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
  weeklyGoals: z.string().describe('A summary of the weekly goals.'),
  successes: z.string().describe('A description of the successes achieved this week.'),
  outcomes: z.string().describe('A summary of the outcomes of the week.'),
});

export type GenerateKeyLearningPointsInput = z.infer<
  typeof GenerateKeyLearningPointsInputSchema
>;

// Define the output schema for the flow
const GenerateKeyLearningPointsOutputSchema = z.object({
  keyLearningPoints: z
    .string()
    .describe('Key learning points generated from the weekly reflections.'),
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
  prompt: `Analyze the weekly reflections provided below and generate key learning points.

Weekly Goals: {{{weeklyGoals}}}
Successes: {{{successes}}}
Outcomes: {{{outcomes}}}

Key Learning Points:`,
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
