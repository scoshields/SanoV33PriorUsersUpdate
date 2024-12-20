import React from 'react';
import { CLIENT_CONCERNS } from '../utils/concerns';
import { OBSERVATION_CATEGORIES } from '../utils/observations';
import { RESPONSE_CATEGORIES } from '../utils/responses';
import { PLAN_CATEGORIES } from '../utils/plans';
import { THERAPY_CATEGORIES } from '../utils/therapy/categories';

interface SelectedItemsProps {
  selectedTherapies: string[];
  selectedConcerns: string[];
  selectedObservations: string[];
  selectedResponses: string[];
  selectedPlans: string[];
}

export function SelectedItems({
  selectedTherapies,
  selectedConcerns,
  selectedObservations,
  selectedResponses,
  selectedPlans
}: SelectedItemsProps) {
  const getTherapyName = (typeId: string): string => {
    for (const category of THERAPY_CATEGORIES) {
      const type = category.types.find(t => t.id === typeId);
      if (type) return type.name;
    }
    return typeId;
  };

  const getConcernLabel = (id: string): string => {
    const concern = CLIENT_CONCERNS.find(c => c.id === id);
    return concern ? concern.label : id;
  };

  const getObservationLabel = (id: string): string => {
    for (const category of OBSERVATION_CATEGORIES) {
      const option = category.options.find(opt => opt.id === id);
      if (option) return option.label;
    }
    return id;
  };

  const getResponseLabel = (id: string): string => {
    for (const category of RESPONSE_CATEGORIES) {
      const option = category.options.find(opt => opt.id === id);
      if (option) return option.label;
    }
    return id;
  };

  const getPlanLabel = (id: string): string => {
    for (const category of PLAN_CATEGORIES) {
      const option = category.options.find(opt => opt.id === id);
      if (option) return option.label;
    }
    return id;
  };

  const selectedItems = [
    ...selectedTherapies.map(id => `Therapy Approach used: ${getTherapyName(id)}`),
    ...selectedConcerns.map(id => `Concern: ${getConcernLabel(id)}`),
    ...selectedObservations.map(id => `Observation: ${getObservationLabel(id)}`),
    ...selectedResponses.map(id => `Response: ${getResponseLabel(id)}`),
    ...selectedPlans.map(id => `Plan: ${getPlanLabel(id)}`)
  ];

  const selectedText = selectedItems.join('\n');

  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between">
        <label htmlFor="selectedItems" className="block text-sm font-medium text-gray-700">
          Selected Note Items
        </label>
        <span className="text-xs text-gray-500">Items checked in sections above appear here</span>
      </div>
      <textarea
        id="selectedItems"
        value={selectedText}
        readOnly
        className={`w-full h-32 p-3 text-gray-700 bg-gray-50 border rounded-lg resize-none font-mono text-sm ${
          !selectedText && 'text-gray-500'
        }`}
        placeholder="Selected items will appear here when you use checkboxes in the sections above. These items will be incorporated into your final documentation."
      />
    </div>
  );
}