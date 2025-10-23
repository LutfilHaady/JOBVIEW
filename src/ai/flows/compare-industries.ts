'use server';

/**
 * @fileOverview An industry comparison AI agent.
 *
 * - compareIndustries - A function that handles the industry comparison process.
 */

import { ai } from '@/ai/genkit';
import {
  CompareIndustriesInputSchema,
  type CompareIndustriesInput,
  CompareIndustriesOutputSchema,
  type CompareIndustriesOutput,
} from './schemas';

export async function compareIndustries(
  input: CompareIndustriesInput
): Promise<CompareIndustriesOutput> {
  return compareIndustriesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'compareIndustriesPrompt',
  input: { schema: CompareIndustriesInputSchema },
  output: { schema: CompareIndustriesOutputSchema },
  prompt: `You are an expert career analyst. Compare the two following industries: {{{industry1}}} and {{{industry2}}}.

For each industry, provide the following information:
1.  **Salary Trend**: A summary of salary trends over the last 3-5 years.
2.  **Relevant Degrees**: A list of 3-4 relevant university degrees for this industry.
3.  **Relevant Courses**: A list of 3-4 relevant professional courses or certifications.

Format your response as a JSON object matching the output schema. Provide details for both industries.`,
});

const compareIndustriesFlow = ai.defineFlow(
  {
    name: 'compareIndustriesFlow',
    inputSchema: CompareIndustriesInputSchema,
    outputSchema: CompareIndustriesOutputSchema,
  },
  async input => {
    const { output } = await prompt(input);
    return output!;
  }
);
