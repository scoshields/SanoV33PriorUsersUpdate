import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { InsertButton } from './InsertButton';
import { PLAN_CATEGORIES } from '../utils/plans';
import type { PlanCategory } from '../utils/plans';

interface PlanNextStepsProps {
  selectedPlans: string[];
  onTogglePlan: (planId: string) => void;
  onInsertText: (text: string) => void;
  isExpanded: boolean;
  onExpandedChange: (expanded: boolean) => void;
  disabled?: boolean;
}

export function PlanNextSteps({ 
  selectedPlans, 
  onTogglePlan, 
  onInsertText, 
  isExpanded,
  onExpandedChange,
  disabled 
}: PlanNextStepsProps) {
  const getPlanLabel = (id: string): string => {
    for (const category of PLAN_CATEGORIES) {
      const option = category.options.find(opt => opt.id === id);
      if (option) return option.label;
    }
    return id;
  };

  return (
    <div className="border border-gray-200 rounded-lg bg-white shadow-sm overflow-hidden">
      <button
        onClick={() => onExpandedChange(!isExpanded)}
        className="w-full flex items-center justify-between text-left bg-white p-4"
        type="button"
      >
        <div className="space-y-1">
          <h3 className="text-base font-medium text-gray-900">
            Plan for Next Steps
          </h3>
          <p className="text-sm text-gray-500 pr-8 space-y-1">
            <span className="block">Homework assignments and focus areas for the next session.</span>
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

      {selectedPlans.length > 0 && (
        <div className="px-4 pt-3 pb-0 flex flex-wrap gap-2">
          {selectedPlans.map(id => (
            <div
              key={id}
              className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full border border-blue-100 text-sm"
            >
              {getPlanLabel(id)}
            </div>
          ))}
        </div>
      )}

      {isExpanded && (
        <div className="p-4 space-y-6 bg-gray-50 border-t border-gray-200">
          {PLAN_CATEGORIES.map(category => (
            <div key={category.id} className="space-y-3">
              <h4 className="font-medium text-gray-900">{category.label}</h4>
              <div className="grid grid-cols-1 gap-3">
                {category.options.map(option => (
                  <label
                    key={option.id}
                    className="flex items-center gap-3 cursor-pointer"
                  >
                    <div className="flex items-center gap-2 flex-1">
                      <input
                        type="checkbox"
                        checked={selectedPlans.includes(option.id)}
                        onChange={() => onTogglePlan(option.id)}
                        disabled={disabled || option.insertOnly}
                        className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                      />
                      <span className="text-gray-700 flex-1">{option.label}</span>
                      <InsertButton
                        onClick={() => onInsertText(option.label)}
                        disabled={disabled}
                      />
                    </div>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}