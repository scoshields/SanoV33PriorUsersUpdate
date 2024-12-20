import { ASSESSMENT_SECTIONS } from './constants';
import { NOTE_FORMATS } from '../noteFormats/formats';
import type { NoteFormatType } from '../noteFormats/types';

function standardizeLineBreaks(content: string): string {
  const normalized = content
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .trim();
  
  // Ensure sections are properly separated
  return normalized.replace(/\n{3,}/g, '\n\n');
}

function formatSection(section: string): string {
  const cleaned = section
    .replace(/^\s+|\s+$/g, '')
    .trim();
  
  // Remove any instruction placeholders
  return cleaned.replace(/\[\s*|\s*\]/g, '');
}

export function formatResponse(content: string, isAssessment: boolean, noteFormat: NoteFormatType = 'girp'): string {
  let formattedContent = standardizeLineBreaks(content);
  const sections = isAssessment ? ASSESSMENT_SECTIONS : NOTE_FORMATS[noteFormat].sections;
  const result: string[] = [];

  // Process each section
  sections.forEach(sectionHeader => {
    const sectionRegex = new RegExp(
      `${escapeRegExp(sectionHeader)}:([^]*?)(?=${sections.map(s => escapeRegExp(s + ':')).join('|')}|$)`,
      'i'
    );

    const match = formattedContent.match(sectionRegex);
    if (match) {
      const sectionContent = formatSection(match[1]);
      // Add section with proper spacing
      result.push(`${sectionHeader}:\n\n${sectionContent.trim()}`);
    }
  });

  // Join sections with triple line breaks for clear separation
  return result.join('\n\n\n');
}

function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}