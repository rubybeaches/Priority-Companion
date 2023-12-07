'use server';

import { prisma } from "./script";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { TaskProps } from "./definitions";
import CreateTask from "../components/Task/CreateTask";

export async function createRole(formData: FormData) {
    const { role, description } = {
      role: formData.get('role')?.toString(),
      description: formData.get('description')?.toString(),
    };

    if (role && description) {
    const companionRole = await prisma.roles.create({
        data: {
            name: role,
            description: description,
            userId: 1,
        }
    });
    }
   
    /*
    try {
    } catch (error) {
    }
    */
   
    revalidatePath('/');
    redirect('/');
  }


  interface CreateTask extends TaskProps {
    roleID: number,
    roleName: string,
  }

  export async function createHabit({roleID, roleName, title, description, priority, estTime, chronoType, plannedStart, link}:CreateTask) {
    const today = new Date();

    const companionTask = await prisma.task.create({
        data: {
            name: title,
            description: description,
            priority: priority,
            estTime: Number(estTime),
            chronoType: chronoType,
            plannedStart: today.toISOString(),
            dueBy: null,
            link: link,
            completed: false,
        }
    })

    const companionHabit = await prisma.habit.create({
        data: {
            frequency: 'daily',
            rolesId: roleID,
            taskId: companionTask.id,
            }
        }
    );
   
    /*
    try {
    } catch (error) {
    }
    */
   
    revalidatePath("/");
    redirect(`/role/${roleName}`);
  }

  interface EditTask extends TaskProps {
    taskID: number,
    pathName: string,
  }

  export async function UpdateTask({pathName, taskID, title, description, priority, estTime, chronoType, plannedStart, link}:EditTask) {
    const today = new Date();

    const companionTask = await prisma.task.update({
      where: {id: taskID},
        data: {
            name: title,
            description: description,
            priority: priority,
            estTime: Number(estTime),
            chronoType: chronoType,
            plannedStart: today.toISOString(),
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
      const parentHabit = await prisma.habit.delete({
        where: {
          id: parentID,
          taskId: taskID
        }
      })
    }
   
    /*
    try {
    } catch (error) {
    }
    */
   
    revalidatePath("/");
    redirect(pathName);
  }