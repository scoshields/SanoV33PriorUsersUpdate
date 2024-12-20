import React from 'react';
import { RefreshCw, History } from 'lucide-react';
import { NoteSection as NoteSectionType } from '../types';
import { cn } from '../utils/cn';

interface NoteSectionProps {
  section: NoteSectionType;
  onRegenerate: (sectionId: string) => void;
  onVersionChange: (sectionId: string, versionId: number) => void;
}

export function NoteSection({ section, onRegenerate, onVersionChange }: NoteSectionProps) {
  const hasMultipleVersions = section.versions.length > 1;

  return (
    <div className="border rounded-lg bg-white dark:bg-gray-800 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-b from-blue-50 to-blue-100/80 dark:from-blue-900/20 dark:to-blue-900/30 border-b border-gray-200 dark:border-gray-700">
        <h3 className="font-medium text-gray-900 dark:text-white">{section.heading}</h3>
        <div className="flex items-center gap-2">
          {hasMultipleVersions && (
            <select
              value={section.currentVersion}
              onChange={(e) => {
                const version = parseInt(e.target.value);
                if (!isNaN(version) && section.versions[version]) {
                  onVersionChange(section.id, version);
                }
              }}
              className="text-sm border border-gray-200 dark:border-gray-600 rounded-md px-2 py-1 bg-white dark:bg-gray-800 dark:text-gray-200"
              disabled={section.isProcessing}
            >
              {section.versions.map((version, index) => (
                <option key={version.id} value={version.id}>
                  {index === 0 ? 'Original' : `Version ${index}`}
                </option>
              ))}
            </select>
          )}
          <button
            onClick={() => onRegenerate(section.id)}
            disabled={section.isProcessing}
            className="flex items-center gap-2 px-3 py-1 text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 disabled:text-gray-400 dark:disabled:text-gray-600 disabled:cursor-not-allowed transition-colors"
          >
            <RefreshCw className={cn(
              "w-4 h-4",
              section.isProcessing && "animate-spin"
            )} />
            {section.isProcessing ? 'Processing...' : 'Regenerate'}
          </button>
        </div>
      </div>
      <div className={cn(
        "p-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900",
        section.isProcessing && "animate-pulse"
      )}>
        {section.error ? (
          <p className="text-red-600">{section.error}</p>
        ) : (
          <div className="prose max-w-none whitespace-pre-wrap dark:prose-invert text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 p-4 rounded-lg min-h-[100px]">
            {section.versions[section.currentVersion]?.content || ''}
          </div>
        )}
      </div>
    </div>
  );
}