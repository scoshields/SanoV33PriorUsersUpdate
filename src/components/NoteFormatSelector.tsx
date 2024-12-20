import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { NOTE_FORMATS } from '../utils/noteFormats/formats';
import type { NoteFormatType } from '../utils/noteFormats/types';

interface NoteFormatSelectorProps {
  value: NoteFormatType;
  onChange: (format: NoteFormatType) => void;
  isExpanded: boolean;
  onExpandedChange: (expanded: boolean) => void;
  disabled?: boolean;
}

export function NoteFormatSelector({ 
  value, 
  onChange, 
  isExpanded,
  onExpandedChange,
  disabled 
}: NoteFormatSelectorProps) {
  const selectedFormat = NOTE_FORMATS[value];

  return (
    <div className="border border-gray-200 rounded-lg bg-white shadow-sm overflow-hidden">
      <button
        onClick={() => onExpandedChange(!isExpanded)}
        className="w-full flex items-center justify-between text-left bg-white p-4"
        type="button"
      >
        <div className="space-y-1">
          <h3 className="text-base font-medium text-gray-900">
            Note Format
          </h3>
          <p className="text-sm text-gray-500 pr-8">
            Select the format for your clinical documentation
          </p>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-blue-600 hover:text-blue-700 transition-colors flex-shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-blue-600 hover:text-blue-700 transition-colors flex-shrink-0" />
        )}
      </button>
      
      {selectedFormat && !isExpanded && (
        <div className="px-4 py-3">
          <div className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full border border-blue-100 text-sm inline-block">
            {selectedFormat.label}
          </div>
        </div>
      )}
      
      {isExpanded && <div className="p-4 space-y-3 bg-gray-50 border-t border-gray-200">
        {Object.values(NOTE_FORMATS).map((format) => (
          <label
            key={format.id}
            className={`relative flex items-start p-3 cursor-pointer rounded-lg border transition-colors ${
              value === format.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300 bg-white'
            }`}
          >
            <div className="min-w-0 flex-1">
              <div className="flex items-center">
                <input
                  type="radio"
                  name="noteFormat"
                  value={format.id}
                  checked={value === format.id}
                  onChange={() => onChange(format.id)}
                  disabled={disabled}
                  className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="ml-3 font-medium text-gray-900">
                  {format.label}
                </span>
              </div>
              <p className="mt-1 text-sm text-gray-500 ml-7">
                {format.description}
              </p>
            </div>
          </label>
        ))}
      </div>}
    </div>
  );
}