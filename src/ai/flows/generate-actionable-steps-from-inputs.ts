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
    .describe('The clinician founder\'s Gallup Strengths.'),
  mission: z.string().describe('The clinician founder\'s Mission statement.'),
  vision: z.string().describe('The clinician founder\'s Vision statement.'),
  why: z.string().describe('The clinician founder\'s core reason 