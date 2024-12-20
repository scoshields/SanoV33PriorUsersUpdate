import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';
import { useDarkMode } from './hooks/useDarkMode';
import { ThemeToggle } from './components/ThemeToggle';
import { HowItWorks } from './components/HowItWorks';
import { NoteInput } from './components/NoteInput';
import { ProcessedNote } from './components/ProcessedNote';
import { Note, NoteFormData } from './types';
import { processNoteWithAPI } from './services/api';
import { buildPrompt } from './utils/prompts/promptBuilder';
import { parseSections } from './utils/sections';

function App() {
  const [note, setNote] = useState<Note | null>(null);
  const [isDark, setIsDark] = useDarkMode();
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const [currentFormat, setCurrentFormat] = useState<NoteFormatType>('girp');

  const clearNote = () => {
    setNote(null);
  };

  const processNote = async ({ 
    content, selectedTherapies, noteType, noteFormat, customInstructions, guidedResponses 
  }: NoteFormData) => {
    // Store the current format for regeneration
    setCurrentFormat(noteFormat);

    // Combine guided responses into content if using guided mode
    const noteContent = guidedResponses ? 
      Object.entries(guidedResponses)
        .filter(([_, value]) => value.trim())
        .map(([id, value]) => value.trim())
        .join('\n\n')
      : content;

    const newNote: Note = {
      id: Date.now().toString(),
      content: noteContent,
      originalContent: noteContent,
      isProcessing: true,
      sections: []
    };
    setNote(newNote);

    try {
      const data = await processNoteWithAPI({ 
        content: noteContent,
        prompt: buildPrompt(
          selectedTherapies,
          noteType,
          noteFormat,
          customInstructions,
          guidedResponses,
          {
            content,
            selectedTherapies,
            selectedConcerns: [],
            selectedObservations: [],
            selectedResponses: [],
            selectedPlans: [],
            noteType,
            noteFormat,
            isGuided: !!guidedResponses,
            guidedResponses
          }
        ),
      });
      
      setNote(prev => prev ? {
        ...prev,
        sections: parseSections(data.processedContent, noteType === 'assessment', noteFormat),
        isProcessing: false
      } : null);
    } catch (error) {
      console.error('Processing error:', error);
      setNote(prev => prev ? {
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to process note. Please try again.',
        isProcessing: false,
        sections: []
      } : null);
    }
  };

  const handleRegenerateSection = async (sectionId: string) => {
    if (!note?.originalContent) return;

    const currentSection = note.sections.find(s => s.id === sectionId);
    if (!currentSection) return;

    setNote(prev => {
      if (!prev) return null;
      return {
        ...prev,
        sections: prev.sections.map(section => 
          section.id === sectionId 
            ? { ...section, isProcessing: true, error: undefined }
            : section
        )
      };
    });

    try {
      const section = note.sections.find(s => s.id === sectionId);
      if (!section) throw new Error('Section not found');

      // Get the format template for the current format
      const formatTemplate = getNoteFormatPrompt(currentFormat);
      
      // Build a format-specific prompt
      const sectionPrompt = `
Please regenerate the following section of the clinical documentation.
The documentation uses the ${currentFormat.toUpperCase()} format with these exact section headers:

${formatTemplate}

Regenerate ONLY the content for this section:
${section.heading}

Return ONLY the content without the section header. Maintain professional clinical language and ensure 5-10 complete sentences.`;

      const data = await processNoteWithAPI({
        content: note.originalContent,
        prompt: sectionPrompt,
        removeHeader: true
      });

      setNote(prev => {
        if (!prev) return null;
        const section = prev.sections.find(s => s.id === sectionId);
        if (!section) return prev;

        // Create new version with cleaned content
        const newVersion = {
          id: section.versions.length > 0 ? Math.max(...section.versions.map(v => v.id)) + 1 : 0,
          content: data.processedContent.trim(),
          timestamp: Date.now()
        };

        // Add new version and update current version
        return {
          ...prev,
          sections: prev.sections.map(section => 
            section.id === sectionId 
              ? { 
                  ...section, 
                  versions: section.versions.concat(newVersion),
                  currentVersion: newVersion.id,
                  isProcessing: false,
                  error: undefined
                }
              : section
          )
        };
      });
    } catch (error) {
      console.error('Section regeneration error:', error);
      setNote(prev => {
        if (!prev) return null;
        return {
          ...prev,
          sections: prev.sections.map(section => 
            section.id === sectionId 
              ? { 
                  ...section, 
                  error: error instanceof Error ? error.message : 'Failed to regenerate section',
                  isProcessing: false
                }
              : section
          )
        };
      });
    }
  };

  const handleVersionChange = (sectionId: string, versionId: number) => {
    setNote(prev => {
      if (!prev) return null;
      return {
        ...prev,
        sections: prev.sections.map(section =>
          section.id === sectionId
            ? { ...section, currentVersion: versionId }
            : section
        )
      };
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 overflow-x-hidden transition-colors">
      <div className="max-w-4xl mx-auto p-4 sm:p-6">
        <header className="mb-12">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <img src="/favicon.svg" alt="Sano" className="w-8 h-8" />
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                  Sano
                </h1>
                <span className="text-sm sm:text-lg text-gray-500 dark:text-gray-400">Clinical Documentation Assistant</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowHowItWorks(true)}
                className="px-3 py-2 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors flex items-center gap-2 dark:text-blue-400 dark:hover:text-blue-300 dark:hover:bg-gray-800 touch-target"
                aria-label="How it works"
              >
                <HelpCircle className="w-4 h-4" />
                How It Works
              </button>
              <ThemeToggle isDark={isDark} onToggle={() => setIsDark(!isDark)} />
            </div>
          </div>
          <div className="mt-4 text-center">
            <a
              href="https://buy.stripe.com/9AQcQ70C04SzbqE7st"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm text-blue-600 hover:text-blue-700 transition-colors"
            >
              ❤️ Support Development
            </a>
          </div>
        </header>

        <div className="space-y-8">
          <NoteInput 
            onSubmit={processNote}
            onClear={clearNote}
            isProcessing={note?.isProcessing || false}
          />
          {note && (
            <ProcessedNote 
              note={note} 
              onRegenerateSection={handleRegenerateSection} 
              onVersionChange={handleVersionChange}
            />
          )}
        </div>
      </div>
      <HowItWorks isOpen={showHowItWorks} onClose={() => setShowHowItWorks(false)} />
    </div>
  );
}

export default App;