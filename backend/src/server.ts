import express from 'express'
import { Router, Request, Response } from 'express';
import cors from 'cors';

const app = express();
const route = Router();
const PORT = process.env.PORT || 3000;

app.use(express.json())
app.use(cors())

route.get('/', (req: Request, res: Response) => {
  res.json({ message: 'OK' })
})

app.use(route)


app.listen(PORT, () => {
  console.log(`Keystone running on port ${PORT}`)
})


export default app;
