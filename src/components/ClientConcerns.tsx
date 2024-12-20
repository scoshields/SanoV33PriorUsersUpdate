import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { InsertButton } from './InsertButton';
import { CLIENT_CONCERNS } from '../utils/concerns';
import type { ClientConcern } from '../utils/concerns';

interface ClientConcernsProps {
  selectedConcerns: string[];
  onToggleConcern: (concernId: string) => void;
  onInsertText: (text: string) => void;
  isExpanded: boolean;
  onExpandedChange: (expanded: boolean) => void;
  disabled?: boolean;
}

export function ClientConcerns({ 
  selectedConcerns, 
  onToggleConcern, 
  onInsertText, 
  isExpanded,
  onExpandedChange,
  disabled 
}: ClientConcernsProps) {
  return (
    <div className="border border-gray-200 rounded-lg bg-white shadow-sm overflow-hidden">
      <button
        onClick={() => onExpandedChange(!isExpanded)}
        className="w-full flex items-center justify-between text-left bg-white p-4"
        type="button"
      >
        <div className="space-y-1">
          <h3 className="text-base font-medium text-gray-900">
            Presenting Problems/Client Concerns
          </h3>
          <p className="text-sm text-gray-500 pr-8 space-y-1">
            <span className="block">Select the primary concerns or symptoms that will be addressed in this session.</span>
            <span className="block text-xs">
              ✓ Checkbox: Adds to Selected Note Items
              <span className="mx-2">•</span>
              + Button: Inserts directly into notes
            </span>
          </p>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-blue-600 hover:text-blue-700 transition-colors flex-shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-blue-600 hover:text-blue-700 transition-colors flex-shrink-0" />
        )}
      </button>

      {selectedConcerns.length > 0 && (
        <div className="px-4 pt-3 pb-0 flex flex-wrap gap-2">
          {selectedConcerns.map(concernId => {
            const concern = CLIENT_CONCERNS.find(c => c.id === concernId);
            return concern ? (
              <div
                key={concernId}
                className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full border border-blue-100 text-sm"
              >
                {concern.label}
              </div>
            ) : null;
          })}
        </div>
      )}

      {isExpanded && (
        <div className="p-4 space-y-3 bg-gray-50 border-t border-gray-200">
          {CLIENT_CONCERNS.map(concern => (
            <label
              key={concern.id}
              className="flex items-start gap-3 cursor-pointer"
            >
              <div className="flex items-center gap-2 flex-1">
                <input
                  type="checkbox"
                  checked={selectedConcerns.includes(concern.id)}
                  onChange={() => onToggleConcern(concern.id)}
                  disabled={disabled}
                  className="mt-1 h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{concern.label}</div>
                  {concern.description && (
                    <div className="text-sm text-gray-500">
                      {`(e.g., ${concern.description})`}
                    </div>
                  )}
                </div>
                <InsertButton
                  onClick={() => onInsertText(concern.label)}
                  disabled={disabled}
                />
              </div>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}