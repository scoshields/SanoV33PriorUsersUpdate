import React from 'react';
import { ScrollText, RefreshCw, ListChecks, HelpCircle, X } from 'lucide-react';
import { Tooltip } from './Tooltip';
import { HowItWorks } from './HowItWorks';

interface NoteHeaderProps {
  noteType: 'session' | 'assessment';
  isGuided: boolean;
  onGuidedChange: (guided: boolean) => void;
  onClear: () => void;
  isProcessing: boolean;
  hasContent: boolean;
}

export function NoteHeader({ 
  noteType, 
  isGuided, 
  onGuidedChange, 
  onClear,
  isProcessing,
  hasContent
}: NoteHeaderProps) {
  const [showHowItWorks, setShowHowItWorks] = React.useState(false);
  const [showGuidedHelp, setShowGuidedHelp] = React.useState(false);

  return (
    <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 mb-6 -mx-4 sm:-mx-6 px-4 sm:px-6 py-4 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-lg font-semibold text-gray-700 dark:text-gray-200">
          <ScrollText className="w-6 h-6" />
          <h2 className="text-base sm:text-lg">
            {noteType === 'assessment' ? 'Clinical Assessment' : 'Clinical Notes'}
          </h2>
        </div>

        <div className="flex items-center gap-4">
          {noteType !== 'assessment' && (
            <div className="flex items-center gap-2">
              <Tooltip content="Guided mode helps you create comprehensive notes by answering structured questions">
                <button
                  type="button"
                  onClick={() => onGuidedChange(!isGuided)}
                  className={`relative flex items-center gap-2 px-4 py-3 sm:py-2 text-sm font-medium rounded-lg transition-all touch-target ${
                    isGuided 
                      ? 'bg-blue-600 text-white shadow-sm hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600' 
                      : 'bg-white dark:bg-gray-800 border-2 border-blue-200 dark:border-blue-400 text-gray-700 dark:text-gray-200 hover:border-blue-300 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-gray-700'
                  }`}
                  disabled={isProcessing}
                >
                  <ListChecks className="w-4 h-4" />
                  <span>Guided Mode</span>
                  <span className={`ml-1 ${isGuided ? 'text-blue-100' : 'text-blue-600'}`}>
                    {isGuided ? 'On' : 'Off'}
                  </span>
                  {!isGuided && (
                    <span className="absolute -top-2 -right-2 flex h-5 w-5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-5 w-5 bg-blue-500 text-[10px] text-white items-center justify-center">
                        Try!
                      </span>
                    </span>
                  )}
                </button>
              </Tooltip>
              <Tooltip content="Learn more about Guided Mode">
                <button
                  type="button"
                  onClick={() => setShowGuidedHelp(true)}
                  className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <HelpCircle className="w-5 h-5" />
                </button>
              </Tooltip>
            </div>
          )}
          <button
            type="button"
            onClick={onClear}
            disabled={isProcessing || !hasContent}
            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 disabled:text-gray-400 dark:disabled:text-gray-600 disabled:cursor-not-allowed transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Clear Notes
          </button>
        </div>
      </div>
      <HowItWorks isOpen={showHowItWorks} onClose={() => setShowHowItWorks(false)} />
      {showGuidedHelp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-lg w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">About Guided Mode</h3>
              <button
                onClick={() => setShowGuidedHelp(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4 text-gray-600 dark:text-gray-300">
              <p>
                Guided Mode helps you create comprehensive clinical notes by providing structured questions about:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Current treatment goals and focus</li>
                <li>Status changes since last session</li>
                <li>Interventions used during the session</li>
                <li>Client's response and progress</li>
                <li>Follow-up plans and next steps</li>
              </ul>
              <p>
                Simply answer the relevant questions, and Sano will generate professional clinical documentation based on your responses.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}