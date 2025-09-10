'use server';

/**
 * @fileOverview Provides AI-powered advice on building traction for clinician founders, remembering the conversation history.
 *
 * - adviseOnBuildingTraction - A function that provides advice on building traction.
 * - AdviseOnBuildingTractionInput - The input type for the adviseOnBuildingTraction function.
 * - AdviseOnBuildingTractionOutput - The return type for the adviseOnBuildingTraction function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AdviseOnBuildingTractionInputSchema = z.object({
  conversationHistory: z.array(z.string()).describe('The history of the conversation with the user.'),
  userInput: z.string().describe('The latest user input in the conversation.'),
});

export type AdviseOnBuildingTractionInput = z.infer<typeof AdviseOnBuildingTractionInputSchema>;

const AdviseOnBuildingTractionOutputSchema = z.object({
  aiResponse: z.string().describe('The AI assistant\'s response to the user input.'),
});

export type AdviseOnBuildingTractionOutput = z.infer<typeof AdviseOnBuildingTractionOutputSchema>;

export async function adviseOnBuildingTraction(input: AdviseOnBuildingTractionInput): Promise<AdviseOnBuildingTractionOutput> {
  return adviseOnBuildingTractionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'adviseOnBuildingTractionPrompt',
  input: {
    schema: AdviseOnBuildingTractionInputSchema,
  },
  output: {
    schema: AdviseOnBuildingTractionOutputSchema,
  },
  prompt: `You are an AI assistant that provides advice to clinician founders on building traction for their ventures.
  You remember the conversation history and use it to provide tailored and context-aware guidance.

  Conversation History:
  {{#each conversationHistory}}
  - {{{this}}}
  {{/each}}

  User Input: {{{userInput}}}

  AI Response:`,
});

const adviseOnBuildingTractionFlow = ai.defineFlow(
  {
    name: 'adviseOnBuildingTractionFlow',
    inputSchema: AdviseOnBuildingTractionInputSchema,
    outputSchema: AdviseOnBuildingTractionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
