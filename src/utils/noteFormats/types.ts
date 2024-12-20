export type NoteFormatType = 
  | 'girp'   // Goals, Intervention, Response, Plan
  | 'dap'    // Description, Assessment, Plan
  | 'birp'   // Behavior, Intervention, Response, Plan
  | 'soap'   // Subjective, Objective, Assessment, Plan
  | 'pirp'   // Problem, Intervention, Response, Plan
  | 'rift'   // Reason, Intervention, Feedback, Therapy goals
  | 'care'   // Client, Assessment, Response, Evaluation
  | 'stop'   // Summary, Treatment, Observation, Plan
  | 'mint'   // Motivation, Issues, Next steps, Therapeutic tools
  | 'fort';  // Focus, Outcome, Response, Tactics

export interface NoteFormat {
  id: NoteFormatType;
  label: string;
  description: string;
  sections: readonly string[];
}