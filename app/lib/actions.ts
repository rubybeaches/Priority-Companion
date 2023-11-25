'use server';

import { prisma } from "./script";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// const CreateInvoice = FormSchema.omit({ id: true, date: true });

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