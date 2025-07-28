import express from 'express';
import serverlessExpress from '@vendia/serverless-express';
import resourcesRouter from './public/routes/resources.route';

const app = express();

app.use('/resources', resourcesRouter);

// Export the serverless handler
export const handler = serverlessExpress({ app });
