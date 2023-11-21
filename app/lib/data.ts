import { Roles, Habits, Initiatives, Tasks } from "./starter-build";
import { prisma } from "./script";


/*
export const deleteTask = async () => {
    const tasks = await prisma.task.findMany()
    console.log("Found:", tasks)

    const deleteTask = await prisma.task.delete({
        where: {
          id: 1,
        },
      })
    console.log("Delete", deleteTask)
}

export const getStaticProps: GetStaticProps = async () => {
    const feed = await prisma.post.findMany({
      where: { published: true },
      include: {
        author: {
          select: { name: true },
        },
      },
    });
    return {
      props: { feed },
      revalidate: 10,
    };
  };
*/

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