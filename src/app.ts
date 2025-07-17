/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './docs/swagger';


import cookieParser from 'cookie-parser';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorHandler';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors({ origin: ['http://localhost:5173/api/v1/'] }));
app.use(cookieParser());

// application routes
app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => { });


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
app.use(globalErrorHandler);
app.use(notFound);

export default app;
