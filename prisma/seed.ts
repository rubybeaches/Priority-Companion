import { PrismaClient } from '@prisma/client'
const bcrypt = require('bcrypt');

const prisma = new PrismaClient()
async function main() {

    const hashedPassword = await bcrypt.hash("mepass", 10);
    const patrick = await prisma.user.create({
        data: {
            email: 'patrick.mclain.jr@gmail.com',
            name: 'Patrick',
            password: hashedPassword,
            },
        });

    const companionRole = await prisma.roles.create({
        data: {
            name: 'Companioneer',
            description: 'This role is setup to give you a starting point for navigating the site, and setting and achieving clear goals.',
            userId: patrick.id,
        }
    });

    const today = new Date();
    
    const companionHabit = await prisma.habit.create({
        data: {
            frequency: 'daily',
            rolesId: companionRole.id,
            tasks: {
              create: {
                name: "Review Today's Plan",
                description: 'open the planner and set a plan for todays tasks',
                priority: 'do now',
                estTime: 600,
                chronoType: 'trough',
                plannedStart: today.toISOString(),
                dueBy: null,
                link: 'priority-companion.vercel.app/planner',
                completed: false,
              }
            },
            }
        }
    );

    const companionInitiative = await prisma.initiative.create({
        data: {
            name: 'Setup your companion',
            description: 'Initiatives are short term project-based series of tasks, designed to complete preconfigured outcomes within a set timeline.',
            duration: 'month',
            durationCount: 2,
            completed: false,
            rolesId: companionRole.id,
            tasks: {
                create: {
                    name: 'Create A New Role',
                    description: 'create a new role to represent a role you play in your career',
                    priority: 'decide',
                    estTime: 300,
                    chronoType: 'peak',
                    plannedStart: today.toISOString(),
                    dueBy: null,
                    link: null,
                    completed: false,
                }
            }
        }
    });
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })


  /*
  {
  id: 1,
  email: 'patrick.mclain.jr@gmail.com',
  name: 'Patrick',
  role: [
    {
      id: 1,
      name: 'Companioneer',
      description: 'This role is setup to give you a starting point for navigating the site, 
and setting and achieving clear goals.',
      userId: 1,
      habits: [Array],
      initiatives: [Array]
    }
  ]
}
[
  { id: 1, frequency: 'weekly', rolesId: 1, tasks: [ [Object] ] },
  { id: 2, frequency: 'daily', rolesId: 1, tasks: [ [Object] ] }
]
[
  {
    id: 1,
    name: 'Weekly Outcomes',
    description: 'check weekly summary for completion outcomes',
    priority: 'decide',
    estTime: 600,
    chronoType: 'peak',
    plannedStart: 2023-11-21T00:57:22.652Z,
    dueBy: null,
    link: 'google.com',
    completed: false,
    habitId: 1,
    initiativeId: null
  }
]
[
  {
    id: 2,
    name: "Review Today's Plan",
    description: 'open the planner and set a plan for todays tasks',
    priority: 'do now',
    estTime: 300,
    chronoType: 'trough',
    plannedStart: 2023-11-21T00:59:23.332Z,
    dueBy: null,
    link: null,
    completed: false,
    habitId: 2,
    initiativeId: null
  }
]
[
  {
    id: 1,
    name: 'Setup your companion',
    description: 'An inititive is a short term project based series of tasks, designed to complete set of preconfigured outcomes within a set timeline.',
    duration: 'month',
    durationCount: 2,
    completed: false,
    rolesId: 1,
    tasks: [ [Object] ]
  }
]
[
  {
    id: 3,
    name: 'Create A New Role',
    description: 'create a new role to represent a role you play in your career',
    priority: 'decide',
    estTime: 300,
    chronoType: 'analytical',
    plannedStart: 2023-11-21T01:03:54.782Z,
    dueBy: null,
    link: null,
    completed: false,
    habitId: null,
    initiativeId: 1
  }
]
*/