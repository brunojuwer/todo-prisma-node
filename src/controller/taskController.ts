import { Request, Response, Router } from 'express'
import { tasksRepo } from '../repository/tasksRepo'

const taskRoutes = Router()
const taskRepo = tasksRepo()


taskRoutes.get('/', async (request: Request, response: Response) => {
  const allTasks = await taskRepo.getAllTasks()
  return response.json(allTasks);
})

taskRoutes.get('/:id', async (request: Request, response: Response) => {
  const id = request.params.id;
  const task = await taskRepo.getOneTask(id)

  if(!task) {
    return response.status(404).send({message: `Não existe task com id ${id}`})
  }
  
  return response.status(200).send(task);
})

taskRoutes.post('/', async (request: Request, response: Response) => {
  const {taskName} = request.body;
  const task = await taskRepo.createTask(taskName);

  return response.status(201).send(task);
})

taskRoutes.put('/:id', async (request: Request, response: Response) => {
  const id = request.params.id
  const task = await taskRepo.getOneTask(id)

  if(task) {
    const updatedTask = await taskRepo.updateTask(id, task.isDone)

    return response.status(200).send(updatedTask)
  }
  
  return response.status(404).send({message: `Não existe task com id ${id}`})
})

taskRoutes.delete('/:taskId', async (request: Request, response: Response) => {
  const id = request.params.taskId
  const task = await taskRepo.getOneTask(id)

  if(task) {
    await taskRepo.delete(id)
    return response.status(204).send()
  }
 
  return response.status(404).send({message: `Não existe task com id ${id}`})
})

export { taskRoutes };


