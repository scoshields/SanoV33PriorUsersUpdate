import { NOTE_FORMATS } from './formats';
import type { NoteFormatType } from './types';

function formatSections(sections: readonly string[]): string {
  return sections.map(section => `${section}:`).join('\n\n');
}

export function getNoteFormatPrompt(formatType: NoteFormatType): string {
  const format = NOTE_FORMATS[formatType];
  if (!format) {
    throw new Error(`Invalid note format: ${formatType}`);
  }
  return formatSections(format.sections);
}