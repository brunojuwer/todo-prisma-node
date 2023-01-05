import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from 'uuid';

export function tasksRepo() {
  const prisma = new PrismaClient();
  
  return {
    getAllTasks: async () => await prisma.task.findMany({orderBy: {
      createdAt: 'asc'
    }}),
    getOneTask: async (id: string) => await prisma.task.findUnique({
      where: {id}
    }),
    createTask: async (taskName: string) => await prisma.task.create({
      data: {
        id: uuidv4(),
        taskName,
        isDone: false
    }}),
    updateTask: async (id: string, done: boolean) => await prisma.task.update({
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