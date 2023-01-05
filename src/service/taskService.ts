import { tasksRepo } from "../repository/tasksRepo";

export function tasksService() {
  const taskRepo = tasksRepo();

  return {
    create: async (taskName: string) => await taskRepo.create(taskName),
    update: async (id: string) => {
      const task = await taskRepo.findOne(id)

      if(!task) {
        throw new Error
      }
      return await taskRepo.update(id, task.isDone)
    },
    delete: async (id: string) => {
      const task = await taskRepo.findOne(id)

      if(!task) {
        throw new Error
      }
      await taskRepo.delete(id)
    }
  }
}