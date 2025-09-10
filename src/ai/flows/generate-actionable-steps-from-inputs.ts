'use server';

/**
 * @fileOverview Generates actionable next steps for clinician founders based on their Gallup Strengths, Mission, Vision, and 'Why'.
 *
 * - generateActionableSteps - A function that generates actionable steps.
 * - GenerateActionableStepsInput - The input type for the generateActionableSteps function.
 * - GenerateActionableStepsOutput - The return type for the generateActionableSteps function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateActionableStepsInputSchema = z.object({
  gallupStrengths: z
    .string()
    .describe("The clinician founder's Gallup Strengths."),
  mission: z.string().describe("The clinician founder's Mission statement."),
  vision: z.string().describe("The clinician founder's Vision statement."),
  why: z.string().describe("The clinician founder's core reason 'why' (Why Discovery Results)."),
});

export type GenerateActionableStepsInput = z.infer<
  typeof GenerateActionableStepsInputSchema
>;

const GenerateActionableStepsOutputSchema = z.object({
  actionableSteps: z
    .string()
    .describe('A list of 3-5 actionable next steps, formatted as a simple list separated by newlines.'),
});

export type GenerateActionableStepsOutput = z.infer<
  typeof GenerateActionableStepsOutputSchema
>;

export async function generateActionableSteps(
  input: GenerateActionableStepsInput
): Promise<GenerateActionableStepsOutput> {
  return generateActionableStepsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateActionableStepsPrompt',
  input: {schema: GenerateActionableStepsInputSchema},
  output: {schema: GenerateActionableStepsOutputSchema},
  prompt: `You are an expert startup coach for clinician founders. Your task is to synthesize the user's foundational inputs and generate a concise, highly personalized list of 3-5 actionable next steps. The steps should be practical and help the founder leverage their unique strengths and vision to build momentum.

Analyze the following inputs:

- Gallup Strengths: {{{gallupStrengths}}}
- Mission Statement: {{{mission}}}
- Vision Statement: {{{vision}}}
- Why Discovery Results: {{{why}}}

Based on this, generate a list of 3-5 clear, actionable next steps. Each step should be on a new line. Do not use markdown formatting like "-".

Actionable Next Steps:`,
});

const generateActionableStepsFlow = ai.defineFlow(
  {
    name: 'generateActionableStepsFlow',
    inputSchema: GenerateActionableStepsInputSchema,
    outputSchema: GenerateActionableStepsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
