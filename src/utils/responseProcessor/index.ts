import { validateResponseFormat } from './validators';
import { formatResponse } from './formatter';
import type { NoteFormatType } from '../noteFormats/types';

export function processResponse(content: string, isAssessment: boolean, noteFormat: NoteFormatType = 'girp'): string {
  // Initial formatting
  let processedContent = formatResponse(content, isAssessment, noteFormat);

  // Validate the formatted content
  try {
    const validation = validateResponseFormat(processedContent, isAssessment, noteFormat);

    if (!validation.isValid) {
      console.warn('Response validation warnings:', validation.errors);
    }
  } catch (error) {
    console.warn('Validation error:', error);
  }

  return processedContent;
}