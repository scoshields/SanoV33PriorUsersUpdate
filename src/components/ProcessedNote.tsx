import React from 'react';
import { FileText } from 'lucide-react';
import { Note } from '../types';
import { useEffect, useRef } from 'react';
import { NoteSection } from './NoteSection';

interface ProcessedNoteProps {
  note: Note;
  onRegenerateSection: (sectionId: string) => void;
  onVersionChange: (sectionId: string, versionId: number) => void;
}

export function ProcessedNote({ note, onRegenerateSection, onVersionChange }: ProcessedNoteProps) {
  const noteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (noteRef.current && !note.isProcessing) {
      noteRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [note.isProcessing, note.sections]);
  
  if (note.error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-600">{note.error}</p>
      </div>
    );
  }

  return (
    <div ref={noteRef} className="space-y-4">
      <div className="flex items-center gap-2 text-lg font-semibold text-gray-700">
        <FileText className="w-6 h-6" />
        <h2>Processed Output</h2>
      </div>
      
      <div className="space-y-4">
        {note.sections.map(section => (
          <NoteSection
            key={section.id}
            section={section}
            onRegenerate={onRegenerateSection}
            onVersionChange={onVersionChange}
          />
        ))}
      </div>
    </div>
  );
}