import { Request, Response, Router } from 'express'
import { tasksRepo } from '../repository/tasksRepo'
import { tasksService } from '../service/taskService'

const taskRoutes = Router()

const taskRepo = tasksRepo()
const taskService = tasksService();


taskRoutes.get('/', async (request: Request, response: Response) => {
  const allTasks = await taskRepo.findAll()
  return response.json(allTasks);
})

taskRoutes.get('/:id', async (request: Request, response: Response) => {
  const id = request.params.id;
  const task = await taskRepo.findOne(id)

  if(!task) {
    return response.status(404).send({message: `Não existe task com id ${id}`})
  }
  
  return response.status(200).send(task);
})

taskRoutes.post('/', async (request: Request, response: Response) => {
  const {taskName} = request.body;
  const task = await taskService.create(taskName)

  return response.status(201).send(task);
})

taskRoutes.put('/:id', async (request: Request, response: Response) => {
  const id = request.params.id

  try {
    const task = await taskService.update(id);
    return response.status(200).send(task)
  } catch (error) {
    return response.status(404).send({message: `Não existe task com id ${id}`})
  }
})

taskRoutes.delete('/:taskId', async (request: Request, response: Response) => {
  const id = request.params.taskId

  try {
    await taskService.delete(id)
    return response.status(204).send()
  } catch(error) {
    return response.status(404).send({message: `Não existe task com id ${id}`})
  }
})

export { taskRoutes };


