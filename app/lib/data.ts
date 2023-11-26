import { prisma } from "./script";

export const getUserSeedData = async (user_id: number) => {
    const user = await prisma.user.findUnique({
        where: { id: user_id },
        include: {
            roles: {
                include: {
                habits: {
                    include: { task: true,},
                },
                initiatives: {
                    include: { tasks: true, },
                },
            },
            }
        },
        });
        console.log(user)
        console.log(user?.roles[0].habits)
        console.log(user?.roles[0].habits[0].task)
        console.log(user?.roles[0].habits[1].task)
        console.log(user?.roles[0].initiatives)
        console.log(user?.roles[0].initiatives[0].tasks)
    return user
}


export const getRoleData = async (role_id: number) => {
    const role = await prisma.roles.findUnique({
        where: { id: role_id },
        include: {
            habits: {
                include: { task: true,},
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
    const decodedRole = decodeURIComponent(role_name)
    const role = await prisma.roles.findMany({
        where: { 
            name: decodedRole
        },
        include: {
            habits: {
                include: { task: true,},
            },
            initiatives: {
                include: { tasks: true, },
            },
        },
        });

    return role[0]
}

export const getRoles = async () => {
    const roles = await prisma.roles.findMany({include: {habits: {include:{task:true}}, initiatives:{include:{tasks:true}}}});

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