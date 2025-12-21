import express from 'express';

import { pingCheck } from '../../controller/pingController.js';
import submissionRouter from './submissionRoutes.js';

const v1Router = express.Router();

v1Router.use('/submission',submissionRouter);

v1Router.get("/", pingCheck);

export default v1Router;