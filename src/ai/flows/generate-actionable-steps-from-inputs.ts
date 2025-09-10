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
    .describe('A list of 3-5 actionable next steps, formatted as a simple list separated by newlines. Do not include markdown like "-" or numbers.'),
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
  prompt: `You are an expert AI coach for clinician founders. Your task is to synthesize the following four pieces of information: a user's unique strengths, their core purpose (mission), their long-term goal (vision), and their deep motivation (why). 

Based on this synthesis, generate a list of 3-5 practical, concrete, and actionable next steps that are specifically tailored to this individual's unique Zone of Impact. The output should be a clear, easy-to-read list. Each step must be on a new line. Do not use any markdown formatting like "-" or numbering.

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
