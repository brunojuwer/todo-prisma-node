import express, { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { PrismaClient } from '@prisma/client'
import cors = require('cors') 

const app = express();

const prisma = new PrismaClient();


export interface Task {
  taskId: String,
  isDone: boolean,
  taskName: string
}

let tasks : Task[] = []


app.use(express.json());
app.use(cors({origin: 'http://localhost:5173'}))

app.get('/tasks', async (request: Request, response: Response) => {
  const allTasks = await prisma.task.findMany();

  return response.json(allTasks);
})

app.get('/tasks/:id', async (request: Request, response: Response) => {
  const id = request.params.id;
  const task = await prisma.task.findUnique({
    where: {id}
  });

  if(!task) {
    return response.status(404).send({message: `Não existe task com id ${id}`})
  }
  
  return response.status(200).send(task);
})

app.post('/tasks', async (request: Request, response: Response) => {
  const {taskName} = request.body;

const task = await prisma.task.create({
  data: {
    id: uuidv4(),
    taskName,
    isDone: false
     }})

  return response.status(201).send(task);
})

app.put('/tasks/:id', async (request: Request, response: Response) => {
  const id = request.params.id;

  const task = await prisma.task.findUnique({
    where: { id }
  })

  if(task) {
    const updatedTask = await prisma.task.update({
      where: { id },
      data: {
        isDone: !task.isDone
      },
    })

    return response.status(200).send(updatedTask)
  }
  
  return response.status(404).send({message: `Não existe task com id ${id}`})
})

app.delete('/tasks/:taskId', async (request: Request, response: Response) => {
  const id = request.params.taskId;
  
  const task = await prisma.task.findUnique({
    where: {id}
  });

  if(task) {
    const deleteTask = await prisma.task.delete({
      where: { id }
    })
    return response.status(200).send(deleteTask)
  }
 
  return response.status(404).send({message: `Não existe task com id ${id}`})
})

app.listen('3000', () => {
  console.log("Server on port 3000")
});

