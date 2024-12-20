export interface ResponseCategory {
  id: string;
  label: string;
  options: ResponseOption[];
}

export interface ResponseOption {
  id: string;
  label: string;
  insertOnly?: boolean;
}

export const RESPONSE_CATEGORIES: ResponseCategory[] = [
  {
    id: 'session_response',
    label: 'Response to Session',
    options: [
      { id: 'receptive', label: 'Receptive, actively engaged' },
      { id: 'skeptical', label: 'Skeptical but open to trying' },
      { id: 'resistant', label: 'Resistant to discussing certain topics' },
      { id: 'understanding', label: 'Expressed understanding of concepts' },
      { id: 'emotional', label: 'Emotional, but responsive to support' }
    ]
  },
  {
    id: 'progress',
    label: 'Progress Indicators',
    options: [
      { id: 'increased_insight', label: 'Increased insight into [specific issue]', insertOnly: true },
      { id: 'improved_coping', label: 'Demonstrated improved coping skills' },
      { id: 'practiced_techniques', label: 'Practiced new techniques with guidance' },
      { id: 'expressed_relief', label: 'Expressed relief or reduced distress' },
      { id: 'identified_barriers', label: 'Identified barriers to progress' }
    ]
  }
];