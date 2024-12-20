export const PROMPT_OPTIONS = {
  standard: "standard",
  emdr: "emdr",
  ifs: "ifs",
  cbt: "cbt"
} as const;

export type PromptType = keyof typeof PROMPT_OPTIONS;

export const FORMAT_LABELS: Record<PromptType, string> = {
  standard: 'Standard Clinical Format',
  emdr: 'EMDR Session Documentation',
  ifs: 'Internal Family Systems Notes',
  cbt: 'Cognitive Behavioral Therapy Notes'
};

export const FORMAT_DESCRIPTIONS: Record<PromptType, string> = {
  standard: 'Comprehensive clinical documentation covering presenting problems, status changes, interventions, and responses in a structured format suitable for general therapy sessions.',
  emdr: 'Specialized format for EMDR sessions, including target memory selection, SUDs levels, bilateral stimulation type, and processing outcomes.',
  ifs: 'Detailed documentation for Internal Family Systems therapy, focusing on parts work, unburdening processes, and system interactions.',
  cbt: 'Structured notes for CBT sessions, documenting cognitive distortions, behavioral experiments, homework assignments, and rational responses.'
};