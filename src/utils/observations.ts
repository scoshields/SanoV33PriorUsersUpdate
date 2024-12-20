export interface ObservationCategory {
  id: string;
  label: string;
  options: ObservationOption[];
}

export interface ObservationOption {
  id: string;
  label: string;
}

export const OBSERVATION_CATEGORIES: ObservationCategory[] = [
  {
    id: 'appearance',
    label: 'Appearance',
    options: [
      { id: 'well_groomed', label: 'Well-groomed, casual attire' },
      { id: 'disheveled', label: 'Disheveled, minimal eye contact' },
      { id: 'restless', label: 'Restless, fidgeting' },
      { id: 'calm', label: 'Calm, composed' }
    ]
  },
  {
    id: 'mood_affect',
    label: 'Mood/Affect',
    options: [
      { id: 'anxious', label: 'Anxious, tense' },
      { id: 'depressed', label: 'Depressed, flat affect' },
      { id: 'neutral', label: 'Neutral, stable' },
      { id: 'irritable', label: 'Irritable, agitated' },
      { id: 'tearful', label: 'Tearful, emotional' },
      { id: 'engaged', label: 'Engaged, hopeful' }
    ]
  },
  {
    id: 'behavior',
    label: 'Behavior',
    options: [
      { id: 'cooperative', label: 'Cooperative, attentive' },
      { id: 'distracted', label: 'Distracted, withdrawn' },
      { id: 'resistant', label: 'Resistant, defensive' },
      { id: 'engaged_active', label: 'Engaged, actively participating' }
    ]
  }
];