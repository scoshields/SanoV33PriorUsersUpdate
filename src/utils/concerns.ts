export interface ClientConcern {
  id: string;
  label: string;
  description: string;
}

export const CLIENT_CONCERNS: ClientConcern[] = [
  {
    id: 'anxiety',
    label: 'Anxiety symptoms',
    description: 'excessive worry, restlessness'
  },
  {
    id: 'depression',
    label: 'Depressive symptoms',
    description: 'fatigue, low mood'
  },
  {
    id: 'stress',
    label: 'Stress related concerns',
    description: 'work, family, or school'
  },
  {
    id: 'anger',
    label: 'Difficulty managing anger',
    description: ''
  },
  {
    id: 'grief',
    label: 'Grief/loss processing',
    description: ''
  },
  {
    id: 'relationships',
    label: 'Relationship challenges',
    description: ''
  },
  {
    id: 'trauma',
    label: 'Trauma or PTSD-related symptoms',
    description: ''
  },
  {
    id: 'behavioral',
    label: 'Behavioral challenges',
    description: 'in children/adolescents'
  },
  {
    id: 'substance',
    label: 'Substance use concerns',
    description: ''
  },
  {
    id: 'self_esteem',
    label: 'Self-esteem issues',
    description: ''
  }
];