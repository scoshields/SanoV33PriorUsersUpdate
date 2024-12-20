import React, { useState, useRef } from 'react';
import { AlertTriangle } from 'lucide-react';
import { insertTextAtCursor } from '../utils/textInsertion';
import { THERAPY_CATEGORIES } from '../utils/therapy/categories';
import { NoteHeader } from './NoteHeader';
import { NoteFormatSelector } from './NoteFormatSelector';
import type { NoteFormatType } from '../utils/noteFormats/types';
import { getCharacterCountInfo } from '../utils/characterCount';
import { GUIDED_QUESTIONS } from '../utils/guidedQuestions';
import { ASSESSMENT_QUESTIONS } from '../utils/assessmentQuestions';
import { GuidedQuestions } from './GuidedQuestions';
import { SelectedItems } from './SelectedItems';
import { TherapyTypeSelector } from './TherapyTypeSelector';
import { ClientConcerns } from './ClientConcerns';
import { ClientObservations } from './ClientObservations';
import { ClientResponse } from './ClientResponse';
import { PlanNextSteps } from './PlanNextSteps';
import type { NoteFormData } from '../types';
import type { PromptType } from '../utils/prompts';

type NoteType = 'session' | 'assessment';

interface NoteInputProps {
  onSubmit: (data: NoteFormData) => void;
  onClear: () => void;
  isProcessing: boolean;
}

