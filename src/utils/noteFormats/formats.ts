import { NoteFormat } from './types';

export const NOTE_FORMATS: Record<string, NoteFormat> = {
  girp: {
    id: 'girp',
    label: 'GIRP Format',
    description: 'Goals, Intervention, Response, Plan - Standard format focusing on session goals and outcomes',
    sections: [
      'GOALS/FOCUS OF SESSION',
      'INTERVENTIONS AND STRUCTURED ACTIVITIES',
      'RESPONSE TO INTERVENTIONS',
      'PLAN AND NEXT STEPS'
    ] as const
  },
  dap: {
    id: 'dap',
    label: 'DAP Format',
    description: 'Description, Assessment, Plan - Concise format for describing session content and outcomes',
    sections: [
      'DESCRIPTION OF SESSION',
      'ASSESSMENT OF PROGRESS',
      'PLAN FOR TREATMENT'
    ] as const
  },
  birp: {
    id: 'birp',
    label: 'BIRP Format',
    description: 'Behavior, Intervention, Response, Plan - Focuses on observed behaviors and interventions',
    sections: [
      'BEHAVIOR OBSERVED',
      'INTERVENTIONS USED',
      'RESPONSE TO INTERVENTIONS',
      'PLAN FOR NEXT SESSION'
    ] as const
  },
  soap: {
    id: 'soap',
    label: 'SOAP Format',
    description: 'Subjective, Objective, Assessment, Plan - Medical-style format for comprehensive documentation',
    sections: [
      'SUBJECTIVE INFORMATION',
      'OBJECTIVE OBSERVATIONS',
      'ASSESSMENT OF PROGRESS',
      'PLAN AND RECOMMENDATIONS'
    ] as const
  },
  pirp: {
    id: 'pirp',
    label: 'PIRP Format',
    description: 'Problem, Intervention, Response, Plan - Problem-focused approach to session documentation',
    sections: [
      'PROBLEM ADDRESSED',
      'INTERVENTIONS USED',
      'RESPONSE TO TREATMENT',
      'PLAN FOR CONTINUATION'
    ] as const
  },
  rift: {
    id: 'rift',
    label: 'RIFT Format',
    description: 'Reason, Intervention, Feedback, Therapy goals - Goal-oriented session documentation',
    sections: [
      'REASON FOR SESSION',
      'INTERVENTIONS APPLIED',
      'FEEDBACK AND RESPONSE',
      'THERAPY GOALS PROGRESS'
    ] as const
  },
  care: {
    id: 'care',
    label: 'CARE Format',
    description: 'Client, Assessment, Response, Evaluation - Client-centered progress documentation',
    sections: [
      'CLIENT PRESENTATION',
      'ASSESSMENT OF NEEDS',
      'RESPONSE TO SESSION',
      'EVALUATION OF PROGRESS'
    ] as const
  },
  stop: {
    id: 'stop',
    label: 'STOP Format',
    description: 'Summary, Treatment, Observation, Plan - Structured approach to session documentation',
    sections: [
      'SUMMARY OF SESSION',
      'TREATMENT PROVIDED',
      'OBSERVATIONS MADE',
      'PLAN MOVING FORWARD'
    ] as const
  },
  mint: {
    id: 'mint',
    label: 'MINT Format',
    description: 'Motivation, Issues, Next steps, Therapeutic tools - Focus on motivation and tools',
    sections: [
      'MOTIVATION AND ENGAGEMENT',
      'ISSUES ADDRESSED',
      'NEXT STEPS IDENTIFIED',
      'THERAPEUTIC TOOLS USED'
    ] as const
  },
  fort: {
    id: 'fort',
    label: 'FORT Format',
    description: 'Focus, Outcome, Response, Tactics - Outcome-focused session documentation',
    sections: [
      'FOCUS OF SESSION',
      'OUTCOME DESIRED',
      'RESPONSE OBSERVED',
      'TACTICS FOR PROGRESS'
    ] as const
  }
};