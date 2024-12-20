import { ASSESSMENT_SECTIONS } from './responseProcessor/constants';
import { NOTE_FORMATS } from './noteFormats/formats';
import type { NoteFormatType } from './noteFormats/types';
import type { NoteSection } from '../types';

function cleanContent(content: string, isAssessment: boolean, noteFormat: NoteFormatType = 'girp'): string {
  const sections = isAssessment ? ASSESSMENT_SECTIONS : NOTE_FORMATS[noteFormat].sections;
  let cleanedContent = content
    .replace(/^\s+|\s+$/g, '')     // Trim start/end whitespace
    .replace(/\n{3,}/g, '\n\n')    // Normalize multiple newlines
    .trim();

  // Ensure all section headers are properly formatted
  sections.forEach(section => {
    const sectionRegex = new RegExp(`${escapeRegExp(section)}:?\\s*`, 'gi');
    cleanedContent = cleanedContent.replace(sectionRegex, `${section}:\n`);
  });

  return cleanedContent;
}

function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function findSectionContent(content: string, heading: string, sections: readonly string[]): string | null {
  // Create exact match pattern for the heading
  const headingRegex = new RegExp(
    `${escapeRegExp(heading)}:[ \\t]*(?:\\r?\\n|\\r|$)`,
    'im'
  );
  const startMatch = content.match(headingRegex);
  
  if (!startMatch) return null;
  
  const startIndex = startMatch.index! + startMatch[0].length;
  const remainingContent = content.slice(startIndex);
  
  // Find the next section heading
  const nextHeadingPattern = sections
    .map(section => `${escapeRegExp(section)}:`)
    .join('|');

  const nextHeadingRegex = new RegExp(
    `(?:\\n|\\r\\n)\\s*(${nextHeadingPattern})`,
    'im'
  );
  const endMatch = remainingContent.match(nextHeadingRegex);
  
  const endIndex = endMatch 
    ? startIndex + endMatch.index! 
    : content.length;
  
  let sectionContent = content
    .slice(startIndex, endIndex)
    .trim()
    .replace(/\[\s*|\s*\]/g, '');  // Remove brackets

  // Ensure content doesn't contain other section headers
  sections.forEach(otherHeading => {
    if (otherHeading !== heading) {
      const headerPattern = new RegExp(`${escapeRegExp(otherHeading)}:`, 'gi');
      sectionContent = sectionContent.replace(headerPattern, '').trim();
    }
  });

  return sectionContent || null;
}

export function parseSections(
  content: string, 
  isAssessment: boolean,
  noteFormat: NoteFormatType = 'girp'
): NoteSection[] {
  const sections = isAssessment ? ASSESSMENT_SECTIONS : NOTE_FORMATS[noteFormat].sections;
  const cleanedContent = cleanContent(content, isAssessment);
  const result: NoteSection[] = [];
  
  // Debug logging
  console.log('Parsing sections with format:', noteFormat);
  console.log('Using sections:', sections);
  console.log('Content to parse:', cleanedContent);

  sections.forEach(heading => {
    const sectionContent = findSectionContent(cleanedContent, heading, sections);
    console.log(`Found content for ${heading}:`, sectionContent ? 'yes' : 'no');

    if (sectionContent) {
      const formattedContent = sectionContent.replace(/\n{2,}/g, '\n\n');
      
      const initialVersion = {
        id: 0,
        content: formattedContent,
        timestamp: Date.now()
      };

      result.push({
        id: heading.toLowerCase().replace(/\s+/g, '-'),
        heading,
        versions: [initialVersion],
        currentVersion: 0,
        isProcessing: false
      });
    }
  });
  
  console.log('Parsed sections:', result.length);

  return result;
}