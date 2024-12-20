import { NOTE_FORMATS } from '../noteFormats/formats';
import type { NoteFormatType } from '../noteFormats/types';

export function getSessionSections(format: NoteFormatType) {
  return NOTE_FORMATS[format]?.sections || NOTE_FORMATS.girp.sections;
}

export const ASSESSMENT_SECTIONS = [
  'CLIENT INFORMATION',
  'PRESENTING PROBLEM',
  'MENTAL STATUS & CLINICAL OBSERVATIONS',
  'ASSESSMENT RESULTS',
  'CLINICAL HISTORY',
  'RISK ASSESSMENT',
  'CLINICAL IMPRESSION',
  'STRENGTHS AND CHALLENGES',
  'TREATMENT RECOMMENDATIONS'
] as const;

export const REQUIRED_ACRONYMS = {
  TH: 'Therapist',
  CL: 'Client'
};

export const MAX_SENTENCES_PER_SECTION = 10;
export const MIN_SENTENCES_PER_SECTION = 5;

export const SENTENCE_ENDINGS = /[.!?]+(?=\s+|$)/;