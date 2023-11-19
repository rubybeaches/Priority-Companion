import { PrismaClient } from '@prisma/client'

let prisma: PrismaClient
declare global {
  var __db: PrismaClient | undefined
}

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient()
  prisma.$connect()
} else {
  if (!global.__db) {
    global.__db = new PrismaClient()
    global.__db.$connect()
  }
  prisma = global.__db
}

export { prisma }

/*
    const user = await prisma.user.create({
      data: {
        name: 'Patrick',
        email: 'patrick.mclain.jr@gmail.com',
        tasks: {
          create: {
            title: 'My First Task',
            description: "this is a new task created by prisma",
          },
        },
      },
    })
    console.log(user)

    const users = await prisma.user.findMany()

    const usersWithPosts = await prisma.user.findMany({
      include: {
        tasks: true,
      },
    })
    console.dir(usersWithPosts, { depth: null })
  */