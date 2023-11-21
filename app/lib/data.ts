import { Roles, Habits, Initiatives, Tasks } from "./starter-build";
import { prisma } from "./script";

//////////////// NEW PRISMA FUNCS

export const getRoleData = async (role_id: number) => {
    const role = await prisma.roles.findUnique({
        where: { id: role_id },
        include: {
            habits: {
                include: { tasks: true,},
            },
            initiatives: {
                include: { tasks: true, },
            },
        },
        });

    return role

    /* SAMPLE OUTPUT
{
  id: 1,
  name: 'Companioneer',
  description: 'This role is setup to give you a starting point for navigating the site, and 
setting and achieving clear goals.',
  userId: 1,
  habits: [
    { id: 1, frequency: 'weekly', rolesId: 1, tasks: [Array] },
    { id: 2, frequency: 'daily', rolesId: 1, tasks: [Array] }
  ],
  initiatives: [
    {
      id: 1,
      name: 'Setup your companion',
      description: 'An inititive is a short term project based series of tasks, designed to complete set of preconfigured outcomes within a set timeline.',
      duration: 'month',
      durationCount: 2,
      completed: false,
      rolesId: 1,
      tasks: [Array]
    }
  ]
}
*/
}

export const getRoleDataByName = async (role_name: string) => {
    const role = await prisma.roles.findMany({
        where: { name: role_name },
        include: {
            habits: {
                include: { tasks: true,},
            },
            initiatives: {
                include: { tasks: true, },
            },
        },
        });

    return role[0]
}

export const getRoles = async () => {
    const roles = await prisma.roles.findMany();

    console.log(roles)
    return roles
}

export const getHabitByRoleCount = async (role_id:number) => {
    const habitCountRes = await prisma.roles.findUnique({
        where: { id: role_id },
        include: {
          _count: {
            select: { habits: true },
          },
        },
      })
    
      const habitCount = habitCountRes?._count.habits

    return habitCount;
}


//////////////// STARTER DATA

export const fetchRoleByName = (name:string) => {
    if (!name) {
        return Roles[0]
    }
    const Role = Roles.filter((role) => role.name == name)
    return Role[0]
}

export const fetchRoleData = (role_id: string) => {
    const habitBase = Habits.filter((habit) => habit.role_id == role_id)
    const initiatives = Initiatives.filter((init) => init.role_id == role_id)
    
    const habits = []
    for (const habit in habitBase) {
        const tasks = Tasks.filter((task) => task.parent_id == habitBase[habit].id)
        habits.push({...tasks[0], name: habitBase[habit].name, frequency: habitBase[habit].frequency})
    }

    return {
        habits,
        initiatives
    }
}