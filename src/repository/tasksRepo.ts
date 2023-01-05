import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from 'uuid';

export function tasksRepo() {
  const prisma = new PrismaClient();
  
  return {
    findAll: async () => await prisma.task.findMany({orderBy: {
      createdAt: 'asc'
    }}),
    findOne: async (id: string) => await prisma.task.findUnique({
      where: {id}
    }),
    create: async (taskName: string) => await prisma.task.create({
      data: {
        id: uuidv4(),
        taskName,
        isDone: false
    }}),
    update: async (id: string, done: boolean) => await prisma.task.update({
      where: { id },
      data: {
        isDone: !done
      },
    }),
    delete: async (id: string) => await prisma.task.delete({
      where: { id }
    })
  }
}