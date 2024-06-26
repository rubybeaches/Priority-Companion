import { chronoType, prioritySquare } from "./definitions"; 

  export const Roles = [
    {
      id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
      name: 'Companioneer',
      description: 'This role is setup to give you a starting point for navigating the site, and setting and achieving clear goals.',
    },
  ];
  
  export const Initiatives = [
    {
      id: '85e9-3958dc9e-4377-712f-fec4b6a6442a',
      role_id: Roles[0].id,
      name: 'Setup your companion',
      description: 'An inititive is a short term project based series of tasks, designed to complete set of preconfigured outcomes within a set timeline.',
      goals: ['create a new role before end date on first milestone', 'establish clear lead metric goals with measurable lag outcomes'],
      duration_count: 1,
      duration_type: 'week',
      completed_on: null,
    },
  ];

  export const Habits = [
    {
        id: '712f-3958dc9e-6442-712f-fec4b6a6442a',
        name: 'Weekly Outcomes',
        role_id: Roles[0].id,
        frequency: "weekly",
    },
    {
      id: '712f-3958dc9e-712f-712f-fec4b6a6442a',
      name: 'Anotha One',
      role_id: Roles[0].id,
      frequency: "weekly",
  },
  ];
  
  export const Milestones = [
    { 
        initiative_id: Initiatives[0].id, 
        name: 'Companioneer Milestone One',
        position: 1, 
        date_begin: '2023-11-06', 
        date_end: '2023-12-06' 
    },
  ];
  
    interface TaskProps {
    id: string,
    parent_id: string,
    parent_type: string,
    description: string,
    priority?: prioritySquare,
    est_time_seconds?: string,
    type: chronoType;
    planned_start: string,
    due_date?: string,
    link?: string,
}

  export const Tasks: TaskProps[] = [
    {
      id: '4b6a6442a-712f-4377-85e9-fec4b6a6442a',
      parent_id: Initiatives[0].id,
      parent_type: 'initiative',
      description: 'create a new role for my job or career',
      est_time_seconds: "300",
      priority: 'DO',
      type: 'trough',
      planned_start: '2023-11-16',
      due_date: undefined,
      link: undefined,
    },
    {
        id: '4b6a6442a-71e9-6442-85e9-fec4b6a6442a',
        parent_id: Habits[0].id,
        parent_type: 'habit',
        description: 'check weekly summary for completion outcomes',
        est_time_seconds: "600",
        priority: 'DO',
        type: 'peak',
        planned_start: '2023-11-16',
        due_date: undefined,
        link: "google.com",
      },
  ];