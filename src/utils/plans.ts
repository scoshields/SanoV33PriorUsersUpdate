export interface PlanCategory {
  id: string;
  label: string;
  options: PlanOption[];
}

export interface PlanOption {
  id: string;
  label: string;
  insertOnly?: boolean;
}

export const PLAN_CATEGORIES: PlanCategory[] = [
  {
    id: 'homework',
    label: 'Homework/Tasks',
    options: [
      { id: 'mindfulness', label: 'Practice mindfulness for 10 minutes daily' },
      { id: 'thought_record', label: 'Complete a thought record/log for the week' },
      { id: 'triggers', label: 'Identify triggers and coping strategies' },
      { id: 'journal', label: 'Journal about feelings and experiences' },
      { id: 'support_group', label: 'Attend a support group or meeting' }
    ]
  },
  {
    id: 'next_session',
    label: 'Next Session Focus',
    options: [
      { id: 'trauma', label: 'Explore past trauma in greater depth' },
      { id: 'progress', label: 'Review progress on [specific goal]', insertOnly: true },
      { id: 'communication', label: 'Practice communication skills' },
      { id: 'cognitive', label: 'Continue cognitive restructuring' },
      { id: 'boundaries', label: 'Discuss boundaries and relationships' }
    ]
  }
];