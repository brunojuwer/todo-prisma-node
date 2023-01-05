import express from 'express';
import cors = require('cors') 

import { taskRoutes } from './controller/taskController'

const app = express();


app.use(express.json());
app.use(cors({origin: 'http://localhost:5173'}))
app.use("/tasks", taskRoutes)


app.listen('3000', () => {
  console.log("Server on port 3000")
});

