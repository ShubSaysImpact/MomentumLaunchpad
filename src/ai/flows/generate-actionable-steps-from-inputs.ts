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
  why: z.string().describe("The clinician founder's core reason 'why'."),
});

export type GenerateActionableStepsInput = z.infer<
  typeof GenerateActionableStepsInputSchema
>;

const GenerateActionableStepsOutputSchema = z.object({
  actionableSteps: z
    .string()
    .describe('Actionable next steps generated from the inputs.'),
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
  prompt: `Based on the following inputs for a clinician founder, generate 3-5 actionable next steps.

Gallup Strengths: {{{gallupStrengths}}}
Mission: {{{mission}}}
Vision: {{{vision}}}
Why: {{{why}}}

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
