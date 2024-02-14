'use server';

import { prisma } from "./script";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { TaskProps } from "./definitions";
import CreateTask from "../components/Task/CreateTask";
import {z} from 'zod'


const RoleSchema = z.object({
  role: z.string(),
  description: z.string(),
});

export async function createRole(formData: FormData) {
    const { role, description } = RoleSchema.parse ({
      role: formData.get('role'),
      description: formData.get('description'),
    });

    const companionRole = await prisma.roles.create({
        data: {
            name: role,
            description: description,
            userId: 1,
        }
    });
   
    /*
    try {
    } catch (error) {
    }
    */
   
    revalidatePath("/");
    revalidatePath(`/role/${companionRole.name}`);
    redirect(`/role/${companionRole.name}`);
  }


  interface CreateTask extends TaskProps {
    roleID: number,
    roleName: string,
  }

  export async function createHabit({roleID, roleName, title, description, priority, estTime, chronoType, plannedStart, link}:CreateTask) {
    const createDate =  plannedStart ? new Date(plannedStart) : new Date();

    const companionHabit = await prisma.habit.create({
        data: {
            frequency: 'daily',
            rolesId: roleID,
            tasks:{
              create: {
                name: title,
                description: description,
                priority: priority,
                estTime: Number(estTime),
                chronoType: chronoType,
                plannedStart: createDate.toISOString(),
                dueBy: null,
                link: link,
                completed: false,
              }
            },
            }
        }
    );
   
    /*
    try {
    } catch (error) {
    }
    */
   
    revalidatePath("/");
    revalidatePath(`/role/${roleName}`);
    redirect(`/role/${roleName}`);
  }

  interface EditTask extends TaskProps {
    taskID: number,
    pathName: string,
  }

  export async function UpdateTask({pathName, taskID, title, description, priority, estTime, chronoType, plannedStart, link}:EditTask) {
    const companionTask = await prisma.task.update({
      where: {id: taskID},
        data: {
            name: title,
            description: description,
            priority: priority,
            estTime: Number(estTime),
            chronoType: chronoType,
            plannedStart: new Date(plannedStart).toISOString(),
            dueBy: null,
            link: link,
            completed: false,
        }
    })
   
    /*
    try {
    } catch (error) {
    }
    */
   
    revalidatePath("/");
    revalidatePath(pathName);
    redirect(pathName);
  }

  interface CompleteTask {
    taskID: number,
    pathName: string,
  }

  export async function CompleteTask({pathName, taskID}:CompleteTask) {
    const companionTask = await prisma.task.update({
      where: {id: taskID},
        data: {
            completed: true,
        }
    })
   
    /*
    try {
    } catch (error) {
    }
    */
   
    revalidatePath("/");
    revalidatePath(pathName);
    redirect(pathName);
  }

  interface DeleteTask {
    taskID: number,
    pathName: string,
    parentID?: number
  }

  export async function DeleteTask({pathName, taskID, parentID}:DeleteTask) {
    const today = new Date();

    if (parentID) {

      const deleteTasks = await prisma.task.deleteMany ({
        where: {habitId: parentID}
      })

      const deleteHabit = await prisma.habit.delete({
        where: {
          id: parentID,
        }
      })
    } else {
      const deleteTasks = await prisma.task.deleteMany ({
        where: {id: taskID}
      })
    }
   
    /*
    try {
    } catch (error) {
    }
    */
   
    revalidatePath("/");
    revalidatePath(pathName);
    redirect(pathName);
  }