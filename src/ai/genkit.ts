
import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';
import { z } from 'zod';

export const ai = genkit({
  plugins: [googleAI({
    // It's recommended to set the API version explicitly.
    apiVersion: 'v1beta',
  })],
  // The model to use for generation.
  model: 'gemini-1.5-flash-latest',
  // Configure the logger to only log errors.
  logLevel: 'error',
  // This allows to use streaming APIs.
  enableStreaming: true,
});
