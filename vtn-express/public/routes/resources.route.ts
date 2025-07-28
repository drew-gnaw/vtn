import express from 'express';

const resourcesRouter = express.Router();

resourcesRouter.get('/', (req, res) => {
  res.json({ message: 'List of resources' })
})

export default resourcesRouter;
