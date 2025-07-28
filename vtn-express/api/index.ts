import express from 'express';
import serverlessExpress from '@vendia/serverless-express';
import resourcesRouter from '../public/routes/resources.route';

const app = express();

app.use('/resources', resourcesRouter);

app.get('/test', (req, res) => {
  res.json({ test: 'ok' });
});

export default serverlessExpress({ app });