export function NoteInput({ onSubmit, onClear, isProcessing }: NoteInputProps) {
  const [content, setContent] = useState('');
  const [selectedTherapies, setSelectedTherapies] = useState<string[]>([]);
  const [selectedConcerns, setSelectedConcerns] = useState<string[]>([]);
  const [selectedObservations, setSelectedObservations] = useState<string[]>([]);
  const [selectedResponses, setSelectedResponses] = useState<string[]>([]);
  const [selectedPlans, setSelectedPlans] = useState<string[]>([]);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    format: false,
    therapy: false,
    concerns: false,
    observations: false,
    response: false,
    plans: false
  });
  const [noteFormat, setNoteFormat] = useState<NoteFormatType>('girp');
  const [noteType, setNoteType] = useState<NoteType>('session');
  const [isGuided, setIsGuided] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [guidedResponses, setGuidedResponses] = useState<Record<string, string>>({});
  const [customInstructions, setCustomInstructions] = useState('');

  const charInfo = getCharacterCountInfo(content);

  // Automatically enable guided mode for assessment notes
  React.useEffect(() => {
    if (noteType === 'assessment') {
      setIsGuided(true);
    }
  }, [noteType]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const hasValidGuidedResponses = isGuided && Object.values(guidedResponses).some(response => response.trim());
    const hasValidContent = !isGuided && content.trim() && !charInfo.isOverLimit;
    
    if (hasValidGuidedResponses || hasValidContent) {
      onSubmit({ 
        content, 
        selectedTherapies,
        selectedConcerns,
        selectedObservations,
        selectedResponses,
        selectedPlans,
        noteType,
        noteFormat,
        isGuided,
        guidedResponses: isGuided ? guidedResponses : undefined,
        customInstructions: customInstructions.trim() || undefined 
      });
    }
  };

  const handleClear = () => {
    setContent('');
    setSelectedTherapies([]);
    setIsGuided(false);
    setGuidedResponses({});
    setCustomInstructions('');
    setSelectedConcerns([]);
    setSelectedObservations([]);
    setSelectedResponses([]);
    setSelectedPlans([]);
    setExpandedSections({
      format: false,
      therapy: false,
      concerns: false,
      observations: false,
      response: false,
      plans: false
    });
    setNoteFormat('girp');
    onClear();
  };

  const handleNoteTypeChange = (type: NoteType) => {
    setNoteType(type);
    setContent('');
    setSelectedTherapies([]);
    setGuidedResponses({});
    setCustomInstructions('');
    setSelectedConcerns([]);
    setSelectedObservations([]);
    setSelectedResponses([]);
    setSelectedPlans([]);
    setExpandedSections({
      therapy: false,
      concerns: false,
      observations: false,
      response: false,
      plans: false
    });
    // Enable guided mode for assessment notes
    // Set guided mode based on note type
    if (type === 'assessment') {
      setIsGuided(true);
    } else {
      setIsGuided(false);
    }
    onClear();
  };

  const handleAddTherapy = (typeId: string) => {
    setSelectedTherapies(prev => 
      prev.includes(typeId) ? prev : [...prev, typeId]
    );
  };

  const handleRemoveTherapy = (typeId: string) => {
    setSelectedTherapies(prev => prev.filter(id => id !== typeId));
  };

  const handleTogglePlan = (planId: string) => {
    setSelectedPlans(prev => 
      prev.includes(planId)
        ? prev.filter(id => id !== planId)
        : [...prev, planId]
    );
  };

  const handleToggleResponse = (responseId: string) => {
    setSelectedResponses(prev => 
      prev.includes(responseId)
        ? prev.filter(id => id !== responseId)
        : [...prev, responseId]
    );
  };

  const handleToggleConcern = (concernId: string) => {
    setSelectedConcerns(prev => 
      prev.includes(concernId)
        ? prev.filter(id => id !== concernId)
        : [...prev, concernId]
    );
  };

  const handleToggleObservation = (observationId: string) => {
    setSelectedObservations(prev => 
      prev.includes(observationId)
        ? prev.filter(id => id !== observationId)
        : [...prev, observationId]
    );
  };

  const handleGuidedResponseChange = (id: string, value: string) => {
    setGuidedResponses(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleInsertText = (text: string) => {
    if (!isGuided && textareaRef.current) {
      const newValue = insertTextAtCursor(textareaRef.current, text);
      if (newValue !== undefined) {
        setContent(newValue);
      }
    }
  };

  const handleSectionExpand = (sectionId: string, expanded: boolean) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: expanded
    }));
  };

  const activeQuestions = noteType === 'assessment' ? ASSESSMENT_QUESTIONS : GUIDED_QUESTIONS;

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4">
      <NoteHeader
        noteType={noteType}
        isGuided={isGuided}
        onGuidedChange={setIsGuided}
        onClear={handleClear}
        isProcessing={isProcessing}
        hasContent={content.trim().length > 0}
      />
      
      <div className="flex flex-col sm:flex-row gap-2">
        <button
          type="button"
          onClick={() => handleNoteTypeChange('session')}
          className={`flex-1 px-4 py-2 text-sm border rounded-lg transition-colors ${
            noteType === 'session'
              ? 'bg-blue-50 border-blue-200 text-blue-700'
              : 'border-gray-200 text-gray-700 hover:bg-gray-50'
          }`}
          disabled={isProcessing}
        >
          Session Notes
        </button>
        <button
          type="button"
          onClick={() => handleNoteTypeChange('assessment')}
          className={`flex-1 px-4 py-2 text-sm border rounded-lg transition-colors ${
            noteType === 'assessment'
              ? 'bg-blue-50 border-blue-200 text-blue-700'
              : 'border-gray-200 text-gray-700 hover:bg-gray-50'
          }`}
          disabled={isProcessing}
        >
          Assessment Notes
        </button>
      </div>
      
      {noteType === 'session' && (
        <NoteFormatSelector
          value={noteFormat}
          onChange={setNoteFormat}
          isExpanded={expandedSections.format}
          onExpandedChange={(expanded) => handleSectionExpand('format', expanded)}
          disabled={isProcessing}
        />
      )}
      
      <TherapyTypeSelector
        selectedTherapies={selectedTherapies}
        onAdd={handleAddTherapy}
        onRemove={handleRemoveTherapy}
        isExpanded={expandedSections.therapy}
        onExpandedChange={(expanded) => handleSectionExpand('therapy', expanded)}
        disabled={isProcessing}
      />

      <ClientConcerns
        selectedConcerns={selectedConcerns}
        onToggleConcern={handleToggleConcern}
        onInsertText={handleInsertText}
        isExpanded={expandedSections.concerns}
        onExpandedChange={(expanded) => handleSectionExpand('concerns', expanded)}
        disabled={isProcessing || (isGuided && noteType !== 'assessment')}
      />
      <ClientObservations
        selectedObservations={selectedObservations}
        onToggleObservation={handleToggleObservation}
        onInsertText={handleInsertText}
        isExpanded={expandedSections.observations}
        onExpandedChange={(expanded) => handleSectionExpand('observations', expanded)}
        disabled={isProcessing || (isGuided && noteType !== 'assessment')}
      />
      <ClientResponse
        selectedResponses={selectedResponses}
        onToggleResponse={handleToggleResponse}
        onInsertText={handleInsertText}
        isExpanded={expandedSections.response}
        onExpandedChange={(expanded) => handleSectionExpand('response', expanded)}
        disabled={isProcessing || (isGuided && noteType !== 'assessment')}
      />
      <PlanNextSteps
        selectedPlans={selectedPlans}
        onTogglePlan={handleTogglePlan}
        onInsertText={handleInsertText}
        isExpanded={expandedSections.plans}
        onExpandedChange={(expanded) => handleSectionExpand('plans', expanded)}
        disabled={isProcessing || (isGuided && noteType !== 'assessment')}
      />

      {noteType === 'assessment' && (
        <div className="rounded-lg bg-blue-50 border border-blue-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <p className="font-medium text-blue-700">Assessment Mode Active</p>
          </div>
          <p className="text-sm text-blue-600">
            Complete the assessment questions below to generate a comprehensive clinical assessment. Each section helps create a thorough evaluation of the client's presentation and needs.
          </p>
        </div>
      )}

      {isGuided && (
        <div className="space-y-4">
          <SelectedItems
            selectedTherapies={selectedTherapies}
            selectedConcerns={selectedConcerns}
            selectedObservations={selectedObservations}
            selectedResponses={selectedResponses}
            selectedPlans={selectedPlans}
          />
          {noteType !== 'assessment' && <div className="rounded-lg bg-blue-50 border border-blue-200 p-4 mb-4">
            <p className="text-sm text-blue-700">
              Answer any of the questions below to generate your clinical notes. Each answer will be incorporated into the final documentation. The more detail you include, the more accurate and effective the documentation will be.
            </p>
          </div>}
          <GuidedQuestions
            responses={guidedResponses}
            questions={activeQuestions}
            onChange={handleGuidedResponseChange}
            disabled={isProcessing}
          />
        </div>
      )}

      {!isGuided && <div className="space-y-2">
        <SelectedItems
          selectedTherapies={selectedTherapies}
          selectedConcerns={selectedConcerns}
          selectedObservations={selectedObservations}
          selectedResponses={selectedResponses}
          selectedPlans={selectedPlans}
        />
        <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <label htmlFor="content" className="block text-base font-medium text-gray-900 mb-2">
            Session Notes
            <span className="ml-2 text-sm font-normal ${
              charInfo.isOverLimit ? 'text-red-600' :
              charInfo.isNearLimit ? 'text-amber-600' :
              'text-gray-500'
            }">
              ({charInfo.count}/{charInfo.maxChars} characters)
            </span>
          </label>
          <textarea
            id="content"
            ref={textareaRef}
            value={content}
            onChange={(e) => {
              const newValue = e.target.value;
              setContent(newValue);
            }}
            className={`w-full h-96 p-4 text-gray-700 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-mono ${
              charInfo.isOverLimit ? 'border-red-500' :
              charInfo.isNearLimit ? 'border-amber-500' : 
              'border-gray-300'
            }`}
            placeholder="Enter your session notes here..."
            disabled={isProcessing}
          />
          {(charInfo.isNearLimit || charInfo.isOverLimit) && (
            <div className={`mt-2 flex items-center gap-2 text-sm ${
              charInfo.isOverLimit ? 'text-red-600' : 'text-amber-600'
            }`}>
              <AlertTriangle className="w-4 h-4" />
              <span>
                {charInfo.isOverLimit
                  ? `Character limit exceeded by ${Math.abs(charInfo.remaining)} characters. Please reduce the content.`
                  : `Approaching character limit. ${charInfo.remaining} characters remaining.`}
              </span>
            </div>
          )}
        </div>
      </div>}

      <button
        type="submit"
        disabled={isProcessing || (isGuided ? !Object.values(guidedResponses).some(r => r.trim()) : !content.trim() || charInfo.isOverLimit)}
        className="fixed bottom-4 left-4 right-4 sm:static w-[calc(100%-2rem)] sm:w-full px-6 py-4 sm:py-3 text-lg font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 hover:scale-[1.02] focus:ring-4 focus:ring-blue-300 disabled:bg-blue-300 disabled:hover:scale-100 disabled:cursor-not-allowed transition-all shadow-lg sm:shadow-sm hover:shadow-xl sm:hover:shadow-md z-50"
        aria-live="polite"
      >
        {isProcessing ? 'Processing...' : `Process ${noteType === 'assessment' ? 'Clinical Assessment' : 'Clinical Notes'}`}
      </button>
      {/* Add padding to prevent button overlap on mobile */}
      <div className="h-20 sm:h-0" />
    </form>
  );
}